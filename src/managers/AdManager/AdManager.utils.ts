import { EMPTY_LIST_WARN } from 'consts/messages';
import {
  PRODUCT_ID_EXTRACTOR_KEYS,
  PRODUCT_ID_SELECTORS,
} from 'consts/products';
import { TPages } from 'types/pages';
import getMessage from 'utils/formatters/getMessage';
import AdManager from 'managers/AdManager/AdManager';
import getProductsContainer from 'utils/helpers/getProductsContainer';

const initAdManager = (page: TPages | null) => new AdManager(page);

const getProductsIds = (page: TPages) => {
  const { productsContainer, productIdSelector, productIdExtractorKey } = {
    productsContainer: getProductsContainer(page),
    productIdSelector: PRODUCT_ID_SELECTORS[page],
    productIdExtractorKey: PRODUCT_ID_EXTRACTOR_KEYS[page],
  };

  if (!productsContainer) return [];

  const productElements = Array.from(
    productsContainer.querySelectorAll(productIdSelector),
  );

  const productsIds = [];

  for (const productElement of productElements) {
    if (
      !(
        productElement instanceof HTMLElement &&
        productIdExtractorKey in productElement.dataset
      )
    )
      continue;

    const productId = productElement.dataset[productIdExtractorKey];
    if (!productId) continue;

    productsIds.push(+productId);
  }

  if (!productsIds.length) {
    console.warn(getMessage(EMPTY_LIST_WARN));
  }

  return productsIds;
};

export { initAdManager, getProductsIds };
