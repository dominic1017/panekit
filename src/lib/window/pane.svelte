<script module>
	function findPortalTarget(element: HTMLElement, portalId?: string) {
		if (portalId)
			return document.querySelector<HTMLElement>(`[data-pane-portal-target="${portalId}"]`);

		let current: HTMLElement | null = element;

		while (current && current.tagName !== document.documentElement.tagName) {
			const target = current.querySelector('[data-pane-portal-target]');
			if (target && target instanceof HTMLElement) {
				return target;
			}
			current = current.parentElement;
		}

		return null;
	}
</script>

<script lang="ts">
	import {
		Compartment,
		ControlFrom,
		controls,
		draggable,
		events,
		instances,
		position
	} from '@neodrag/svelte';
	import { usePM, PaneState } from '../pane-manager.svelte.js';
	import type { ControlsPluginData } from '../types.js';
	import type { WithChildren, WithElementRef, HTMLDivAttributes } from '../utils.js';
	import { resize } from '$lib/resize.svelte.js';
	import { onMount } from 'svelte';
	import { portal } from '$lib/portal.svelte';

	type Props = WithChildren<WithElementRef<HTMLDivAttributes, HTMLDivElement>> & {
		size?: { width: number; height: number };
		portalId?: string;
	};

	let {
		ref = $bindable(null),
		children,
		size = { width: 200, height: 200 },
		portalId,
		...restProps
	}: Props = $props();

	let thisPane = $state<PaneState>();
	let handleRef = $state<HTMLDivElement | null>(null);
	let contentRef = $state<HTMLDivElement | null>(null);
	let portalTargetRef = $state<HTMLElement | null>(null);
	let ready = $state(false);
	let centerPos =
		'window' in globalThis
			? { x: (window.innerWidth - size.width) / 2, y: (window.innerHeight - size.height) / 2 }
			: null;

	const wm = usePM();

	onMount(() => {
		if (ref) {
			thisPane = new PaneState({ ref });
			wm.addPane(() => thisPane!);
			handleRef = ref.querySelector('[data-pane-handle]');
			contentRef = ref.querySelector('[data-pane-content]');
			portalTargetRef = findPortalTarget(ref, portalId);
		}

		ready = true;
	});

	$effect(() => {
		if (ref && thisPane) {
			ref.style.zIndex = thisPane.focused ? '100000' : '10';
		}
	});

	let elementPosition = $state<{ x: number; y: number }>();

	const positionComp = Compartment.of(() => {
		return position({ current: elementPosition, default: centerPos });
	});
	const eventsComp = Compartment.of(() =>
		events({
			onDrag: (data) => {
				elementPosition = data.offset;
			}
		})
	);

	function recomputeDraggableZones() {
		if (ref && instances.has(ref)) {
			const data: ControlsPluginData = instances.get(ref)!.states.get('neodrag:controls');
			const { allow_zones, block_zones } = data.compute_zones();
			data.allow_zones = allow_zones;
			data.block_zones = block_zones;
		}
	}
</script>

<div
	{...restProps}
	hidden={!ready}
	role="dialog"
	tabindex="-1"
	data-pane=""
	style={`width: ${size.width}px; height: ${size.height}px;`}
	{@attach portal({ target: portalTargetRef })}
	{@attach draggable(() => [
		positionComp,
		eventsComp,
		controls({
			allow: ControlFrom.elements([handleRef]),
			block: ControlFrom.elements([contentRef])
		})
	])}
	{@attach resize({
		minWidth: size.width,
		minHeight: size.height,
		position: elementPosition,
		onResizeEnd: () => {
			recomputeDraggableZones();
		},
		onPositionChange(pos) {
			elementPosition = pos;
		}
	})}
	onmousedown={(e) => {
		e.stopPropagation();
		wm.focusPane(thisPane?.id ?? '');
		ref?.focus();
	}}
	bind:this={ref}
>
	{@render children?.()}
</div>
