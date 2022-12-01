import { useClipboard, ButtonProps, Button } from "@chakra-ui/react";
import { useEffect } from "react";

export default function CopyButton({
	message = "Copy",
	value: text,
	...props
}: {
	message?: string;
	value: string;
} & ButtonProps) {
	// @ts-ignore
	const { onCopy, value, setValue, hasCopied } = useClipboard("");

	useEffect(() => {
		setValue(text);
	}, [text, setValue]);
	// console.log(value);

	return (
		<Button {...props} onClick={onCopy}>
			{hasCopied ? "Copied!" : message}
		</Button>
	);
}
