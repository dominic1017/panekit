<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { PanekitProvider } from '$lib/index.js';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<PanekitProvider>
	<div class="h-dvh w-dvw">
		{@render children?.()}
	</div>
</PanekitProvider>
