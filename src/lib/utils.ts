import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
export type WithChildren<Props = unknown> = Props & {
	children?: Snippet | undefined;
};

export type HTMLDivAttributes = HTMLAttributes<HTMLDivElement>;
