declare global {
  namespace app_shop {
    const vars: {
      hotspot_slider: {
        init: () => void;
        destroy: () => void;
      };
    };
  }
}

export {};
