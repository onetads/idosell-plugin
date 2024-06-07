declare global {
  namespace app_shop {
    const runApp: (() => void) | undefined;
    const vars: {
      hotspot_slider: {
        init: () => void;
        destroy: () => void;
      };
    };
  }
}

export {};
