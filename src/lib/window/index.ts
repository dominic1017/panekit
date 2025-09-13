import Root from './pane.svelte';
import Handle from './pane-handle.svelte';
import Content from './pane-content.svelte';
import PortalTarget from './pane-portal-target.svelte';

export {
	Root,
	Content,
	Handle,
	PortalTarget,
	//
	Root as Pane,
	PortalTarget as PanePortalTarget,
	Content as PaneContent,
	Handle as PaneHandle
};
