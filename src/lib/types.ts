export type ControlZone = {
  element: Element;
  top: number;
  right: number;
  bottom: number;
  left: number;
  area: number;
};

export type ControlsPluginData = {
  allow_zones: ControlZone[];
  block_zones: ControlZone[];
  priority: 'block' | 'allow';
  allow_fn: ((root: Element) => ControlZone[]) | ((root: Element) => ControlZone[]) | undefined;
  block_fn: ((root: Element) => ControlZone[]) | ((root: Element) => ControlZone[]) | undefined;
  compute_zones: () => {
    allow_zones: ControlZone[];
    block_zones: ControlZone[];
  };
};
