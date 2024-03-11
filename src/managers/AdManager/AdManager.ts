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
}

export default AdManager;
