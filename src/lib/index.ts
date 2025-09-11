import * as Window from './window/index.js';
export { Window };

export { default as WindowManager } from './window-manager.svelte';

export { resize } from './resize.js';
export {
	WindowState,
	WindowManager as WindowManagerClass,
	setWindowManagerContext,
	useWM
} from './windows.svelte.js';

export type { ControlZone, ControlsPluginData } from './types.js';
export type { WithChildren, WithElementRef, HTMLDivAttributes } from './utils.js';
