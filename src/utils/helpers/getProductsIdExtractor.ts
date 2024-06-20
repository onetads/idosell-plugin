import { PRODUCTS_ID_EXTRACTOR_NOT_FOUND } from 'consts/messages';
import { BASKET_PAGE, PRODUCTS_LIST, PRODUCT_DETAILS_PAGE } from 'consts/pages';
import { PRODUCT_ID_EXTRACTOR_KEYS } from 'consts/products';
import { TPages } from 'types/pages';
import getMessage from 'utils/formatters/getMessage';

const getProductsIdExtractor = (page: TPages) => {
  if (page === PRODUCTS_LIST) {
    const pageListingSupportedZone =
      window.sponsoredProductConfig.productsListing.zone;

    return PRODUCT_ID_EXTRACTOR_KEYS[page][pageListingSupportedZone];
  }

  if (page === PRODUCT_DETAILS_PAGE) {
    const pageDetailsSupportedZone =
      window.sponsoredProductConfig.pageDetails.zone;

    return PRODUCT_ID_EXTRACTOR_KEYS[page][pageDetailsSupportedZone];
  }

  if (page === BASKET_PAGE) {
    const pageDetailsSupportedZone =
      window.sponsoredProductConfig.basketPage.zone;

    return PRODUCT_ID_EXTRACTOR_KEYS[page][pageDetailsSupportedZone];
  }

  const mainPageSupportedZone = window.sponsoredProductConfig.mainPage.zone;

  return PRODUCT_ID_EXTRACTOR_KEYS[page][mainPageSupportedZone];
};

const getProductsIdExtractorIfExists = (page: TPages) => {
  const productsIdExtractor = getProductsIdExtractor(page);

  if (!productsIdExtractor) {
    throw new Error(getMessage(PRODUCTS_ID_EXTRACTOR_NOT_FOUND));
  }

  return productsIdExtractor;
};

export default getProductsIdExtractorIfExists;
