<script lang="ts">
	import type { HTMLDivAttributes, WithChildren, WithElementRef } from '$lib/utils.js';

	type Props = WithChildren<WithElementRef<HTMLDivAttributes, HTMLDivElement>>;

	let { ref = $bindable(null), children, ...restProps }: Props = $props();
</script>

<div data-pane-handle="" bind:this={ref} {...restProps}>
	{@render children?.()}
</div>
