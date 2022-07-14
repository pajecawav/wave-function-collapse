import { Tile, TILES, TileValue } from "../wfc";

function TileVisualization({ tile }: { tile: Tile }) {
	const getValues = (set: Set<TileValue>): string => [...set].join("");

	return (
		<div className="relative aspect-square border border-zinc-600 rounded-md grid place-items-center">
			<span>{tile.value}</span>
			<span className="absolute top-1">{getValues(tile.north)}</span>
			<span className="absolute right-1">{getValues(tile.east)}</span>
			<span className="absolute bottom-1">{getValues(tile.south)}</span>
			<span className="absolute left-1">{getValues(tile.west)}</span>
		</div>
	);
}

export function TilesList() {
	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,8rem))] justify-center gap-8">
			{TILES.map(tile => (
				<TileVisualization tile={tile} key={tile.value} />
			))}
		</div>
	);
}
