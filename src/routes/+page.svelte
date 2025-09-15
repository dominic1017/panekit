<script lang="ts">
	import { Pane, PanekitProvider } from '$lib/index.js';
</script>

<PanekitProvider>
	<div class="flex h-screen">
		<div class="flex-1">
			<Pane.PortalTarget portalId="left-panel" />
		</div>
		<div class="m-8 flex-1 border">
			<Pane.PortalTarget portalId="right-panel" />
		</div>
	</div>

	<!-- This pane will render in the right panel -->
	<Pane.Root constrainToPortal portalId="right-panel">
		<Pane.Handle>Right Side Window</Pane.Handle>
		<Pane.Content>Content here</Pane.Content>
	</Pane.Root>
</PanekitProvider>
