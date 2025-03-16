import { writable } from "svelte/store";

export const result = writable<string | undefined>(undefined);

export const setResult = (value: string) => {
    result.set(value);
}