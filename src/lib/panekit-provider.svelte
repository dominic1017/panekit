<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setPaneManagerContext, PaneManager } from './pane-manager.svelte';

	type Props = {
		children?: Snippet<[]>;
	};

	const { children }: Props = $props();

	const wm = new PaneManager();
	setPaneManagerContext(wm);
</script>

<svelte:document
	onmousedown={(e) => {
		if (!(e.target instanceof Element) || !e.target.closest('[data-pane]')) {
			wm.blurAll();
		}
	}}
/>

{@render children?.()}
