import { useAtom } from "jotai";
import { showPossibilitiesAtom } from "../settings";
import { resetGridAtom, wfcStepAtom } from "../wfc";
import { Button } from "./Button";

export function Controls() {
	const [, step] = useAtom(wfcStepAtom);
	const [, reset] = useAtom(resetGridAtom);

	const [showPossibilities, setShowPossibilities] = useAtom(
		showPossibilitiesAtom
	);

	return (
		<div className="mx-4 flex flex-col gap-2">
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

			<div className="flex gap-2">
				<Button onClick={() => step()}>Step</Button>
				<Button onClick={() => reset()}>Reset</Button>
			</div>
		</div>
	);
}
