import { AD_PIXEL_DEPS_URL } from 'consts/dlApi';
import { getProductsIds } from 'managers/AdManager/AdManager.utils';
import { TPages } from 'types/pages';

class AdManager {
  private page: TPages | null;
  private productsIds: number[];

  constructor(page: TPages | null) {
    this.page = page;

    if (this.page) {
      this.productsIds = getProductsIds(this.page);
    }
  }

  public injectAdnPixelScript = () => {
    const adPixelDepsScript = document.createElement('script');

    adPixelDepsScript.src = AD_PIXEL_DEPS_URL;
    adPixelDepsScript.async = true;

    document.head.appendChild(adPixelDepsScript);
  };
}

export default AdManager;
