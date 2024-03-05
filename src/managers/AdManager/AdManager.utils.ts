import { EMPTY_LIST_WARN } from 'consts/messages';
import { PRODUCTS_LIST, PRODUCT_DETAILS_PAGE } from 'consts/pages';
import {
  DATA_PRODUCT_SELECTOR,
  PRODUCT_CONTAINERS,
  PRODUCT_ID_KEY,
} from 'consts/products';
import AdManager from 'managers/AdManager/AdManager';
import { TPages } from 'types/pages';
import getMessage from 'utils/formatters/getMessage';

const initAdManager = (page: TPages | null) => new AdManager(page);

const getCurrentProductContainer = (page: TPages) => {
  if (page === PRODUCTS_LIST) {
    return document.querySelector(PRODUCT_CONTAINERS[page]);
  }

  if (page === PRODUCT_DETAILS_PAGE) {
    const pageDetailsSupportedZone =
      window.sponsoredProductConfig.pageDetails.zone;

    return document.querySelector(
      PRODUCT_CONTAINERS[page][pageDetailsSupportedZone],
    );
  }

  const mainPageSupportedZone = window.sponsoredProductConfig.mainPage.zone;

  return document.querySelector(
    PRODUCT_CONTAINERS[page][mainPageSupportedZone],
  );
};

const getProductsIds = (page: TPages) => {
  const productsContainer = getCurrentProductContainer(page);

  if (!productsContainer) return [];

  const productElements = Array.from(
    productsContainer.querySelectorAll(DATA_PRODUCT_SELECTOR),
  );

  const productsIds = [];

  for (const productElement of productElements) {
    if (
      !(
        productElement instanceof HTMLElement &&
        PRODUCT_ID_KEY in productElement.dataset
      )
    )
      continue;

    const productId = productElement.dataset[PRODUCT_ID_KEY];
    if (!productId) continue;

    productsIds.push(+productId);
  }

  if (!productsIds.length) {
    console.warn(getMessage(EMPTY_LIST_WARN));
  }

  return productsIds;
};

export { initAdManager, getProductsIds };
