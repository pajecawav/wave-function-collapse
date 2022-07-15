export function cn(...values: any[]): string {
	return values.filter(v => typeof v === "string").join(" ");
}

export function choice<T>(arr: T[]): T {
	return arr[Math.floor(arr.length * Math.random())];
}

export function reversed(s: string): string {
	return [...s].reverse().join("");
}
