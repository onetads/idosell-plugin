import { SLIDER_CLONED_CLASS, SPONSORED_PRODUCT_CLASS } from 'consts/products';
import {
  PRODUCT_PRICE_OMNIBUS_KEY,
  PRODUCT_PRICE_REGULAR_KEY,
} from 'consts/replaceMap/keys';
import { DSA_ICON, LABEL_CLASS, LABEL_CONTAINER_CLASS } from 'consts/tags';
import { getProductMap } from 'managers/ProductManager/ProductManager.utils';
import TemplateManager from 'managers/TemplateManager/TemplateManager';
import { getMappedTemplate } from 'managers/TemplateManager/TemplateManager.utils';
import { TPages } from 'types/pages';
import { TCheckProductValueMap, TFormattedProduct } from 'types/product';
import { ETemplates } from 'types/templates';
import getProductsIdExtractorIfExists from 'utils/helpers/getProductsIdExtractor';
import getProductsIdSelectorIfExists from 'utils/helpers/getProductsIdSelector';
import getSliderContainerSelector from 'utils/helpers/getSliderContainerSelector';

class ProductManager extends TemplateManager {
  constructor(page: TPages) {
    super(page);

    this.templateHTML = this.getCurrentTemplateHTML();
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
    dsaUrl: string | undefined,
  ) => {
    const labelElementContainer = document.createElement('strong');
    labelElementContainer.classList.add(LABEL_CONTAINER_CLASS);
    labelElementContainer.style.alignSelf = 'flex-start';

    const labelElement = document.createElement('span');
    labelElement.textContent = window.sponsoredProductConfig.tagLabel;
    labelElement.className = LABEL_CLASS;
    labelElementContainer.appendChild(labelElement);

    if (dsaUrl) {
      const sponsoredLabelLink = document.createElement('a');
      sponsoredLabelLink.style.marginLeft = '4px';
      sponsoredLabelLink.style.color = 'inherit';
      sponsoredLabelLink.style.fontSize = 'inherit';
      sponsoredLabelLink.style.textDecoration = 'none';
      sponsoredLabelLink.style.pointerEvents = 'auto';
      sponsoredLabelLink.href = dsaUrl;
      sponsoredLabelLink.target = '_blank';
      sponsoredLabelLink.innerHTML = DSA_ICON;

      labelElement.appendChild(sponsoredLabelLink);
    }

    if (
      getMappedTemplate(this.page) === ETemplates.PRODUCT_DETAILS_ASSOCIATED_ONE
    ) {
      const productNameContainer = productElement.querySelector(
        '.product__name',
      )?.parentElement as HTMLDivElement;

      productNameContainer.prepend(labelElementContainer);
    } else {
      const productIconContainer = productElement.querySelector(
        '.product__icon',
      ) as HTMLDivElement;

      productIconContainer.style.flexDirection = 'column';

      productIconContainer.append(labelElementContainer);
    }

    return productElement;
  };

  public injectProduct = (products: TFormattedProduct[]) => {
    let productsContainer = this.productsContainer;

    if (this.isSlider) {
      // override productsContainer to be the actual container of slider items
      productsContainer = this.productsContainer.querySelector(
        '.slick-track',
      ) as HTMLDivElement;
    }

    for (const product of products) {
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
        product.dsaUrl,
      );

      taggedProductElement.classList.remove(SLIDER_CLONED_CLASS);
      taggedProductElement.id = product.div;
      taggedProductElement.classList.add(SPONSORED_PRODUCT_CLASS);
      productsContainer.prepend(taggedProductElement);
      product.renderAd();
    }

    if (this.isSlider) {
      $(`${getSliderContainerSelector(this.page)} .products`).each(function () {
        $(this).slick('reinit');
      });
    }
  };
}

export default ProductManager;
