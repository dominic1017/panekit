<script lang="ts">
	import type { HTMLDivAttributes } from '$lib/utils.js';
	import type { WithElementRef } from '$lib/utils.js';
	import type { WithChildren } from '$lib/utils.js';

	type Props = WithChildren<WithElementRef<HTMLDivAttributes, HTMLDivElement>> & {
		portalId?: string;
	};

	let { ref = $bindable(null), portalId = '', ...restProps }: Props = $props();
</script>

<div {...restProps} data-pane-portal-target={portalId} bind:this={ref}></div>
