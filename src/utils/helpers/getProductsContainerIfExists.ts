import { PRODUCTS_CONTAINER_NOT_FOUND } from 'consts/messages';
import { BASKET_PAGE, PRODUCTS_LIST, PRODUCT_DETAILS_PAGE } from 'consts/pages';
import { PRODUCT_CONTAINERS } from 'consts/products';
import { TPages } from 'types/pages';
import getMessage from 'utils/formatters/getMessage';

const getProductsContainer = (page: TPages) => {
  if (page === PRODUCTS_LIST) {
    const pageListingSupportedZone =
      window.sponsoredProductConfig.productsListing.zone;

    return document.querySelector(
      PRODUCT_CONTAINERS[page][pageListingSupportedZone],
    );
  }

  if (page === PRODUCT_DETAILS_PAGE) {
    const pageDetailsSupportedZone =
      window.sponsoredProductConfig.pageDetails.zone;

    return document.querySelector(
      PRODUCT_CONTAINERS[page][pageDetailsSupportedZone],
    );
  }

  if (page === BASKET_PAGE) {
    const pageDetailsSupportedZone =
      window.sponsoredProductConfig.basketPage.zone;

    return document.querySelector(
      PRODUCT_CONTAINERS[page][pageDetailsSupportedZone],
    );
  }

  const mainPageSupportedZone = window.sponsoredProductConfig.mainPage.zone;

  return document.querySelector(
    PRODUCT_CONTAINERS[page][mainPageSupportedZone],
  );
};

const getProductsCountForPage = (page: TPages): number => {
  if (page === PRODUCTS_LIST) {
    return window.sponsoredProductConfig.productsListing.productsCount;
  }
  if (page === PRODUCT_DETAILS_PAGE) {
    return window.sponsoredProductConfig.pageDetails.productsCount;
  }
  if (page === BASKET_PAGE) {
    return window.sponsoredProductConfig.basketPage.productsCount;
  }
  return window.sponsoredProductConfig.mainPage.productsCount;
};

const getProductsContainerIfExists = (page: TPages): Element | null => {
  const productsContainer = getProductsContainer(page);

  const productsCount = getProductsCountForPage(page);
  if (!productsContainer && productsCount === 0) {
    return null;
  }

  if (!productsContainer) {
    console.warn(getMessage(PRODUCTS_CONTAINER_NOT_FOUND));
  }

  return productsContainer;
};

export default getProductsContainerIfExists;
