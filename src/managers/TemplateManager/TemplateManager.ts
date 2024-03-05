import { BASIC_TAG } from 'consts/common';
import { PRODUCTS_CONTAINER_NOT_FOUND } from 'consts/messages';
import {
  PRODUCT_CLASS,
  PRODUCT_CONTAINERS,
  PRODUCT_SELECTORS,
} from 'consts/products';
import { REPLACE_CONTENT_MAP } from 'consts/replaceMap';
import { TEMPLATES_MAP } from 'consts/templates';
import { checkIsProductAvailable } from 'managers/TemplateManager/TemplateManager.utils';
import { TPages } from 'types/pages';
import { ETemplates } from 'types/templates';
import getMessage from 'utils/formatters/getMessage';

class TemplateManager {
  constructor(page: TPages) {
    if (!page) return;
    this.page = page;
  }

  private page: TPages;
  private templates = Object.keys(ETemplates).reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal]: sessionStorage.getItem(currVal),
    }),
    {},
  ) as Record<ETemplates, string | null>;

  public checkDOMforTemplates = () => {
    if (!this.page) return;

    const productsContainer = document.querySelector(
      PRODUCT_CONTAINERS[this.page],
    );

    if (!productsContainer) {
      throw new Error(getMessage(PRODUCTS_CONTAINER_NOT_FOUND));
    }

    const products = Array.from(
      productsContainer.querySelectorAll(PRODUCT_SELECTORS[this.page]),
    );

    for (const product of products) {
      //   const currentTemplate = this.getTemplate(
      //     this.getMappedTemplate({ page: this.page }),
      //   );

      //   if (currentTemplate === NOT_VALID_TEMPLATE) break;

      if (!(product instanceof HTMLElement)) continue;

      const elementClassList = product.classList;
      const isProductAvailable =
        elementClassList.contains(PRODUCT_CLASS) &&
        checkIsProductAvailable(product);

      if (!isProductAvailable) return;

      this.saveTemplate(product);
    }
  };

  private saveTemplate = (productElement: HTMLElement) => {
    const mappedTemplate = TEMPLATES_MAP[this.page];

    console.log('mappedTemplate: ', mappedTemplate);

    this.saveTemplateInSessionStorage(productElement, mappedTemplate);
  };

  private saveTemplateInSessionStorage = (
    productElement: HTMLElement,
    mappedTemplate: ETemplates,
  ) => {
    const preparedTemplate = this.prepareTemplate(productElement);

    if (!preparedTemplate) return;

    this.templates = { ...this.templates, [mappedTemplate]: preparedTemplate };
    sessionStorage.setItem(mappedTemplate, preparedTemplate);
  };

  private prepareTemplate = (productElement: HTMLElement) => {
    const copiedProductElement = document.createElement(BASIC_TAG);
    copiedProductElement.innerHTML = productElement.outerHTML;

    const replaceMap = REPLACE_CONTENT_MAP[this.page];
    // const canInjectTemplate = true;

    console.log('mapa: ', replaceMap);

    return 'tesa';

    // for (const { } in replaceMap)

    // for (const property in REPLACE_CONTENT_MAP) {
    //   if (!canInjectTemplate) break;

    //   const { key, map } = REPLACE_CONTENT_MAP[property as EProductElements];

    //   const contentMap = [];

    //   if (this.page === PRODUCT_PAGE) {
    //     contentMap.push(...map.relatedView);
    //   } else {
    //     if (this.viewType === EViews.GRID_VIEW) {
    //       contentMap.push(...map.gridView);
    //     }

    //     if (this.viewType === EViews.LIST_VIEW) {
    //       contentMap.push(...map.listView);
    //     }
    //   }

    //   contentMap.forEach(({ selector, replace, canBeNull, prepareValue }) => {
    //     if (!canInjectTemplate) return;

    //     const selectedElements =
    //       copiedProductElement.querySelectorAll(selector);

    //     if (!selectedElements.length && !canBeNull) {
    //       canInjectTemplate = false;
    //       console.warn(getMessage(SELECTOR_NOT_FOUND) + selector);
    //       return;
    //     }

    //     selectedElements.forEach((element) => {
    //       replace.forEach((item) => {
    //         if (item === CONTENT) {
    //           element.innerHTML = key;
    //           return;
    //         }

    //         if (item === BASKET_ID) {
    //           const actionContent = element.getAttribute('action');

    //           if (!actionContent) return;

    //           const findNumberRegex = /\d+/;

    //           element.setAttribute(
    //             'action',
    //             actionContent.replace(findNumberRegex, key),
    //           );
    //           return;
    //         }

    //         if (
    //           key === PRODUCT_IMAGE_URL_KEY &&
    //           element instanceof HTMLImageElement
    //         )
    //           element.loading = 'lazy';

    //         const newValue = prepareValue ? prepareValue(element) : key;

    //         element.setAttribute(item, newValue);
    //       });
    //     });
    //   });
  };
}

export default TemplateManager;
