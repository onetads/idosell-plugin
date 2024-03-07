import { BASIC_TAG } from 'consts/common';
import {
  COULDNT_SAVE_TEMPLATE,
  PRODUCTS_CONTAINER_NOT_FOUND,
  SELECTOR_NOT_FOUND,
} from 'consts/messages';
import {
  CONTAINER_SELECTORS_TO_DELETE,
  PRODUCT_CLASS,
  PRODUCT_SELECTOR,
} from 'consts/products';
import { REPLACE_CONTENT_MAP } from 'consts/replaceMap';
import { CONTENT, PRODUCT_IMAGE_URL_KEY } from 'consts/replaceMap/keys';
import { NOT_VALID_TEMPLATE } from 'consts/templates';
// import { NOT_VALID_TEMPLATE } from 'consts/templates';
import {
  checkIsProductAvailable,
  getMappedTemplate,
} from 'managers/TemplateManager/TemplateManager.utils';
import { TPages } from 'types/pages';
import { EProductElements } from 'types/product';
import { ETemplates } from 'types/templates';
import getMessage from 'utils/formatters/getMessage';
import getProductsContainer from 'utils/helpers/getProductsContainer';

class TemplateManager {
  constructor(page: TPages) {
    this.page = page;
    this.currentTemplate = getMappedTemplate(page);
    this.checkDOMforTemplates();
  }

  private currentTemplate: ETemplates;
  private page: TPages;
  private templates = Object.keys(ETemplates).reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal]: sessionStorage.getItem(currVal),
    }),
    {},
  ) as Record<ETemplates, string | null>;

  public checkDOMforTemplates = () => {
    const productsContainer = getProductsContainer(this.page);

    if (!productsContainer) {
      throw new Error(getMessage(PRODUCTS_CONTAINER_NOT_FOUND));
    }

    const products = Array.from(
      productsContainer.querySelectorAll(PRODUCT_SELECTOR),
    );

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
              element.innerHTML = key;
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

    return copiedProductElement.outerHTML;
  };
}

export default TemplateManager;
