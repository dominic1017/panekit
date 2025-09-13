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
	import type { HTMLDivAttributes } from '$lib/utils.js';
	import type { WithElementRef } from '$lib/utils.js';
	import type { WithChildren } from '$lib/utils.js';
	import type { Attachment } from 'svelte/attachments';

	type Props = WithChildren<WithElementRef<HTMLDivAttributes, HTMLDivElement>> & {
		portalId?: string;
	};

	let { ref = $bindable(null), portalId = '', ...restProps }: Props = $props();
</script>

<div data-pane-portal-target={portalId} bind:this={ref} {...restProps}></div>
