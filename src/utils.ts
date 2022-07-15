export function cn(...values: any[]): string {
	return values.filter(v => typeof v === "string").join(" ");
}

export function choice<T>(arr: T[]): T {
	return arr[Math.floor(arr.length * Math.random())];
}

export function weightedChoice<T>(arr: T[], getter: (item: T) => number): T {
	let total = 0;

	for (const item of arr) {
		total += getter(item);
	}

	const num = Math.floor(Math.random() * total);

	let cur = 0;
	for (const item of arr) {
		const weight = getter(item);
		if (cur + weight > num) {
			return item;
		}
		cur += weight;
	}

	throw new Error("Unreachable code");
}

export function reversed(s: string): string {
	return [...s].reverse().join("");
}
