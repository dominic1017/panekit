<script lang="ts">
	import { Pane } from '$lib/index.js';
	import PanePortalTarget from '$lib/window/pane-portal-target.svelte';
</script>

<Pane.Root class="rounded-md border border-gray-700 bg-white shadow-md ">
	<Pane.Handle>Handle</Pane.Handle>
	<Pane.Content>content</Pane.Content>
</Pane.Root>

<Pane.Root dragModifier="shiftKey" class="rounded-md border border-gray-700 bg-white shadow-md ">
	<Pane.Handle>Shift Handle</Pane.Handle>
	<Pane.Content>content</Pane.Content>
</Pane.Root>

<PanePortalTarget class="relative -z-10 m-10 h-96 w-96 border border-red-500 bg-white" />
