<script lang="ts">
	import { useDraggable } from '@dnd-kit-svelte/svelte';
	import { useWM, WindowState } from '../windows.svelte.js';
	import { onMount } from 'svelte';
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

			// Find handle and content elements
			handleRef = ref.querySelector('[data-window-handle]');
			contentRef = ref.querySelector('[data-window-content]');
		}
	});

	let elementPosition = $state({ x: 50, y: 50 });
	const windowId = `window-${Math.random().toString(36).substr(2, 9)}`;

	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id: windowId,
		data: () => ({
			type: 'window',
			position: elementPosition
		})
	});

	// Apply position and transform
	$effect(() => {
		if (ref) {
			let x = elementPosition.x;
			let y = elementPosition.y;

			if (transform.current) {
				x += transform.current.x;
				y += transform.current.y;
			}

			ref.style.transform = `translate3d(${x}px, ${y}px, 0)`;
		}
	});

	// Commit position when drag ends
	let wasDragging = false;
	$effect(() => {
		const currentlyDragging = isDragging.current;

		if (wasDragging && !currentlyDragging && transform.current) {
			elementPosition = {
				x: elementPosition.x + transform.current.x,
				y: elementPosition.y + transform.current.y
			};
		}

		wasDragging = currentlyDragging;
	});

	// Set up dragging with handle constraints
	function setupDragging(node: HTMLElement) {
		// Set this node as the draggable ref
		setNodeRef(node);

		// Apply attributes to the node
		$effect(() => {
			if (attributes.current) {
				Object.entries(attributes.current).forEach(([key, value]) => {
					if (typeof value === 'string') {
						node.setAttribute(key, value);
					}
				});
			}
		});

		// Apply listeners with constraints
		$effect(() => {
			const currentListeners = listeners.current;
			if (!currentListeners) return;

			const eventHandlers: Array<[string, EventListener]> = [];

			Object.entries(currentListeners).forEach(([key, handler]) => {
				if (key.startsWith('on') && typeof handler === 'function') {
					const eventType = key.slice(2).toLowerCase();

					const constrainedHandler = (e: Event) => {
						// Only allow drag from handle elements
						const target = e.target as HTMLElement;

						if (handleRef && !handleRef.contains(target)) {
							return; // Don't start drag if not from handle
						}

						if (contentRef && contentRef.contains(target)) {
							return; // Don't start drag from content areas
						}

						// Call the original handler
						handler(e);
					};

					node.addEventListener(eventType, constrainedHandler);
					eventHandlers.push([eventType, constrainedHandler]);
				}
			});

			// Cleanup function
			return () => {
				eventHandlers.forEach(([eventType, handler]) => {
					node.removeEventListener(eventType, handler);
				});
			};
		});

		return {
			destroy() {
				// Cleanup handled by effect above
			}
		};
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
	style={`width: ${size.width}px; height: ${size.height}px; position: absolute;`}
	use:setupDragging
	{@attach resize({
		minWidth: size.width,
		minHeight: size.height,
		onResizeEnd: () => {
			// Handle resize end
		},
		currentPosition: () => elementPosition,
		onPositionChange(x, y) {
			elementPosition = { x, y };
		}
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
