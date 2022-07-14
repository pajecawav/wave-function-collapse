import { ComponentProps } from "preact";
import { cn } from "../utils";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ className, children, ...props }: ButtonProps) {
	return (
		<button
			className={cn(
				"rounded-md px-3 py-1 transition-[background-color] bg-zinc-200 active:bg-zinc-300",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
