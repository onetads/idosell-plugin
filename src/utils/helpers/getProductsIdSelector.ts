import { PRODUCTS_ID_SELECTOR_NOT_FOUND } from 'consts/messages';
import { BASKET_PAGE, PRODUCTS_LIST, PRODUCT_DETAILS_PAGE } from 'consts/pages';
import { PRODUCT_ID_SELECTORS } from 'consts/products';
import { TPages } from 'types/pages';
import getMessage from 'utils/formatters/getMessage';

const getProductsIdSelector = (page: TPages) => {
  if (page === PRODUCTS_LIST) {
    const pageListingSupportedZone =
      window.sponsoredProductConfig.productsListing.zone;

    return PRODUCT_ID_SELECTORS[page][pageListingSupportedZone];
  }

  if (page === PRODUCT_DETAILS_PAGE) {
    const pageDetailsSupportedZone =
      window.sponsoredProductConfig.pageDetails.zone;

    return PRODUCT_ID_SELECTORS[page][pageDetailsSupportedZone];
  }

  if (page === BASKET_PAGE) {
    const pageDetailsSupportedZone =
      window.sponsoredProductConfig.basketPage.zone;

    return PRODUCT_ID_SELECTORS[page][pageDetailsSupportedZone];
  }

  const mainPageSupportedZone = window.sponsoredProductConfig.mainPage.zone;

  return PRODUCT_ID_SELECTORS[page][mainPageSupportedZone];
};

const getProductsIdSelectorIfExists = (page: TPages) => {
  const productsIdSelector = getProductsIdSelector(page);

  if (!productsIdSelector) {
    throw new Error(getMessage(PRODUCTS_ID_SELECTOR_NOT_FOUND));
  }

  return productsIdSelector;
};

export default getProductsIdSelectorIfExists;
