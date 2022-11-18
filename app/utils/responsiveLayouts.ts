export const mobileOnly = ["block", "block", "none"];
export const desktopOnly = ["none", "none", "block"];
export const chakraViewportSplit = <T>(mobile: T, desktop: T) => [
  mobile,
  mobile,
  desktop,
];
