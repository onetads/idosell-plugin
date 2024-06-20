import { EMPTY_LIST_WARN } from 'consts/messages';
import {} from 'consts/products';
import { TPages } from 'types/pages';
import getMessage from 'utils/formatters/getMessage';
import AdManager from 'managers/AdManager/AdManager';
import getProductsContainerIfExists from 'utils/helpers/getProductsContainerIfExists';
import { TAdProduct } from 'types/product';
import getProductsIdExtractorIfExists from 'utils/helpers/getProductsIdExtractor';
import getProductsIdSelectorIfExists from 'utils/helpers/getProductsIdSelector';

const initAdManager = (page: TPages | null) => new AdManager(page);

const getProductsIds = (page: TPages) => {
  const { productsContainer, productIdSelector, productIdExtractorKey } = {
    productsContainer: getProductsContainerIfExists(page),
    productIdSelector: getProductsIdSelectorIfExists(page),
    productIdExtractorKey: getProductsIdExtractorIfExists(page),
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
  return products.map((product) => product.offerId);
};

export { initAdManager, getProductsIds, extractProductsIds };
