import { AD_PIXEL_DEPS_URL } from 'consts/dlApi';
import { getProductsIds } from 'managers/AdManager/AdManager.utils';
import { EAreas } from 'types/areas';
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

  private mapPageToArea = (page: TPages) => {
    const areas: Record<TPages, EAreas> = {
      PRODUCTS_LIST: EAreas.LISTING,
      PRODUCT_DETAILS: EAreas.PRODUCT_CARD,
    };

    return areas[page];
  };

  public injectAdnPixelScript = () => {
    const area = this.page ? this.mapPageToArea(this.page) : null;

    if (window.dlApi && dlApi.fetchNativeAd) {
      dlApi.area = area || 'ros';
      dlApi.addKeyValue('offer_ids', this.productsIds.toString());

      return;
    }

    const adPixelDepsScript = document.createElement('script');

    adPixelDepsScript.src = AD_PIXEL_DEPS_URL;
    adPixelDepsScript.async = true;

    document.head.appendChild(adPixelDepsScript);
  };
}

export default AdManager;
