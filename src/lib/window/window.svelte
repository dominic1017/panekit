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
	import { useWM, WindowState } from '../windows.svelte.js';
	import { onMount } from 'svelte';
	import type { ControlsPluginData } from '../types.js';
	import { resize } from '../resize.js';
	import type { WithChildren, WithElementRef, HTMLDivAttributes } from '../utils.js';

	type Props = WithChildren<WithElementRef<HTMLDivAttributes, HTMLDivElement>> & {
		size?: { width: number; height: number };
	};

	let {
		ref = $bindable(null),
		children,
		size = { width: 200, height: 200 },
		...restProps
	}: Props = $props();

	let thisWindow = $state<WindowState>();
	let handleRef = $state<HTMLDivElement | null>(null);
	let contentRef = $state<HTMLDivElement | null>(null);

	const wm = useWM();

	onMount(() => {
		if (ref) {
			thisWindow = new WindowState({ ref });
			wm.addWindow(() => thisWindow!);
			handleRef = ref.querySelector('[data-window-handle]');
			contentRef = ref.querySelector('[data-window-content]');
		}
	});

	let elementPosition = $state({ x: 50, y: 50 });

	const positionComp = Compartment.of(() => position({ current: elementPosition }));
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
			console.log(data.allow_zones);
			const { allow_zones, block_zones } = data.compute_zones();
			data.allow_zones = allow_zones;
			data.block_zones = block_zones;
		}
	}

	$effect(() => {
		if (ref && thisWindow) {
			ref.style.zIndex = thisWindow.focused ? '100000' : '10';
		}
	});
</script>

<div
	{...restProps}
	role="dialog"
	tabindex="-1"
	data-window=""
	style={`width: ${size.width}px; height: ${size.height}px;`}
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
		onResizeEnd: () => {
			recomputeDraggableZones();
		},
		currentPosition: () => elementPosition,
		onPositionChange(x, y) {
			elementPosition = { x, y };
		},
		invisibleHandles: true
	})}
	onmousedown={(e) => {
		e.stopPropagation();
		wm.focusWindow(thisWindow?.id ?? '');
		ref?.focus();
	}}
	bind:this={ref}
>
	{@render children?.()}
</div>
