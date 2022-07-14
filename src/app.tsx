import { Redirect, Route, Switch } from "wouter-preact";
import { Controls } from "./components/Controls";
import { Grid } from "./components/Grid";
import { TilesList } from "./components/TilesList";

export function App() {
	return (
		<main className="w-screen h-screen p-4 grid gap-4 grid-cols-[16rem,1fr] items-center">
			<Controls />
			<Switch>
				<Route path="/" component={Grid} />
				<Route path="/tiles" component={TilesList} />
				<Redirect to="/" />
			</Switch>
		</main>
	);
}
