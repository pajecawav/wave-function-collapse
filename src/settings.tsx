import { atom } from "jotai";

export const INITIAL_GRID_SIZE = 10;

export const runningAtom = atom(false);
export const gridSizeAtom = atom(INITIAL_GRID_SIZE);
export const showPossibilitiesAtom = atom(true);
export const showUpdatesAtom = atom(true);
export const stepIntervalAtom = atom(500);
