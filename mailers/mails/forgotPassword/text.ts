export default function forgotPasswordText(
	company: string,
	product: string,
	homeLink: string,
	user: string,
	resetUrl: string,
	supportMail: string,
	expiryInHours: number,
	operating_system: string,
	browser_name: string
) {
	return `Use this link to reset your password. The link is only valid for 24 hours.

[${product}] ( ${homeLink} )

************
Hi ${user},
************

You recently requested to reset your password for your [${product}] account. Use the button below to reset it. This password reset is only valid for the next ${expiryInHours} hours.

Reset your password ( ${resetUrl} )

For security, this request was received from a ${operating_system} device using ${browser_name}. If you did not request a password reset contact support ( mailto:${supportMail} ) or reply to this email.

Thanks,
The [${product}] team

If you’re having trouble with the button above, copy and paste the URL below into your web browser.

${resetUrl}

`;
	// [Company Name, LLC]
	// 1234 Street Rd.
	// Suite 1234
}
