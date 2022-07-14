export function cn(...values: any[]): string {
	return values.filter(v => typeof v === "string").join(" ");
}
