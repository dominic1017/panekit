<script lang="ts">
	import { useDraggable } from '@dnd-kit-svelte/svelte';

	let { ref } = useDraggable({ id: crypto.randomUUID() });
</script>

<button {@attach ref}>Hello world</button>
