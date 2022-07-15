import { ComponentChildren } from "preact";
import { Tile } from "./types";

// HACK: scale each cell to fix issues with subpixel rendering
const MAGIC_SCALE = 1.05;

const green = "green";
const brown = "#9b7653";
const blue = "blue";
const strokeWidth = 5;

export const TILES: Tile[] = [
	{
		Component: Dirt,
		rotation: 0,
		weight: 4,
		north: "DDD",
		east: "DDD",
		south: "DDD",
		west: "DDD",
	},
	{
		Component: Grass,
		rotation: 0,
		weight: 4,
		north: "GGG",
		east: "GGG",
		south: "GGG",
		west: "GGG",
	},
	{
		Component: Water,
		rotation: 0,
		weight: 4,
		north: "WWW",
		east: "WWW",
		south: "WWW",
		west: "WWW",
	},

	// DirtWithGrassCorner
	{
		Component: DirtWithGrassCorner,
		rotation: 0,
		weight: 1,
		north: "GBD",
		east: "DDD",
		south: "DDD",
		west: "DBG",
	},
	{
		Component: DirtWithGrassCorner,
		rotation: 90,
		weight: 1,
		north: "DBG",
		east: "GBD",
		south: "DDD",
		west: "DDD",
	},
	{
		Component: DirtWithGrassCorner,
		rotation: 180,
		weight: 1,
		north: "DDD",
		east: "DBG",
		south: "GBD",
		west: "DDD",
	},
	{
		Component: DirtWithGrassCorner,
		rotation: 270,
		weight: 1,
		north: "DDD",
		east: "DDD",
		south: "DBG",
		west: "GBD",
	},

	// GrassWithDirtCorner
	{
		Component: GrassWithDirtCorner,
		rotation: 0,
		weight: 1,
		north: "DBG",
		east: "GGG",
		south: "GGG",
		west: "GBD",
	},
	{
		Component: GrassWithDirtCorner,
		rotation: 90,
		weight: 1,
		north: "GBD",
		east: "DBG",
		south: "GGG",
		west: "GGG",
	},
	{
		Component: GrassWithDirtCorner,
		rotation: 180,
		weight: 1,
		north: "GGG",
		east: "GBD",
		south: "DBG",
		west: "GGG",
	},
	{
		Component: GrassWithDirtCorner,
		rotation: 270,
		weight: 1,
		north: "GGG",
		east: "GGG",
		south: "GBD",
		west: "DBG",
	},

	// GrassWithWaterCorner
	{
		Component: GrassWithWaterCorner,
		rotation: 0,
		weight: 1,
		north: "WBG",
		east: "GGG",
		south: "GGG",
		west: "GBW",
	},
	{
		Component: GrassWithWaterCorner,
		rotation: 90,
		weight: 1,
		north: "GBW",
		east: "WBG",
		south: "GGG",
		west: "GGG",
	},
	{
		Component: GrassWithWaterCorner,
		rotation: 180,
		weight: 1,
		north: "GGG",
		east: "GBW",
		south: "WBG",
		west: "GGG",
	},
	{
		Component: GrassWithWaterCorner,
		rotation: 270,
		weight: 1,
		north: "GGG",
		east: "GGG",
		south: "GBW",
		west: "WBG",
	},

	// WaterWithGrassCorner
	{
		Component: WaterWithGrassCorner,
		rotation: 0,
		weight: 1,
		north: "GBW",
		east: "WWW",
		south: "WWW",
		west: "WBG",
	},
	{
		Component: WaterWithGrassCorner,
		rotation: 90,
		weight: 1,
		north: "WBG",
		east: "GBW",
		south: "WWW",
		west: "WWW",
	},
	{
		Component: WaterWithGrassCorner,
		rotation: 180,
		weight: 1,
		north: "WWW",
		east: "WBG",
		south: "GBW",
		west: "WWW",
	},
	{
		Component: WaterWithGrassCorner,
		rotation: 270,
		weight: 1,
		north: "WWW",
		east: "WWW",
		south: "WBG",
		west: "GBW",
	},

	// DirtWithTwoGrassCorners
	{
		Component: DirtWithTwoGrassCorners,
		rotation: 0,
		weight: 1,
		north: "GBD",
		east: "DBG",
		south: "GBD",
		west: "DBG",
	},
	{
		Component: DirtWithTwoGrassCorners,
		rotation: 90,
		weight: 1,
		north: "DBG",
		east: "GBD",
		south: "DBG",
		west: "GBD",
	},

	// GrassWithTwoWaterCorners
	{
		Component: GrassWithTwoWaterCorners,
		rotation: 0,
		weight: 1,
		north: "WBG",
		east: "GBW",
		south: "WBG",
		west: "GBW",
	},
	{
		Component: GrassWithTwoWaterCorners,
		rotation: 90,
		weight: 1,
		north: "GBW",
		east: "WBG",
		south: "GBW",
		west: "WBG",
	},

	// HalfsDirtGrass
	{
		Component: HalfsDirtGrass,
		rotation: 0,
		weight: 2,
		north: "DDD",
		east: "DBG",
		south: "GGG",
		west: "GBD",
	},
	{
		Component: HalfsDirtGrass,
		rotation: 90,
		weight: 2,
		north: "GBD",
		east: "DDD",
		south: "DBG",
		west: "GGG",
	},
	{
		Component: HalfsDirtGrass,
		rotation: 180,
		weight: 2,
		north: "GGG",
		east: "GBD",
		south: "DDD",
		west: "DBG",
	},
	{
		Component: HalfsDirtGrass,
		rotation: 270,
		weight: 2,
		north: "DBG",
		east: "GGG",
		south: "GBD",
		west: "DDD",
	},

	// HalfsGrassWater
	{
		Component: HalfsGrassWater,
		rotation: 0,
		weight: 2,
		north: "GGG",
		east: "GBW",
		south: "WWW",
		west: "WBG",
	},
	{
		Component: HalfsGrassWater,
		rotation: 90,
		weight: 1,
		north: "WBG",
		east: "GGG",
		south: "GBW",
		west: "WWW",
	},
	{
		Component: HalfsGrassWater,
		rotation: 180,
		weight: 2,
		north: "WWW",
		east: "WBG",
		south: "GGG",
		west: "GBW",
	},
	{
		Component: HalfsGrassWater,
		rotation: 270,
		weight: 2,
		north: "GBW",
		east: "WWW",
		south: "WBG",
		west: "GGG",
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
			style={{
				transform: `rotate(${rotation}deg) scale(${MAGIC_SCALE})`,
			}}
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

function Water() {
	return (
		<Container>
			<Background color={blue} />
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

function GrassWithDirtCorner({ rotation }: { rotation: number }) {
	return (
		<Container rotation={rotation}>
			<Background color={green} />
			<Corner color={brown} />
		</Container>
	);
}

function GrassWithWaterCorner({ rotation }: { rotation: number }) {
	return (
		<Container rotation={rotation}>
			<Background color={green} />
			<Corner color={blue} />
		</Container>
	);
}

function WaterWithGrassCorner({ rotation }: { rotation: number }) {
	return (
		<Container rotation={rotation}>
			<Background color={blue} />
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

function GrassWithTwoWaterCorners({ rotation }: { rotation: number }) {
	return (
		<Container rotation={rotation}>
			<Background color={green} />
			<Corner color={blue} />
			<OppositeCorner color={blue} />
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

function HalfsGrassWater({ rotation }: { rotation: number }) {
	return (
		<Container rotation={rotation}>
			<Half color={green} />
			<OppositeHalf color={blue} />
			<HalfStroke />
		</Container>
	);
}
