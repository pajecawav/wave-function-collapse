import { FunctionComponent } from "preact";

export type Edge = string;
export type Direction = "north" | "east" | "south" | "west";

export interface Grid {
	cells: ReadonlyArray<Cell>;
	size: number;
	generation: number;
}

export interface Cell {
	tile: Tile | null;
	options: Tile[];
	lastUpdated: number;
}

export interface Tile extends Record<Direction, Edge> {
	Component: FunctionComponent<{ rotation: number }>;
	rotation: number;
}
