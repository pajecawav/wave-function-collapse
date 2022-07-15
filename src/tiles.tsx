import { ComponentChildren } from "preact";
import { Tile } from "./types";

const green = "green";
const brown = "#9b7653";
const strokeWidth = 5;

export const TILES: Tile[] = [
	{
		Component: Dirt,
		rotation: 0,
		north: "DDD",
		east: "DDD",
		south: "DDD",
		west: "DDD",
	},
	{
		Component: Grass,
		rotation: 0,
		north: "GGG",
		east: "GGG",
		south: "GGG",
		west: "GGG",
	},
	{
		Component: DirtWithGrassCorner,
		rotation: 0,
		north: "GBD",
		east: "DDD",
		south: "DDD",
		west: "DBG",
	},
	{
		Component: DirtWithGrassCorner,
		rotation: 90,
		north: "DBG",
		east: "GBD",
		south: "DDD",
		west: "DDD",
	},
	{
		Component: DirtWithGrassCorner,
		rotation: 180,
		north: "DDD",
		east: "DBG",
		south: "GBD",
		west: "DDD",
	},
	{
		Component: DirtWithGrassCorner,
		rotation: 270,
		north: "DDD",
		east: "DDD",
		south: "DBG",
		west: "GBD",
	},
	{
		Component: DirtWithTwoGrassCorners,
		rotation: 0,
		north: "GBD",
		east: "DBG",
		south: "GBD",
		west: "DBG",
	},
	{
		Component: DirtWithTwoGrassCorners,
		rotation: 90,
		north: "DBG",
		east: "GBD",
		south: "DBG",
		west: "GBD",
	},
	{
		Component: HalfsDirtGrass,
		rotation: 0,
		north: "DDD",
		east: "DBG",
		south: "GGG",
		west: "GBD",
	},
	{
		Component: HalfsDirtGrass,
		rotation: 90,
		north: "GBD",
		east: "DDD",
		south: "DBG",
		west: "GGG",
	},
	{
		Component: HalfsDirtGrass,
		rotation: 180,
		north: "GGG",
		east: "GBD",
		south: "DDD",
		west: "DBG",
	},
	{
		Component: HalfsDirtGrass,
		rotation: 270,
		north: "DBG",
		east: "GGG",
		south: "GBD",
		west: "DDD",
	},
];

function Container({
	children,
	rotation = 0,
}: {
	children: ComponentChildren;
	rotation?: number;
}) {
	return (
		<svg
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			style={{ transform: `rotate(${rotation}deg)` }}
		>
			{children}
		</svg>
	);
}

function Background({ color }: { color: string }) {
	return <rect x="0" y="0" width="100" height="100" fill={color} />;
}

function Half({ color }: { color: string }) {
	return <rect x="0" y="0" width="100" height="50" fill={color} />;
}

function OppositeHalf({ color }: { color: string }) {
	return <rect x="0" y="50" width="100" height="50" fill={color} />;
}

function HalfStroke() {
	return (
		<line
			x1="0"
			y1="50"
			x2="100"
			y2="50"
			stroke="black"
			strokeWidth={strokeWidth}
		/>
	);
}

function Corner({ color }: { color: string }) {
	return (
		<rect
			x="-50"
			y="-50"
			width="100"
			height="100"
			rx="30"
			fill={color}
			stroke="black"
			strokeWidth={strokeWidth}
		/>
	);
}

function OppositeCorner({ color }: { color?: string }) {
	return (
		<rect
			x="50"
			y="50"
			width="100"
			height="100"
			rx="30"
			fill={color}
			stroke="black"
			strokeWidth={strokeWidth}
		/>
	);
}

function Dirt() {
	return (
		<Container>
			<Background color={brown} />
		</Container>
	);
}

function Grass() {
	return (
		<Container>
			<Background color={green} />
		</Container>
	);
}

function DirtWithGrassCorner({ rotation }: { rotation: number }) {
	return (
		<Container rotation={rotation}>
			<Background color={brown} />
			<Corner color={green} />
		</Container>
	);
}

function DirtWithTwoGrassCorners({ rotation }: { rotation: number }) {
	return (
		<Container rotation={rotation}>
			<Background color={brown} />
			<Corner color={green} />
			<OppositeCorner color={green} />
		</Container>
	);
}

function HalfsDirtGrass({ rotation }: { rotation: number }) {
	return (
		<Container rotation={rotation}>
			<Half color={brown} />
			<OppositeHalf color={green} />
			<HalfStroke />
		</Container>
	);
}
