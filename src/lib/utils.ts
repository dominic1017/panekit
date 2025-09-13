import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
export type WithChildren<Props = unknown> = Props & {
	children?: Snippet | undefined;
};

export type HTMLDivAttributes = HTMLAttributes<HTMLDivElement>;

export type Nullish = null | undefined;
