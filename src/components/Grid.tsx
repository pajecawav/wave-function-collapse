import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
	runningAtom,
	showPossibilitiesAtom,
	showUpdatesAtom,
} from "../settings";
import { cn } from "../utils";
import { Cell, gridAtom, isCellCollapsed, wfcStepAtom } from "../wfc";

function getCellClassNames(cell: Cell, generation: number | null): string {
	if (cell.tile) {
		return "bg-green-200";
	} else if (cell.options.length === 0) {
		return "bg-red-100";
	} else if (cell.lastUpdated === generation) {
		return "bg-orange-100/90";
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
		<div
			// TODO: looks like there is no good way for an element to fill it's parent while preserving aspect-ratio
			className="m-auto w-[min(100vw-16rem-3rem,100vh-3rem)] max-w-5xl aspect-square grid gap-1"
			style={{
				gridTemplateColumns: `repeat(${grid.size}, 1fr)`,
				gridTemplateRows: `repeat(${grid.size}, 1fr)`,
			}}
		>
			{grid.cells.map((cell, i) => (
				<button
					className={cn(
						"grid items-center text-center rounded-md transition-colors duration-200",
						getCellClassNames(cell, generation)
					)}
					disabled={running || isCellCollapsed(cell)}
					onClick={() => step(i)}
					key={i}
				>
					{cell.tile?.value ??
						(showPossibilities &&
							cell.options.map(o => o.value).join(""))}
				</button>
			))}
		</div>
	);
}
