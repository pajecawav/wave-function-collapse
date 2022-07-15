import { atom } from "jotai";
import { gridSizeAtom, INITIAL_GRID_SIZE } from "./settings";

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

export const gridAtom = atom<Grid>(createGrid(INITIAL_GRID_SIZE));

export const wfcStepAtom = atom(null, (get, set) => {
	const grid = get(gridAtom);
	const cells = grid.cells;

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
			candidateIndexes[
				Math.floor(Math.random() * candidateIndexes.length)
			];
		const cell = cells[index];
		collapseCell(cell);

		// propagate changes
		propagate(grid, index);

		iterations++;
	}

	set(gridAtom, { ...grid, cells: cells.slice() });
});

export const resetGridAtom = atom(null, (get, set) => {
	set(gridAtom, createGrid(get(gridSizeAtom)));
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
	return cell.tile !== null || cell.options.length === 0;
}

function collapseCell(cell: Cell) {
	const tile = cell.options[Math.floor(Math.random() * cell.options.length)];
	cell.tile = tile;
	cell.options = [];
}

function propagate(grid: Grid, index: number) {
	const cell = grid.cells[index];

	if (!cell.tile && cell.options.length === 0) {
		return;
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
			values.some(value => option.south.has(value))
		);
		northCell.options = northCell.options.filter(option =>
			options.some(o => o.north.has(option.value))
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
		eastCell.options = eastCell.options.filter(option =>
			options.some(o => o.east.has(option.value))
		);

		if (eastCell.options.length !== optionsCount) {
			propagate(grid, eastIndex);
		}
	}

	// south
	const southIndex = index + grid.size;
	if (southIndex < grid.size * grid.size) {
		const southCell = grid.cells[southIndex];
		const optionsCount = southCell.options.length;

		southCell.options = southCell.options.filter(option =>
			values.some(value => option.north.has(value))
		);
		southCell.options = southCell.options.filter(option =>
			options.some(o => o.south.has(option.value))
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
		westCell.options = westCell.options.filter(option =>
			options.some(o => o.west.has(option.value))
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
