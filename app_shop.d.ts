declare global {
  namespace app_shop {
    const fn:
      | {
          addToBasketAjax?: (
            productSelector: string,
            addToBasketSelector: string,
          ) => void;
        }
      | undefined;
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
