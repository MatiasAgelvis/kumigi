/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */

import mailClient from "integrations/mail";
import forgotPasswordMail from "./mails/forgotPassword";

type ResetPasswordMailer = {
  to: string;
  token: string;
  user: string;
  expiryInHours: number;
  operatingSystem: string;
  browserName: string;
};

export function forgotPasswordMailer({
  to,
  token,
  user,
  expiryInHours,
  operatingSystem,
  browserName,
}: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN;
  const resetUrl = `${origin}/auth/reset-password?token=${token}`;

  const { html, text } = forgotPasswordMail(
    "",
    "Kumigi",
    "kumigi.com",
    user,
    resetUrl,
    "support@kumigi.com",
    expiryInHours,
    operatingSystem,
    browserName
  );

  const msg = {
    From: "support@kumigi.com",
    To: to,
    Subject: "Your Password Reset Instructions 🔑",
    HtmlBody: html,
    TextBody: text,
    MessageStream: "forgot-password",
  };

  return {
    async send() {
      await mailClient.sendEmail(msg).catch((error) => {
        throw new Error(
          "Something went wrong! Please retry, if the problem persists contact Support."
        );
      });
    },
  };
}
