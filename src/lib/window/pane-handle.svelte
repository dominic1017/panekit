<script lang="ts">
	import {
		cn,
		type HTMLDivAttributes,
		type WithChildren,
		type WithElementRef
	} from '$lib/utils.js';

	type Props = WithChildren<WithElementRef<HTMLDivAttributes, HTMLDivElement>>;

	let { ref = $bindable(null), children, class: className, ...restProps }: Props = $props();
</script>

<div {...restProps} class={cn('select-none', className)} data-pane-handle="" bind:this={ref}>
	{@render children?.()}
</div>
