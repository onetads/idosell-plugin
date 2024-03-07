import { PRODUCTS_LIST, PRODUCT_DETAILS_PAGE } from 'consts/pages';
import { PRODUCT_CONTAINERS } from 'consts/products';
import { TPages } from 'types/pages';

const getProductsContainer = (page: TPages) => {
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

export default getProductsContainer;
