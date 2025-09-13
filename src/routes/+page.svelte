<script lang="ts">
	import { Pane } from '$lib/index.js';
</script>

<Pane.Root class="rounded-md border border-gray-700 shadow-md">
	<Pane.Handle>Handle</Pane.Handle>
	<Pane.Content class="h-full w-full">Content</Pane.Content>
</Pane.Root>

<div id="some-important-container">
	<Pane.PortalTarget />
</div>
