import { TILES } from "../tiles";
import { reversed } from "../utils";
import { Tile } from "../types";

function TileVisualization({ tile }: { tile: Tile }) {
	const Component = tile.Component;

	return (
		<div className="p-2 rounded-md border border-zinc-600">
			<div className="tracking-widest relative aspect-square rounded-md grid place-items-center">
				<div className="w-3/5 h-3/5">
					{<Component rotation={tile.rotation} />}
				</div>
				<span className="absolute top-0">{tile.north}</span>
				<span className="absolute right-0 rotate-90">{tile.east}</span>
				<span className="absolute bottom-0">
					{reversed(tile.south)}
				</span>
				<span className="absolute left-0 -rotate-90">{tile.west}</span>
			</div>

			<div className="mt-4 text-center break-all">
				{tile.Component.name}
			</div>
			{tile.rotation !== 0 && (
				<div className="text-center">{tile.rotation}deg</div>
			)}
		</div>
	);
}

export function TilesList() {
	return (
		<div className="overflow-y-auto max-h-full p-8 grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] justify-center gap-8">
			{TILES.map((tile, i) => (
				<TileVisualization tile={tile} key={i} />
			))}
		</div>
	);
}
