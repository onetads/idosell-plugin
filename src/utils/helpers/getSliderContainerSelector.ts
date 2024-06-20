import { MAIN_PAGE, PRODUCT_DETAILS_PAGE } from 'consts/pages';
import { PRODUCT_CONTAINERS } from 'consts/products';
import { TPages } from 'types/pages';

const getSliderContainerSelector = (page: TPages) => {
  if (page === PRODUCT_DETAILS_PAGE) {
    const pageDetailsSupportedZone =
      window.sponsoredProductConfig.pageDetails.zone;

    return PRODUCT_CONTAINERS[page][pageDetailsSupportedZone];
  }

  if (page === MAIN_PAGE) {
    const mainPageSupportedZone = window.sponsoredProductConfig.mainPage.zone;

    return PRODUCT_CONTAINERS[page][mainPageSupportedZone];
  }
};

export default getSliderContainerSelector;
