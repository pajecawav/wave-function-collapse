import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
	runningAtom,
	showPossibilitiesAtom,
	showUpdatesAtom,
} from "../settings";
import { Cell } from "../types";
import { cn } from "../utils";
import { gridAtom, isCellCollapsed, wfcStepAtom } from "../wfc";

function getCellClassNames(cell: Cell, generation: number | null): string {
	if (cell.tile) {
		return "bg-green-200";
	} else if (cell.options.length === 0) {
		return "bg-red-100";
	} else if (cell.lastUpdated === generation) {
		return "bg-orange-200/70";
	}
	return "bg-neutral-100 text-neutral-600";
}

export function Grid() {
	const [grid] = useAtom(gridAtom);

	const running = useAtomValue(runningAtom);
	const step = useSetAtom(wfcStepAtom);

	const showPossibilities = useAtomValue(showPossibilitiesAtom);
	const showUpdates = useAtomValue(showUpdatesAtom);

	const generation = showUpdates ? grid.generation : null;

	return (
		// TODO: fix subpixel rendering issues
		<div
			// TODO: looks like there is no good way for an element to fill it's parent while preserving aspect-ratio
			className="m-auto w-[min(100vw-16rem-3rem,100vh-3rem)] max-w-5xl aspect-square grid"
			style={{
				gridTemplateColumns: `repeat(${grid.size}, 1fr)`,
				gridTemplateRows: `repeat(${grid.size}, 1fr)`,
			}}
		>
			{grid.cells.map((cell, i) => (
				<button
					className={cn(
						"grid items-center transition-colors duration-200",
						getCellClassNames(cell, generation)
					)}
					disabled={running || isCellCollapsed(cell)}
					onClick={() => step(i)}
					key={i}
				>
					{cell.tile ? (
						<cell.tile.Component rotation={cell.tile.rotation} />
					) : (
						showPossibilities && cell.options.length
					)}
				</button>
			))}
		</div>
	);
}
