<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setWindowManagerContext, WindowManager } from './windows.svelte';
	import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit-svelte/svelte';

	// Configure sensors for drag behavior
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8 // Require 8px movement before drag starts
			}
		})
	);

	type Props = {
		children?: Snippet<[]>;
	};

	const { children }: Props = $props();

	const wm = new WindowManager();
	setWindowManagerContext(wm);
</script>

<svelte:document
	onmousedown={(e) => {
		if (!(e.target instanceof Element) || !e.target.closest('[data-window]')) {
			wm.blurAll();
		}
	}}
/>

<DndContext {sensors}>
	{@render children?.()}
</DndContext>
