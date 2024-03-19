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

const getProductsContainerIfExists = (page: TPages) => {
  const productsContainer = getProductsContainer(page);

  if (!productsContainer) {
    throw new Error(getMessage(PRODUCTS_CONTAINER_NOT_FOUND));
  }

  return productsContainer;
};

export default getProductsContainerIfExists;
