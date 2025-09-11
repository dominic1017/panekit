import { getContext, setContext } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';

export class WindowState {
	focused = $state(true);
	ref: HTMLDivElement;
	id = crypto.randomUUID();

	constructor({ ref }: { ref: HTMLDivElement }) {
		this.ref = ref;
	}

	focus() {
		this.focused = true;
	}

	blur() {
		this.focused = false;
	}
}

export class WindowManager {
	#windowList = new SvelteMap<string, () => WindowState>();

	get windowList() {
		return this.#windowList;
	}

	addWindow(w: () => WindowState) {
		this.#windowList.set(w().id, w);
	}

	removeWindow(w: () => WindowState) {
		this.#windowList.delete(w().id);
	}

	focusWindow(id: string) {
		const w = this.#windowList.get(id);
		this.#windowList.forEach((w) => w().blur());
		w?.().focus();
	}

	blurAll() {
		this.#windowList.forEach((w) => w().blur());
	}
}

const WindowManagerKey = Symbol('windowManager');

export function setWindowManagerContext(wm: WindowManager) {
	setContext(WindowManagerKey, wm);
}

export function useWM(): WindowManager {
	return getContext(WindowManagerKey);
}
