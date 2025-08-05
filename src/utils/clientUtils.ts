import type { ChangeEvent, KeyboardEvent } from "react";
import toast from "react-hot-toast";

/**
 * Creates a toast that says the given description is not implemented yet
 * @param description the description of the feature that is not implemented yet
 */
export const TodoFn = (description: string) => () => toast(`${description} is not implemented yet`, { icon: "⏳" });

/**
 * Converts the input of a function from a string to an event.
 * @param fn the function to convert the input of
 * @returns the function that takes an event as input
 */
export const evStringFn =
	(fn: (value: string) => void) => (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
		fn(ev.currentTarget.value);

/**
 * Converts the input of a function from a boolean to an event.
 * @param fn the function to convert the input of
 * @returns the function that takes an event as input
 */
export const evBoolFn = (fn: (value: boolean) => void) => (ev: ChangeEvent<HTMLInputElement>) => fn(ev.currentTarget.checked);

/**
 * Returns the function that executes the given function when the enter key is pressed.
 * @param fn the function to execute
 * @returns the function that executes the given function when the enter key is pressed
 */
export const onEnterFn = (fn: () => void) => (ev: KeyboardEvent<HTMLInputElement>) => {
	if (ev.key === "Enter") fn();
};
