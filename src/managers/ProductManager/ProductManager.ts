import { getProductMap } from 'managers/ProductManager/ProductManager.utils';
import TemplateManager from 'managers/TemplateManager/TemplateManager';
import { TPages } from 'types/pages';
import { TFormattedProduct } from 'types/product';

class ProductManager extends TemplateManager {
  constructor(page: TPages) {
    super(page);

    this.templateHTML = this.getCurrentTempalate();
  }

  private templateHTML: string;

  public injectProduct = (products: TFormattedProduct[]) => {
    for (const product of products) {
      const mappedProductValues = getProductMap(product);

      for (const key in mappedProductValues) {
        const objKey = key as keyof typeof mappedProductValues;

        this.templateHTML = this.templateHTML.replaceAll(
          new RegExp(key, 'g'),
          mappedProductValues[objKey].toString(),
        );
      }

      const productsContainer = this.getProductsContainerIfExists();

      productsContainer.insertAdjacentHTML('beforeend', this.templateHTML);
    }
  };
}

export default ProductManager;

