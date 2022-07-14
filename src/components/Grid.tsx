import { useAtom } from "jotai";
import { showPossibilitiesAtom } from "../settings";
import { cn } from "../utils";
import { gridAtom } from "../wfc";

export function Grid() {
	const [grid] = useAtom(gridAtom);

	const [showPossibilities] = useAtom(showPossibilitiesAtom);

	return (
		<div
			// TODO: looks like there is no good way for an element to fill it's parent while preserving aspect-ratio
			className="m-auto w-[min(100vw-16rem-3rem,100vh-3rem)] max-w-5xl aspect-square grid gap-1"
			style={{
				gridTemplateColumns: `repeat(${grid.size}, 1fr)`,
				gridTemplateRows: `repeat(${grid.size}, 1fr)`,
			}}
		>
			{grid.cells.map((cell, i) => (
				<div
					className={cn(
						"grid items-center text-center rounded-md",
						cell.tile
							? "bg-green-200"
							: cell.options.length === 0
							? "bg-red-100"
							: "bg-neutral-100 text-neutral-600"
					)}
					key={i}
				>
					{cell.tile?.value ??
						(showPossibilities &&
							cell.options.map(o => o.value).join(""))}
				</div>
			))}
		</div>
	);
}
