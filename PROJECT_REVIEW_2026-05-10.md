# Kumigi Project Review (2026-05-10)

## Executive Summary
Kumigi still has strong core value: the avatar generation engine and visual editor are reusable, and the API concept remains marketable for internal tools, SaaS integrations, and content workflows.

The main blocker is not product idea quality, but platform drift:
- The app still depends heavily on Blitz server runtime (RPC, auth, Prisma), so it is not currently a truly static app.
- There are authorization weaknesses in design CRUD that can allow cross-user data access/manipulation.
- The stack is pinned to older framework versions, increasing maintenance risk and limiting deployment flexibility.

If you address auth boundaries + modernize architecture in phases, this project still has meaningful product and business value.

## Findings (Prioritized)

### 1) Critical: Authorization boundaries are weak in design CRUD (IDOR risk)
Affected files:
- [app/simple-designs/mutations/createSimpleDesign.ts](app/simple-designs/mutations/createSimpleDesign.ts#L7)
- [app/simple-designs/mutations/updateSimpleDesign.ts](app/simple-designs/mutations/updateSimpleDesign.ts#L25)
- [app/simple-designs/mutations/deleteSimpleDesign.ts](app/simple-designs/mutations/deleteSimpleDesign.ts#L14)
- [app/simple-designs/mutations/deleteSimpleDesignWithName.ts](app/simple-designs/mutations/deleteSimpleDesignWithName.ts#L14)
- [app/simple-designs/queries/getSimpleDesign.ts](app/simple-designs/queries/getSimpleDesign.ts#L15)
- [app/simple-designs/queries/getDesignNameUser.ts](app/simple-designs/queries/getDesignNameUser.ts#L15)

Why this matters:
- These endpoints call `resolver.authorize()` but still trust client-provided identifiers (`userId`, `id`, `name`) without enforcing ownership via `ctx.session.userId`.
- An authenticated user can potentially mutate/delete another user's data by passing crafted inputs.

Recommendation:
- Remove `userId` from client input schemas where possible.
- Scope all reads/writes by session user in the database filter.
- Prefer unique constraints scoped to user and use `where: { designIdentifier: { userId, name } }` patterns.

### 2) High: App is not truly static despite migration intent
Affected files:
- [pages/api/rpc/[[...blitz]].ts](pages/api/rpc/[[...blitz]].ts#L1)
- [app/blitz-client.ts](app/blitz-client.ts#L1)
- [app/blitz-server.ts](app/blitz-server.ts#L1)
- [pages/api/[...shapes].ts](pages/api/[...shapes].ts#L1)

Why this matters:
- Blitz RPC/auth and API routes require runtime server support.
- This conflicts with the stated "static app" direction and adds infra cost/complexity.

Recommendation:
- Split project into:
  1. Pure static designer frontend.
  2. Optional lightweight API service (for saved galleries and bulk generation), behind explicit feature flags.

### 3) High: Data pipeline and API response handling issues
Affected files:
- [pages/api/[...shapes].ts](pages/api/[...shapes].ts#L24)
- [pages/api/rpc/[[...blitz]].ts](pages/api/rpc/[[...blitz]].ts#L4)

Why this matters:
- `Content-Encoding: base64` is set on zip responses while returning a stream/buffer from server utilities. This can cause client/proxy misinterpretation.
- `onError: console.log` can leak internals and weakens observability standards.

Recommendation:
- Remove `Content-Encoding` unless response body is actually base64-encoded.
- Replace raw console logging with structured error handling and environment-aware logging.

### 4) High: Gallery pagination/state management is fragile
Affected file:
- [app/components/gallery/user.tsx](app/components/gallery/user.tsx#L26)

Why this matters:
- `fetchMore` appends items using captured state and side effects (`setItems(items.concat(...))`, repeated `setDisplay` in map).
- This pattern can duplicate cards or miss updates under concurrent renders.

Recommendation:
- Use functional state updates.
- Generate UI directly from query data where possible, avoid dual source-of-truth (`results` + `items`).

### 5) High: Framework/dependency staleness increases risk
Affected files:
- [package.json](package.json#L39)
- [package.json](package.json#L54)

Why this matters:
- Blitz `2.0.0-beta.4` + Next `12.2.5` are old in 2026 terms.
- Old versions increase security/maintenance overhead and reduce ecosystem compatibility.

Recommendation:
- Plan incremental migration to modern Next.js architecture (route handlers/server actions where needed) or maintain a contained legacy service boundary.

### 6) Medium: Query parsing bug in hex handling
Affected file:
- [app/utils/parseAvataraQuery.ts](app/utils/parseAvataraQuery.ts#L25)

Why this matters:
- `matchAll(...)[0][1]` assumes array indexing on an iterator-like result and is brittle.
- Can break specific color inputs and lead to runtime exceptions.

Recommendation:
- Use safe `match()`/capturing groups or `Array.from(matchAll(...))` with guards.

### 7) Medium: Performance anti-patterns in editor rendering loop
Affected files:
- [app/components/designer/index.tsx](app/components/designer/index.tsx#L53)
- [pages/_app.tsx](pages/_app.tsx#L40)

Why this matters:
- Dependency on `JSON.stringify(layers)` in effects can trigger expensive recomputes.
- Stray `QueryClientProvider;` line appears to be leftover dead code.

Recommendation:
- Replace stringify dependency with stable update strategy.
- Remove dead statements and profile render hotspots.

### 8) Medium: Debug/debt markers in production paths
Affected files:
- [app/components/text/editableWithControls.tsx](app/components/text/editableWithControls.tsx#L33)
- [app/components/functionButtons/copyButton.tsx](app/components/functionButtons/copyButton.tsx#L12)

Why this matters:
- Active console logging in UI components and `@ts-ignore` in key controls are quality smells and can hide defects.

Recommendation:
- Remove debug logging and replace `@ts-ignore` with proper typing.

### 9) Medium: Type safety posture is partially disabled
Affected file:
- [tsconfig.json](tsconfig.json#L8)

Why this matters:
- `strict: false` with partial strict flags gives inconsistent confidence and allows latent null/type issues.

Recommendation:
- Move to full strict mode gradually by folder/module, starting from utilities and data access layers.

## Testing and Operational Gaps
- Only a small auth-focused test surface is present:
  - [app/auth/mutations/forgotPassword.test.ts](app/auth/mutations/forgotPassword.test.ts)
  - [app/auth/mutations/resetPassword.test.ts](app/auth/mutations/resetPassword.test.ts)
- No visible coverage for avatar generation pipeline, query parsing, editor state transitions, or design CRUD authorization.
- Local test execution could not be validated in this environment because required commands were unavailable (`pnpm` missing, `jest` missing from runtime path).

## Value Still Left in the Product

## Your Original Ideas Re-assessed

## Creative Freedom vs. Guardrails (Key Product Lesson)
User feedback confirms a core issue: the limited shape catalog reduced creative ownership.

What happened:
- Shape constraints were meant to prevent ugly or disproportionate outcomes.
- In practice, constraints also removed discovery and self-expression.
- The product unintentionally encoded one aesthetic viewpoint as the only valid output path.

Why this matters:
- Avatar tools are identity tools. Users expect control, not only safety.
- "Too constrained" often feels like "not for me," which hurts retention and sharing.

Better product principle:
- Do not choose between freedom and quality. Offer both as separate modes.

Recommended UX model:
- Guided mode (default): curated templates, balanced spacing, safe color combinations, quick wins.
- Advanced mode: full HTML+CSS authoring with variables, layers, and custom layout logic.
- Repair tools instead of hard blocks: alignment snap, overlap warnings, contrast checks, proportion helpers.

How this connects to your renderer direction:
- HTML+CSS templates remove the hard cap on available shapes.
- Instead of adding many ad-hoc geometric primitives, users can compose rich structures directly.
- You shift from "shape picker" product to "template engine" product.

Monetization tie-in:
- Free tier: guided mode + limited template editing.
- Pro tier: advanced HTML+CSS mode, reusable custom templates, team template libraries.

Success metrics to track after rollout:
- Template completion rate.
- Export rate per session.
- Week-1 return rate for creators.
- Share/download rate by guided vs advanced mode users.

### 1) Replace renderer with Vercel/Satori (HTML+CSS to SVG)
Assessment: high upside, good strategic fit. https://github.com/vercel/satori

Why it is valuable:
- Decouples generation from Node canvas complexity.
- Makes templates portable and easier to preview/version.
- SVG output is ideal for sharp scaling and downstream conversions.

Technical notes:
- Satori has CSS/layout constraints; you need a strict template subset.
- For PNG exports, pair SVG output with a rasterization step (for example at edge/server worker).
- Keep your current renderer as a fallback while migrating templates incrementally.

Monetization impact:
- Enables "template packs" and premium branded templates.
- Improves reliability for API-based generation products.

Verdict: pursue in v2 as the primary rendering direction.

### 2) Advanced mode for pure HTML+CSS bulk templated generation
Assessment: strongest immediate business opportunity.

Why it is valuable:
- Moves product from toy editor to production asset pipeline.
- Creates a clear B2B use case: upload data, generate many assets/sizes, export zip.
- Fits creators, agencies, communities, events, and small SaaS teams.

Technical notes:
- Add a template schema + variable bindings (`{{name}}`, `{{role}}`, etc.).
- Add CSV/JSON ingestion and deterministic output naming.
- Add preset size bundles (social, community, marketplace, docs).

Monetization impact:
- Natural paid feature gate: row limits, template count, team seats, automation/API credits.

Verdict: this should be the first monetized feature track.

### 3) Direct print integration (Society6 / print media APIs)
Assessment: interesting, but should be deferred.

Why it is promising:
- Extends avatar assets into physical merchandise workflows.
- Could increase ARPU with fulfillment-margin products.

Risks and caveats:
- Platform dependency and policy risk if relying on undocumented partner APIs.
- Print-on-demand requires stricter color profile and DPI workflows than current outputs.
- Operational complexity (order lifecycle, refunds, customer support, taxes) can distract from core product growth.

Recommendation:
- Start with generic export bundles designed for print readiness (300 DPI presets, bleed-safe templates).
- Integrate with a stable print partner API only after core SaaS funnel converts.

Verdict: good phase-3 option after core recurring revenue is proven.

## Recommended Order For These 3 Ideas
1. Advanced HTML+CSS bulk templated generation (fastest path to paid value).
2. Satori-based renderer migration (platform and reliability foundation).
3. Print integration (expansion layer, only after product-market fit signals).

## Concrete 6-Week Execution Slice
Week 1-2:
- Define template DSL and variable binding rules.
- Build batch generation input flow (CSV/JSON + preview).

Week 3-4:
- Add export bundles by channel/size packs.
- Add pricing limits (free vs pro) and usage tracking.

Week 5-6:
- Introduce Satori renderer for a subset of templates.
- Compare output quality/perf with current renderer and expand coverage.

### 1) Product repositioning opportunities
- "Avatar API for apps": developer-first API with stable templates + signed URLs.
- "Brand Avatar Kit": teams upload brand palette/fonts, then generate consistent avatars at scale.
- "Content Ops Tool": bulk-generate speaker/team/event avatars as zip packs.

### 2) Monetization models that fit this codebase
- Free tier: manual editor + limited exports.
- Pro subscription: saved libraries, presets, brand kits, bulk export sizes, share links.
- Usage-based API billing: pay per generated image bundle.
- Template marketplace: paid template packs.

### 3) Differentiation angle
Do not compete as a generic "avatar generator". Compete as:
- Fast pipeline for consistent identity assets.
- Strong developer integration (API + embeddable widget).
- Team collaboration (preset libraries, locked brand configs).

## Competitive Strategy (Against Canva and Established Players)

### Positioning rule
- Do not fight for "best all-purpose design tool."
- Win a narrow job-to-be-done where incumbents are too broad or too manual.

### ICP options (pick one primary for first 90 days)
1. Community operators (Discord, gaming, education cohorts):
- Need: many profile assets, role badges, seasonal refreshes.
- Pain today: repetitive manual design work.
- Why you can win: fast batch personalization with consistent style.

2. Event and content teams:
- Need: speaker cards, attendee avatars, social tiles in multiple sizes.
- Pain today: same template resized and edited repeatedly.
- Why you can win: one dataset in, complete export packs out.

3. Developer platforms / SaaS products:
- Need: embedded avatar generation and API-based image workflows.
- Pain today: no simple programmable pipeline for brand-safe outputs.
- Why you can win: API-first generation + deterministic templates.

### Pricing hypotheses by ICP
1. Community operators:
- Starter: free, watermark or low monthly generation cap.
- Pro: 15 to 39 USD per month for bulk export, template libraries, no watermark.

2. Event/content teams:
- Campaign pass: 49 to 199 USD per event/campaign depending on volume.
- Team plan: 39 to 99 USD per month with seat-based collaboration.

3. Developer platforms:
- Usage based: free tier + paid per 1,000 renders.
- Business tier: monthly minimum + SLA + higher throughput + signed URLs.

### 90-day GTM experiments
Days 1-30:
- Build a narrow landing page per ICP with one concrete promise.
- Ship one end-to-end template workflow (CSV/JSON to multi-size exports).
- Run outreach to 30 target users (manual demos, no ads initially).

Days 31-60:
- Add billing gate for one premium action (high-volume batch export).
- Add one integration proof point (API endpoint or embeddable widget).
- Track activation events: template created, batch run completed, export downloaded.

Days 61-90:
- Double down on the best-converting ICP only.
- Publish 3 case studies with measurable time saved.
- Raise price once for new customers to test willingness to pay.

### Kill criteria (to avoid another long blind build)
If after 90 days none of these are met, pause or pivot:
1. At least 10 percent of activated users complete a paid action.
2. At least 3 customers pay and use it again in a second week.
3. At least 30 percent of activated users complete one full batch flow.
4. At least 40 percent of interviews report current workflow pain as severe.

### Expansion criteria (when to scale)
Scale investment only when all are true:
1. One ICP shows repeat usage without custom hand-holding.
2. Paid conversion trend is improving month over month.
3. Support burden per customer is falling as product UX improves.
4. Core generation reliability is stable at target throughput.

## Polish Roadmap (Practical)

### Phase 1 (1-2 weeks): Safety and trust
- Fix all CRUD ownership checks using session user ID.
- Remove debug logs and `@ts-ignore` usage in user-facing components.
- Correct API response headers for zip/image outputs.
- Add basic tests for design access controls and parser edge cases.

### Phase 2 (2-4 weeks): UX polish and retention
- Add starter packs (modern, playful, corporate, minimal).
- Improve onboarding: "Pick style -> enter initials -> export in 30 seconds".
- Add one-click export presets (Slack, GitHub, Teams, Discord, Notion).
- Add lightweight local persistence for guests.

### Phase 3 (4-8 weeks): Architecture and revenue
- Decouple frontend from Blitz runtime for static-first hosting.
- Keep server features as optional service module (auth/gallery/api).
- Add analytics funnel: first render, first export, return user, save design.
- Introduce paid features behind account and usage limits.

## Fastest Next 5 Actions
1. Patch authorization in simple-design queries/mutations.
2. Add tests proving cross-user reads/writes are blocked.
3. Fix parser and API header correctness issues.
4. Launch a "v2 beta" landing page with one clear value proposition.
5. Ship export presets + template packs as the first monetizable upgrade.

## Bottom Line
Kumigi is not dead value-wise. It has a reusable generation core and clear niche potential. The failed monetization likely came from positioning and architecture drag, not from lack of product potential. With focused security fixes + a tighter product narrative, this can become a viable micro-SaaS or API utility business.
