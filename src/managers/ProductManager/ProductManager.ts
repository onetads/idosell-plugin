import { getProductMap } from 'managers/ProductManager/ProductManager.utils';
import TemplateManager from 'managers/TemplateManager/TemplateManager';
import { TPages } from 'types/pages';
import { TProduct } from 'types/product';

const dummyData: TProduct = {
  id: '5',
  title: 'Samsung Galaxy S21 Ultra 5G',
  producerName: 'Samsung',
  link: 'https://www.google.com',
  producerUrl: 'https://www.google.com',
  price: '5 218,99 zł',
  omnibus: '4 922,99 zł',
  imageUrl: 'https://placehold.co/600x400',
  description: 'Szybki smartfon z dużym ekranem',
  points: '12312',
  priceMax: '5 918,99 zł',
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

    productsContainer.insertAdjacentHTML('beforeend', this.templateHTML);
  };
}

export default ProductManager;
