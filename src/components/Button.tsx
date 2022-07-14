import { ComponentProps } from "preact";
import { cn } from "../utils";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ className, children, ...props }: ButtonProps) {
	return (
		<button
			className={cn(
				"rounded-md px-3 py-1 transition-[background-color] bg-neutral-100 active:bg-neutral-200",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
