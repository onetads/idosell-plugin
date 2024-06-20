import { BASIC_TAG } from 'consts/common';
import {
  COULDNT_SAVE_TEMPLATE,
  EMPTY_PRODUCTS_ID_LIST,
  SELECTOR_NOT_FOUND,
} from 'consts/messages';
import {
  CONTAINER_SELECTORS_TO_DELETE,
  PRODUCT_CLASS,
  PRODUCT_SELECTOR,
  SLIDER_CLASS_ONE,
  SLIDER_CLASS_TWO,
} from 'consts/products';
import { REPLACE_CONTENT_MAP } from 'consts/replaceMap';
import { CONTENT, PRODUCT_IMAGE_URL_KEY } from 'consts/replaceMap/keys';
import { NOT_VALID_TEMPLATE } from 'consts/templates';
import {
  checkIsProductAvailable,
  getMappedTemplate,
} from 'managers/TemplateManager/TemplateManager.utils';
import { TPages } from 'types/pages';
import { EProductElements } from 'types/product';
import { ETemplates } from 'types/templates';
import getMessage from 'utils/formatters/getMessage';
import getProductsContainerIfExists from 'utils/helpers/getProductsContainerIfExists';

class TemplateManager {
  protected page: TPages;
  protected currentTemplate: ETemplates;
  protected productsContainer: Element;
  protected isSlider: boolean;

  private templates = Object.keys(ETemplates).reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal]: sessionStorage.getItem(currVal),
    }),
    {},
  ) as Record<ETemplates, string>;

  constructor(page: TPages) {
    this.page = page;
    this.currentTemplate = getMappedTemplate(page);

    this.productsContainer = getProductsContainerIfExists(page);
    this.isSlider =
      this.productsContainer.classList.contains(SLIDER_CLASS_ONE) ||
      this.productsContainer.classList.contains(SLIDER_CLASS_TWO);

    this.checkDOMforTemplates();
  }

  private checkDOMforTemplates = () => {
    const products = Array.from(
      this.productsContainer.querySelectorAll(PRODUCT_SELECTOR),
    );

    if (!products.length) {
      throw new Error(getMessage(EMPTY_PRODUCTS_ID_LIST));
    }

    for (const product of products) {
      const currentTemplate = this.templates[getMappedTemplate(this.page)];
      if (currentTemplate === NOT_VALID_TEMPLATE) break;

      if (!(product instanceof HTMLElement)) continue;

      const elementClassList = product.classList;
      const isProductAvailable =
        elementClassList.contains(PRODUCT_CLASS) &&
        checkIsProductAvailable(product);

      if (!isProductAvailable) return;

      this.saveTemplateInSessionStorage(product);
    }
  };

  protected getCurrentTemplateHTML = () => {
    const currentTemplate = this.templates[this.currentTemplate];

    if (currentTemplate === NOT_VALID_TEMPLATE) {
      throw new Error(NOT_VALID_TEMPLATE);
    }

    return currentTemplate;
  };
  private saveTemplateInSessionStorage = (productElement: HTMLElement) => {
    if (!this.currentTemplate) {
      throw new Error(getMessage(COULDNT_SAVE_TEMPLATE));
    }

    const preparedTemplate = this.prepareTemplate(
      productElement,
      this.currentTemplate,
    );

    if (!preparedTemplate) return;

    this.templates = {
      ...this.templates,
      [this.currentTemplate]: preparedTemplate,
    };

    sessionStorage.setItem(this.currentTemplate, preparedTemplate);
  };

  private prepareTemplate = (
    productElement: HTMLElement,
    template: ETemplates,
  ) => {
    const copiedProductElement = document.createElement(BASIC_TAG);
    copiedProductElement.innerHTML = productElement.outerHTML;

    const replaceMap = REPLACE_CONTENT_MAP[template];
    let canInjectTemplate = true;

    for (const property in replaceMap) {
      if (!canInjectTemplate) break;

      const { key, map } = replaceMap[property as EProductElements];

      map.forEach(({ selector, replace, canBeNull, prepareValue }) => {
        if (!canInjectTemplate) return;

        const selectedElements =
          copiedProductElement.querySelectorAll(selector);

        if (!selectedElements.length && !canBeNull) {
          canInjectTemplate = false;
          console.warn(getMessage(SELECTOR_NOT_FOUND) + selector);
          return;
        }

        selectedElements.forEach((element) => {
          replace.forEach((item) => {
            if (item === CONTENT) {
              const newValue = prepareValue ? prepareValue(element) : key;

              element.innerHTML = newValue;
              return;
            }

            if (
              key === PRODUCT_IMAGE_URL_KEY &&
              element instanceof HTMLImageElement
            )
              element.loading = 'lazy';

            const newValue = prepareValue ? prepareValue(element) : key;

            element.setAttribute(item, newValue);
          });
        });
      });
    }

    CONTAINER_SELECTORS_TO_DELETE.forEach((className) => {
      const element = copiedProductElement.querySelector(className);
      if (!element) return;

      element.remove();
    });

    if (!canInjectTemplate) return NOT_VALID_TEMPLATE;

    return copiedProductElement.innerHTML;
  };
}

export default TemplateManager;
