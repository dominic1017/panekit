import { getContext, setContext } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';

export class PaneState {
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

export class PaneManager {
	#paneList = new SvelteMap<string, () => PaneState>();

	get windowList() {
		return this.#paneList;
	}

	addPane(w: () => PaneState) {
		this.#paneList.set(w().id, w);
	}

	removePane(w: () => PaneState) {
		this.#paneList.delete(w().id);
	}

	focusPane(id: string) {
		const w = this.#paneList.get(id);
		this.#paneList.forEach((w) => w().blur());
		w?.().focus();
	}

	blurAll() {
		this.#paneList.forEach((w) => w().blur());
	}
}

const PaneManagerKey = Symbol('paneManager');

export function setPaneManagerContext(wm: PaneManager) {
	setContext(PaneManagerKey, wm);
}

export function usePM(): PaneManager {
	return getContext(PaneManagerKey);
}
