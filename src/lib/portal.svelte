<script module lang="ts">
	import type { Attachment } from 'svelte/attachments';

	export type PortalOpts = {
		target?: HTMLElement | string | Nullish;
		overrideHidden?: boolean;
	};

	export function portal(
		{ target, overrideHidden }: PortalOpts = { overrideHidden: true }
	): Attachment<HTMLElement> {
		return (el) => {
			if (overrideHidden) {
				el.hidden = true;
			}

			let targetEl: HTMLElement | null;

			if (typeof target === 'string') {
				targetEl = document.querySelector(target);
				if (!targetEl) {
					throw new Error(`No element found matching css selector: "${target}"`);
				}
			} else if (target) {
				targetEl = target;
			} else {
				targetEl = document.body;
			}

			targetEl.appendChild(el);

			if (overrideHidden) {
				el.hidden = false;
			}

			return () => {
				if (el.parentNode) {
					el.parentNode.removeChild(el);
				}
			};
		};
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Nullish } from './utils.js';

	interface Props {
		target?: HTMLElement | string;
		children?: Snippet;
	}

	let { target, children }: Props = $props();
</script>

<div {@attach portal({ target })} hidden>
	{@render children?.()}
</div>
