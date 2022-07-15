import { atom } from "jotai";
import { gridSizeAtom, INITIAL_GRID_SIZE } from "./settings";
import { choice } from "./utils";

export type TileValue = "A" | "B" | "C" | "D";

// Alphabetical order
export const TILES: Tile[] = [
	{
		value: "A",
		north: new Set(["A"]),
		east: new Set(["A", "B"]),
		south: new Set(["A", "B"]),
		west: new Set(["A"]),
	},
	{
		value: "B",
		north: new Set(["A", "B"]),
		east: new Set(["B", "C"]),
		south: new Set(["B", "C"]),
		west: new Set(["A", "B"]),
	},
	{
		value: "C",
		north: new Set(["B", "C"]),
		east: new Set(["C", "D"]),
		south: new Set(["C", "D"]),
		west: new Set(["B", "C"]),
	},
	{
		value: "D",
		north: new Set(["C", "D"]),
		east: new Set(["D"]),
		south: new Set(["D"]),
		west: new Set(["C", "D"]),
	},
];

const REVERSE_DIRECTIONS: Record<Direction, Direction> = {
	north: "south",
	south: "north",
	east: "west",
	west: "east",
};

export const gridAtom = atom<Grid>(createGrid(INITIAL_GRID_SIZE));

export const wfcStepAtom = atom(null, (get, set, target: number | null) => {
	const grid = get(gridAtom);
	const cells = grid.cells;

	grid.generation++;

	let iterations = 0;
	while (true) {
		const nonCollapsedCellIndexes = cells
			.map((_, i) => i)
			.filter(i => !isCellCollapsed(cells[i]));

		const min = Math.min(
			...nonCollapsedCellIndexes.map(i => cells[i].options.length)
		);
		const candidateIndexes = nonCollapsedCellIndexes.filter(
			i => cells[i].options.length === min
		);

		if ((iterations > 0 && min > 1) || candidateIndexes.length === 0) {
			break;
		}

		// collapse cell
		const index =
			iterations === 0 && target ? target : choice(candidateIndexes);
		const cell = cells[index];
		collapseCell(cell);

		// propagate changes
		propagate(grid, index);

		iterations++;
		target = null;
	}

	set(gridAtom, {
		...grid,
		cells: cells.slice(),
	});
});

export const resetGridAtom = atom(null, (get, set) => {
	set(gridAtom, createGrid(get(gridSizeAtom)));
});

function createGrid(size: number): Grid {
	const cells = Array.from({ length: size * size }, createEmptyCell);

	const grid: Grid = { cells, size, generation: 0 };

	// TODO: how to properly implement initial propagation?
	for (let i = 0; i < size; i++) {
		propagate(grid, i);
	}

	return grid;
}

function createEmptyCell(): Cell {
	return { tile: null, options: TILES.slice(), lastUpdated: -1 };
}

export function isCellCollapsed(cell: Cell): boolean {
	return cell.tile !== null || cell.options.length === 0;
}

function collapseCell(cell: Cell) {
	const tile = choice(cell.options);
	cell.tile = tile;
	cell.options = [];
}

function propagate(grid: Grid, index: number) {
	const cell = grid.cells[index];

	if (!cell.tile && cell.options.length === 0) {
		return;
	}

	collapseNeighbor(grid, index, "north");
	collapseNeighbor(grid, index, "east");
	collapseNeighbor(grid, index, "south");
	collapseNeighbor(grid, index, "west");
}

function collapseNeighbor(grid: Grid, index: number, direction: Direction) {
	const [, y] = indexToXY(index, grid.size);
	let otherIndex;

	// calculate neighbor index and check bounds
	if (direction === "north") {
		otherIndex = index - grid.size;
		if (otherIndex < 0) {
			return;
		}
	} else if (direction === "east") {
		otherIndex = index + 1;
		const [, otherY] = indexToXY(otherIndex, grid.size);
		if (y !== otherY) {
			return;
		}
	} else if (direction === "south") {
		otherIndex = index + grid.size;
		if (otherIndex >= grid.size * grid.size) {
			return;
		}
	} else if (direction === "west") {
		otherIndex = index - 1;
		const [, otherY] = indexToXY(otherIndex, grid.size);
		if (y !== otherY) {
			return;
		}
	} else {
		throw new Error(`Unknown direction ${direction}`);
	}

	const cell = grid.cells[index];
	const options = cell.tile ? [cell.tile] : [...cell.options];
	const values = options.map(option => option.value);

	const reverseDirection = REVERSE_DIRECTIONS[direction];

	const other = grid.cells[otherIndex];
	const optionsCount = other.options.length;

	other.options = other.options.filter(option =>
		values.some(value => option[reverseDirection].has(value))
	);
	other.options = other.options.filter(option =>
		options.some(o => o[direction].has(option.value))
	);

	if (other.options.length !== optionsCount) {
		propagate(grid, otherIndex);
		other.lastUpdated = grid.generation;
	}
}

function indexToXY(index: number, size: number): [number, number] {
	return [index % size, Math.floor(index / size)];
}

function xyToIndex(x: number, y: number, size: number): number {
	return y * size + x;
}

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

export interface Tile extends Record<Direction, Set<TileValue>> {
	value: TileValue;
}
