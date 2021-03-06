import { useAtom, useSetAtom } from "jotai";
import { ComponentChild } from "preact";
import { useEffect } from "preact/hooks";
import { Link, useRoute } from "wouter-preact";
import {
	gridSizeAtom,
	runningAtom,
	showPossibilitiesAtom,
	showUpdatesAtom,
	stepIntervalAtom,
} from "../settings";
import { cn } from "../utils";
import { resetGridAtom, wfcStepAtom } from "../wfc";
import { Button } from "./Button";

function NavLink({
	href,
	children,
}: {
	href: string;
	children: ComponentChild;
}) {
	const [match] = useRoute(href);

	return (
		<Link
			href={href}
			className={cn(
				"px-4 py-1 rounded-md transition-colors hover:bg-sky-100",
				match ? "bg-sky-100" : "text-neutral-800"
			)}
		>
			{children}
		</Link>
	);
}

export function Controls() {
	const step = useSetAtom(wfcStepAtom);
	const reset = useSetAtom(resetGridAtom);

	const [running, setRunning] = useAtom(runningAtom);
	const [gridSize, setGridSize] = useAtom(gridSizeAtom);
	const [showPossibilities, setShowPossibilities] = useAtom(
		showPossibilitiesAtom
	);
	const [showUpdates, setShowUpdates] = useAtom(showUpdatesAtom);
	const [stepInterval, setStepInterval] = useAtom(stepIntervalAtom);

	useEffect(() => {
		if (!running) return;

		let id: number;

		function tick() {
			step(null);
			id = setTimeout(tick, stepInterval);
		}

		id = setTimeout(tick, stepInterval);

		return () => clearTimeout(id);
	}, [running, step, stepInterval]);

	useEffect(() => {
		reset();
	}, [gridSize]);

	return (
		<div className="flex flex-col gap-10">
			<div className="flex gap-2">
				<NavLink href="/">Grid</NavLink>
				<NavLink href="/tiles">Tiles</NavLink>
			</div>

			<div className="flex flex-col gap-2">
				<label className="block">
					<input
						type="checkbox"
						checked={showPossibilities}
						onChange={e =>
							setShowPossibilities(e.currentTarget.checked)
						}
					/>{" "}
					Show possibilities
				</label>

				<label className="block">
					<input
						type="checkbox"
						checked={showUpdates}
						onChange={e => setShowUpdates(e.currentTarget.checked)}
					/>{" "}
					Show updates
				</label>

				<label>
					Grid size{" "}
					<input
						className="w-full"
						type="range"
						min="2"
						max="20"
						value={gridSize}
						onChange={e => setGridSize(+e.currentTarget.value)}
					/>
					<div className="text-neutral-600 flex justify-between">
						<span>2</span>
						<span>20</span>
					</div>
				</label>

				<label>
					Interval{" "}
					<input
						className="w-full"
						type="range"
						min="50"
						max="2000"
						value={stepInterval}
						onChange={e => setStepInterval(+e.currentTarget.value)}
					/>
					<div className="text-neutral-600 flex justify-between">
						<span>50ms</span>
						<span>2s</span>
					</div>
				</label>
			</div>

			<div className="flex gap-2">
				<Button onClick={() => setRunning(!running)}>
					{running ? "Pause" : "Run"}
				</Button>
				<Button onClick={() => step(null)} disabled={running}>
					Step
				</Button>
				<Button onClick={() => reset()}>Reset</Button>
			</div>
		</div>
	);
}
