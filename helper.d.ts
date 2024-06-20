declare global {
  interface Window {
    sponsoredProductHelper?: (productId: string, description: string) => void;
  }
}

export {};
