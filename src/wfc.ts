import { atom } from "jotai";

const GRID_SIZE = 10;

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

export const gridAtom = atom(createGrid(GRID_SIZE));

export const wfcStepAtom = atom(null, (get, set) => {
	const grid = get(gridAtom);
	const cells = grid.cells;

	const nonCollapsedCellIndexes = cells
		.map((_, i) => i)
		.filter(i => !isCellCollapsed(cells[i]) && cells[i].options.length > 0);

	const min = Math.min(
		...nonCollapsedCellIndexes.map(i => cells[i].options.length)
	);
	const candidateIndexes = nonCollapsedCellIndexes.filter(
		i => cells[i].options.length === min
	);

	// TODO: stop execution?
	if (candidateIndexes.length === 0) {
		return;
	}

	// collapse cell
	const index =
		candidateIndexes[Math.floor(Math.random() * candidateIndexes.length)];
	const cell = cells[index];
	selectRandomOption(cell);

	// propagate changes
	propagate(grid, index);

	set(gridAtom, { ...grid, cells: cells.slice() });
});

export const resetGridAtom = atom(null, (_, set) => {
	set(gridAtom, createGrid(GRID_SIZE));
});

function createGrid(size: number): Grid {
	const cells = Array.from({ length: size * size }, createEmptyCell);

	const grid: Grid = { cells, size };

	// TODO: how to properly implement initial propagation?
	for (let i = 0; i < size; i++) {
		propagate(grid, i);
	}

	return grid;
}

function createEmptyCell(): Cell {
	return { tile: null, options: TILES.slice() };
}

export function isCellCollapsed(cell: Cell): boolean {
	return cell.tile !== null;
}

function selectRandomOption(cell: Cell) {
	const tile = cell.options[Math.floor(Math.random() * cell.options.length)];
	cell.tile = tile;
	cell.options = [];
}

function propagate(grid: Grid, index: number) {
	const cell = grid.cells[index];

	if (cell.options.length === 1) {
		selectRandomOption(cell);
	}

	const [x, y] = indexToXY(index, grid.size);

	const options = cell.tile ? [cell.tile] : [...cell.options];

	const values = options.map(option => option.value);

	// north
	const northIndex = index - grid.size;
	if (northIndex >= 0) {
		const northCell = grid.cells[northIndex];
		const optionsCount = northCell.options.length;

		northCell.options = northCell.options.filter(option =>
			// option.south.has(value)
			values.some(value => option.south.has(value))
		);

		if (northCell.options.length !== optionsCount) {
			propagate(grid, northIndex);
		}
	}

	// east
	const eastIndex = index + 1;
	const [, eastY] = indexToXY(eastIndex, grid.size);
	if (y === eastY) {
		const eastCell = grid.cells[eastIndex];
		const optionsCount = eastCell.options.length;

		eastCell.options = eastCell.options.filter(option =>
			values.some(value => option.west.has(value))
		);

		if (eastCell.options.length !== optionsCount) {
			propagate(grid, eastIndex);
		}
	}

	// south
	const southIndex = index + grid.size;
	if (southIndex < grid.size * grid.size) {
		const southCell = grid.cells[eastIndex];
		const optionsCount = southCell.options.length;

		southCell.options = southCell.options.filter(option =>
			values.some(value => option.north.has(value))
		);

		if (southCell.options.length !== optionsCount) {
			propagate(grid, southIndex);
		}
	}

	// west
	const westIndex = index - 1;
	const [, westY] = indexToXY(westIndex, grid.size);
	if (y === westY) {
		const westCell = grid.cells[westIndex];
		const optionsCount = westCell.options.length;

		westCell.options = westCell.options.filter(option =>
			values.some(value => option.east.has(value))
		);

		if (westCell.options.length !== optionsCount) {
			propagate(grid, westIndex);
		}
	}
}

function indexToXY(index: number, size: number): [number, number] {
	return [index % size, Math.floor(index / size)];
}

function xyToIndex(x: number, y: number, size: number): number {
	return y * size + x;
}

export interface Grid {
	cells: ReadonlyArray<Cell>;
	size: number;
}

export interface Cell {
	tile: Tile | null;
	options: Tile[];
}

export interface Tile {
	value: TileValue;
	north: Set<TileValue>;
	east: Set<TileValue>;
	south: Set<TileValue>;
	west: Set<TileValue>;
}
