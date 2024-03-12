import { getProductMap } from 'managers/ProductManager/ProductManager.utils';
import TemplateManager from 'managers/TemplateManager/TemplateManager';
import { TPages } from 'types/pages';
import { TProduct } from 'types/product';

const dummyData: TProduct = {
  id: '2111111',
  title: 'Product title',
  producerName: 'Producer TEST',
  link: 'https://www.google.com',
  producerUrl: 'https://www.google.com',
  price: '100',
  omnibus: '50',
  imageUrl: 'https://placehold.co/600x400',
  description: 'Product description',
};

class ProductManager extends TemplateManager {
  constructor(page: TPages) {
    super(page);

    this.templateHTML = this.getCurrentTempalate();
    this.prepareHTMLContent();
  }

  private templateHTML: string;

  public prepareHTMLContent = () => {
    const mappedProductValues = getProductMap(dummyData);

    for (const key in mappedProductValues) {
      const objKey = key as keyof typeof mappedProductValues;

      this.templateHTML = this.templateHTML.replaceAll(
        new RegExp(key, 'g'),
        mappedProductValues[objKey].toString(),
      );
    }

    const productsContainer = this.getProductsContainerIfExists();

    console.log(productsContainer);

    console.log(this.templateHTML);

    productsContainer.insertAdjacentHTML('beforeend', this.templateHTML);
  };
}

export default ProductManager;
