import { Routes } from "@blitzjs/next";
import {
	Box,
	Button,
	Heading,
	HStack,
	StackProps,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

export default function LogInCTA({
	heading,
	...props
}: {
	heading?: ReactNode;
} & StackProps) {
	return (
		<VStack {...props}>
			{heading}
			<HStack>
				<Link href={Routes.SignupPage()}>
					<Button colorScheme={"teal"} variant="outline">
						Sign Up
					</Button>
				</Link>
				<Link href={Routes.LoginPage()}>
					<Button colorScheme={"teal"}>Login</Button>
				</Link>
			</HStack>
		</VStack>
	);
}
