<script module lang="ts">
	export type PanePortalTargetOpts = {
		portalId: string;
	};

	export function panePortalTarget(opts?: PanePortalTargetOpts): Attachment<HTMLElement> {
		return (el) => {
			el.setAttribute('data-pane-portal-target', opts?.portalId ?? '');
		};
	}
</script>

<script lang="ts">
	import { cn, type HTMLDivAttributes } from '$lib/utils.js';
	import type { WithElementRef } from '$lib/utils.js';
	import type { WithChildren } from '$lib/utils.js';
	import type { Attachment } from 'svelte/attachments';

	type Props = WithChildren<WithElementRef<HTMLDivAttributes, HTMLDivElement>> & {
		portalId?: string;
	};

	let { ref = $bindable(null), portalId = '', class: className, ...restProps }: Props = $props();

	$effect(() => {
		if (ref && ref.parentElement) {
			ref.parentElement.style.position = 'absolute';
			ref.parentElement.style.zIndex = '1001';
		}
	});
</script>

<div
	class={cn('h-full w-full', className)}
	data-pane-portal-target={portalId}
	bind:this={ref}
	{...restProps}
></div>
