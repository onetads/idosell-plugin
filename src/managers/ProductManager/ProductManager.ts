import { APP_SHOP_RUN_APP } from 'consts/messages';
import {
  ADD_TO_BASKET_BTN_CLASS,
  PRODUCT_CLASS,
  SLIDER_CLONED_CLASS,
  SPONSORED_PRODUCT_CLASS,
} from 'consts/products';
import {
  PRODUCT_PRICE_OMNIBUS_KEY,
  PRODUCT_PRICE_REGULAR_KEY,
} from 'consts/replaceMap/keys';
import { DSA_ICON, LABEL_CLASS, LABEL_CONTAINER_CLASS } from 'consts/tags';
import {
  getProductMap,
  overrideProductStyles,
} from 'managers/ProductManager/ProductManager.utils';
import TemplateManager from 'managers/TemplateManager/TemplateManager';
import { TPages } from 'types/pages';
import { TCheckProductValueMap, TFormattedProduct } from 'types/product';
import { TSlickSliderOptions } from 'types/slider';
import getMessage from 'utils/formatters/getMessage';
import deleteExisitingSponsoredProducts from 'utils/helpers/deleteExistingSponsoredProducts';
import getProductsIdExtractorIfExists from 'utils/helpers/getProductsIdExtractor';
import getProductsIdSelectorIfExists from 'utils/helpers/getProductsIdSelector';
import getSliderContainerSelector from 'utils/helpers/getSliderContainerSelector';
import { hideLoadingSpinner } from 'utils/helpers/loadingSpinner';
import { shouldOnlyRunAddToBasket } from 'managers/TemplateManager/TemplateManager.utils';

class ProductManager extends TemplateManager {
  shouldOnlyRunAddToBasket: boolean;

  constructor(page: TPages) {
    super(page);

    this.templateHTML = this.getCurrentTemplateHTML();
    this.shouldOnlyRunAddToBasket = shouldOnlyRunAddToBasket();
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
    labelElement.style.display = 'inline-flex';
    labelElement.style.alignItems = 'center';
    labelElement.style.paddingLeft = '10px';
    labelElement.style.paddingRight = '10px';
    labelElement.textContent = window.sponsoredProductConfig.tagLabel;
    labelElement.className = LABEL_CLASS;
    labelElementContainer.appendChild(labelElement);

    if (dsaUrl) {
      const sponsoredLabelLink = document.createElement('span');
      sponsoredLabelLink.style.marginLeft = '4px';
      sponsoredLabelLink.style.color = 'inherit';
      sponsoredLabelLink.style.fontSize = 'inherit';
      sponsoredLabelLink.style.lineHeight = '1';
      sponsoredLabelLink.style.textDecoration = 'none';
      sponsoredLabelLink.style.pointerEvents = 'auto';
      sponsoredLabelLink.style.cursor = 'pointer';

      sponsoredLabelLink.addEventListener('click', (e) => {
        e.preventDefault();

        window.open(dsaUrl, '_blank');
      });

      sponsoredLabelLink.innerHTML = DSA_ICON;

      labelElement.appendChild(sponsoredLabelLink);
    }

    // associated section with products have 2 different structures of product elements
    // so we need to check which one is used and append label to the correct element
    if (this.productsContainer.parentElement?.classList.contains('--list')) {
      const productNameContainer = productElement.querySelector(
        '.product__name',
      )?.parentElement as HTMLDivElement;

      productNameContainer.prepend(labelElementContainer);
    } else {
      const labelContainer = productElement.querySelector(
        '.label_container',
      ) as HTMLDivElement;

      if (labelContainer) {
        labelContainer.append(labelElementContainer);
      } else {
        const productIconContainer = productElement.querySelector(
          '.product__icon',
        ) as HTMLDivElement;

        productIconContainer.style.flexDirection = 'column';

        productIconContainer.append(labelElementContainer);
      }
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

      $(`${getSliderContainerSelector(this.page)}`).slick('unslick');
    }

    deleteExisitingSponsoredProducts();
    for (const product of products) {
      const productElement = document.createElement('div');
      let productTemplateHTML = this.templateHTML;

      const mappedProductValues = getProductMap(product);

      for (const key in mappedProductValues) {
        const objKey = key as keyof typeof mappedProductValues;
        const value = mappedProductValues[objKey];
        let matchIndex = 0;

        productTemplateHTML = productTemplateHTML.replace(
          new RegExp(key, 'g'),
          () => {
            if (Array.isArray(value)) {
              const replacement =
                value[matchIndex] !== undefined ? value[matchIndex] : '';
              matchIndex++;
              return replacement;
            }

            return (value ?? '').toString();
          },
        );
      }

      productElement.innerHTML = productTemplateHTML;
      const preparedElement = productElement.firstChild as HTMLDivElement;

      if (!this.isSlider) {
        this.deleteExistingProduct(product.id);
      }

      const cleanedProductElement = this.cleanUpProductElement(
        preparedElement,
        mappedProductValues,
      );

      const taggedProductElement = this.addTagToProductElement(
        cleanedProductElement,
        product.dsaUrl,
      );

      overrideProductStyles(taggedProductElement);

      taggedProductElement.classList.remove(SLIDER_CLONED_CLASS);
      taggedProductElement.id = product.div;
      taggedProductElement.classList.add(SPONSORED_PRODUCT_CLASS);

      if (this.isSlider) {
        productsContainer = document.querySelector(
          getSliderContainerSelector(this.page) || '',
        ) as HTMLDivElement;

        this.deleteExistingProduct(product.id);
        productsContainer.prepend(taggedProductElement);
      } else {
        productsContainer.prepend(taggedProductElement);
      }

      product.renderAd();

      if (
        window.sponsoredProductHelper &&
        typeof window.sponsoredProductHelper === 'function'
      ) {
        window.sponsoredProductHelper(product.id, product.description);
      }
    }

    if (this.isSlider) {
      // we have to hide loader here to prevent
      // weird behavior of slider
      hideLoadingSpinner();

      const slickSliderElement = $(
        `${getSliderContainerSelector(this.page)}`,
      ).get(0) as unknown as TSlickSliderOptions;

      $(getSliderContainerSelector(this.page) || '').slick(
        slickSliderElement.slick.options,
      );
    }

    // We need to run this event after slider reinitialization
    for (const product of products) {
      if (
        (this.page === 'MAIN_PAGE' ||
          this.page === 'PRODUCT_DETAILS_PAGE' ||
          this.shouldOnlyRunAddToBasket) &&
        app_shop &&
        app_shop.fn &&
        app_shop.fn.addToBasketAjax
      ) {
        // On main page we need to set add to basket event
        // manually instead of using app_shop.runApp()
        app_shop.fn.addToBasketAjax(
          `.${PRODUCT_CLASS}[data-product_id="${product.id}"]`,
          `.${ADD_TO_BASKET_BTN_CLASS}`,
        );
      }
    }

    try {
      setTimeout(() => {
        // Some shops require that we do not run app_shop.runApp()
        // function a second time
        const shouldRunAppShopFn =
          // if product template contains .product-add-to-bsk class
          // we should not run app_shop.runApp() function
          // because actions are made by <a> tag with href php actions
          !this.templateHTML.includes('product-add-to-bsk') &&
          !this.shouldOnlyRunAddToBasket;

        // There were some issues when running this function on details page
        if (
          app_shop?.runApp &&
          this.page !== 'PRODUCT_DETAILS_PAGE' &&
          shouldRunAppShopFn
        ) {
          app_shop.runApp();
        }
      }, 0);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn(`${getMessage(APP_SHOP_RUN_APP)} - ${e.message}`);
      }
    }
  };
}

export default ProductManager;
