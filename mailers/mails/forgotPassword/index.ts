import forgotPasswordText from "./text";
import forgotPasswordHTML from "./html";

export default function forgotPasswordMail(
	company: string,
	product: string,
	homeLink: string,
	user: string,
	resetUrl: string,
	supportMail: string,
	expiryInHours: number,
	operatingSystem: string,
	browserName: string
) {
	/*
	- A clear subject line and “From” name
	- Identify who the password reset is for
	- A clear call to action to resolve the problem
	- Reassuring statement if the user did not initiate the password reset
	- Support contact information
	- Expiration information for the password reset URL (5 minutes? 24 hours?)
	*/

	// const browser = detect();
	// const operatingSystem =
	// 	browser && "os" in browser && browser.os ? browser.os : "unknown OS 😕";
	// const browserName =
	// 	browser && "name" in browser ? browser.name : "unknown browser 😕";

	const html = forgotPasswordHTML(
		company,
		product,
		homeLink,
		user,
		resetUrl,
		supportMail,
		expiryInHours,
		operatingSystem,
		browserName
	);
	const text = forgotPasswordText(
		company,
		product,
		homeLink,
		user,
		resetUrl,
		supportMail,
		expiryInHours,
		operatingSystem,
		browserName
	);

	return {
		html,
		text,
	};
}
