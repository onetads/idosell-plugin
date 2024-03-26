import { SLIDER_CLONED_CLASS } from 'consts/products';
import {
  PRODUCT_PRICE_OMNIBUS_KEY,
  PRODUCT_PRICE_REGULAR_KEY,
} from 'consts/replaceMap/keys';
import { TAGS_STYLES, TAG_STYLES_CLASS } from 'consts/tags';
import { getProductMap } from 'managers/ProductManager/ProductManager.utils';
import TemplateManager from 'managers/TemplateManager/TemplateManager';
import { TPages } from 'types/pages';
import { TCheckProductValueMap, TFormattedProduct } from 'types/product';
import getProductsIdExtractorIfExists from 'utils/helpers/getProductsIdExtractor';
import getProductsIdSelectorIfExists from 'utils/helpers/getProductsIdSelector';
import getSliderContainerSelector from 'utils/helpers/getSliderContainerSelector';
import mapConfigPages from 'utils/helpers/mapConfigPages';

class ProductManager extends TemplateManager {
  constructor(page: TPages) {
    super(page);

    this.templateHTML = this.getCurrentTempalateHTML();
  }

  private templateHTML: string;
  private readonly productsValuesToCheck: TCheckProductValueMap = [
    {
      key: PRODUCT_PRICE_OMNIBUS_KEY,
      shouldDelete: (value) => value.length === 0,
      selector: '.omnibus_price',
    },
    {
      key: PRODUCT_PRICE_REGULAR_KEY,
      shouldDelete: (value) => value.length === 0,
      selector: '.--max',
    },
  ];

  private cleanUpProductElement = (
    element: HTMLDivElement,
    productValues: ReturnType<typeof getProductMap>,
  ) => {
    for (const obj of this.productsValuesToCheck) {
      const { key, selector, shouldDelete } = obj;

      const value = productValues[key];

      if (shouldDelete(value)) {
        element.querySelector(selector)?.remove();
      }
    }

    return element;
  };

  private deleteExistingProduct = (id: string) => {
    const productIdSelector = getProductsIdSelectorIfExists(this.page);
    const productIdExtractorKey = getProductsIdExtractorIfExists(this.page);

    Array.from(
      this.productsContainer.querySelectorAll(productIdSelector),
    ).forEach((product) => {
      const doesContainId =
        product instanceof HTMLElement &&
        productIdExtractorKey in product.dataset;

      if (!doesContainId) return;

      if (product.dataset[productIdExtractorKey] !== id) return;

      if (product.classList.contains('product')) {
        product.remove();
      } else {
        product.parentElement?.remove();
      }
    });
  };

  private addTagToProductElement = (
    productElement: Element,
    selector: string,
    dsaUrl: string | undefined,
  ) => {
    const labelElementContainer = document.createElement('p');
    labelElementContainer.classList.add(TAG_STYLES_CLASS);
    labelElementContainer.classList.add('product__name');

    const labelElement = document.createElement('span');
    labelElement.textContent = window.sponsoredProductConfig.tagLabel;
    labelElementContainer.appendChild(labelElement);

    if (dsaUrl) {
      const sponsoredLabelLink = document.createElement('a');
      sponsoredLabelLink.style.marginLeft = '4px';
      sponsoredLabelLink.style.textDecoration = 'none';
      sponsoredLabelLink.style.pointerEvents = 'auto';
      sponsoredLabelLink.href = dsaUrl;
      sponsoredLabelLink.target = '_blank';
      sponsoredLabelLink.innerHTML = 'ⓘ';

      labelElementContainer.appendChild(sponsoredLabelLink);
    }

    productElement.querySelector(selector)?.prepend(labelElementContainer);

    return productElement;
  };

  private injectTagStyles = (styles: string) => {
    const stylesElement = document.createElement('style');
    stylesElement.innerHTML = styles;
    this.productsContainer.appendChild(stylesElement);
  };

  public injectProduct = (products: TFormattedProduct[]) => {
    let productsContainer = this.productsContainer;
    const tagStyles = TAGS_STYLES[this.currentTemplate];

    this.injectTagStyles(tagStyles.styles);

    if (this.isSlider) {
      // override productsContainer to be the actual container of slider items
      productsContainer = this.productsContainer.querySelector(
        '.slick-track',
      ) as HTMLDivElement;
    }

    const { productsCount } =
      window.sponsoredProductConfig[mapConfigPages(this.page)];

    for (const [index, product] of products.entries()) {
      if (index >= productsCount) break;

      const productElement = document.createElement('div');
      let productTemplateHTML = this.templateHTML;

      const mappedProductValues = getProductMap(product);

      for (const key in mappedProductValues) {
        const objKey = key as keyof typeof mappedProductValues;

        productTemplateHTML = productTemplateHTML.replaceAll(
          new RegExp(key, 'g'),
          mappedProductValues[objKey]?.toString(),
        );
      }

      productElement.innerHTML = productTemplateHTML;
      const preparedElement = productElement.firstChild as HTMLDivElement;

      this.deleteExistingProduct(product.id);

      const cleanedProductElement = this.cleanUpProductElement(
        preparedElement,
        mappedProductValues,
      );
      const taggedProductElement = this.addTagToProductElement(
        cleanedProductElement,
        tagStyles.selector,
        product.dsaUrl,
      );

      taggedProductElement.classList.remove(SLIDER_CLONED_CLASS);
      productsContainer.prepend(taggedProductElement);
    }

    if (this.isSlider) {
      $(`${getSliderContainerSelector(this.page)} .products`).each(function () {
        $(this).slick('reinit');
      });
    }
  };
}

export default ProductManager;
