import { Controls } from "./components/Controls";
import { Grid } from "./components/Grid";

export function App() {
	return (
		<main className="w-screen h-screen p-4 grid gap-4 grid-cols-[12rem,1fr] items-center">
			<Controls />
			<Grid />
		</main>
	);
}
