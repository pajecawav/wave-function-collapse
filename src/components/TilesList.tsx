import { TILES } from "../tiles";
import { Tile } from "../types";
import { reversed } from "../utils";

function TileVisualization({ tile }: { tile: Tile }) {
	const Component = tile.Component;

	return (
		<div className="p-2 rounded-md border border-zinc-600">
			<div className="mb-4 tracking-widest relative aspect-square rounded-md grid place-items-center">
				<div className="w-3/5 h-3/5">
					{<Component rotation={tile.rotation} />}
				</div>
				<span className="absolute top-0">{tile.north}</span>
				<span className="absolute right-0 [writing-mode:vertical-lr]">
					{tile.east}
				</span>
				<span className="absolute bottom-0">
					{reversed(tile.south)}
				</span>
				<span className="absolute left-0 [writing-mode:vertical-rl] rotate-180">
					{tile.west}
				</span>
			</div>

			{/* function name is minified in production build so it's practically useless */}
			{import.meta.env.DEV && (
				<>
					<div className="text-center break-all">
						{tile.Component.name}
					</div>
					{tile.rotation !== 0 && (
						<div className="text-center">{tile.rotation}deg</div>
					)}
				</>
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
