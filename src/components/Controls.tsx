import { useAtom } from "jotai";
import { ComponentChild } from "preact";
import { useEffect } from "preact/hooks";
import { Link, useRoute } from "wouter-preact";
import {
	runningAtom,
	showPossibilitiesAtom,
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
				"px-2 py-1 rounded-md transition-colors hover:bg-nuetral-100",
				match && "bg-neutral-100"
			)}
		>
			{children}
		</Link>
	);
}

export function Controls() {
	const [, step] = useAtom(wfcStepAtom);
	const [, reset] = useAtom(resetGridAtom);

	const [running, setRunning] = useAtom(runningAtom);
	const [showPossibilities, setShowPossibilities] = useAtom(
		showPossibilitiesAtom
	);
	const [stepInterval, setStepInterval] = useAtom(stepIntervalAtom);

	useEffect(() => {
		if (!running) return;

		let id: number;

		function tick() {
			step();
			id = setTimeout(tick, stepInterval);
		}

		id = setTimeout(tick, stepInterval);

		return () => clearTimeout(id);
	}, [running, step, stepInterval]);

	return (
		<div className="mx-4 h-80 flex flex-col gap-2 justify-around">
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

				<label>
					Interval{" "}
					<input
						className="w-full"
						type="range"
						min="100"
						max="3000"
						value={stepInterval}
						onChange={e => setStepInterval(+e.currentTarget.value)}
					/>
					<div className="text-neutral-600 flex justify-between">
						<span>0.1s</span>
						<span>3s</span>
					</div>
				</label>
			</div>

			<div className="flex gap-2">
				<Button onClick={() => setRunning(!running)}>
					{running ? "Stop" : "Run"}
				</Button>
				<Button onClick={() => step()}>Step</Button>
				<Button onClick={() => reset()}>Reset</Button>
			</div>
		</div>
	);
}
