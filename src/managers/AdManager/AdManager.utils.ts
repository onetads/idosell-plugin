import { EMPTY_LIST_WARN } from 'consts/messages';
import {
  PRODUCT_ID_EXTRACTOR_KEYS,
  PRODUCT_ID_SELECTORS,
} from 'consts/products';
import { TPages } from 'types/pages';
import getMessage from 'utils/formatters/getMessage';
import AdManager from 'managers/AdManager/AdManager';
import getProductsContainer from 'utils/helpers/getProductsContainer';
import { TAdProduct } from 'types/product';
import { GET_PRODUCTS_DATA_QUERY, PRODUCTS_IDS_KEY } from 'consts/queries';

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

const extractProductsIds = (products: TAdProduct[]) => {
  return [
    ...new Set(products.map((product) => product.offerId.match(/\d+/)![0])),
  ];
};

const prepareProductsQuery = (products: TAdProduct[]) => {
  return GET_PRODUCTS_DATA_QUERY.replace(
    PRODUCTS_IDS_KEY,
    extractProductsIds(products).join(','),
  );
};

export { initAdManager, getProductsIds, prepareProductsQuery };
