import {
  BASKET_PAGE_HOTSPOT,
  MAIN_PAGE_HOTSPOT_FOUR,
  MAIN_PAGE_HOTSPOT_ONE,
  MAIN_PAGE_HOTSPOT_THREE,
  MAIN_PAGE_HOTSPOT_TWO,
  PRODUCT_DETAILS_ASSOCIATED_ONE,
  PRODUCT_DETAILS_ASSOCIATED_THREE,
  PRODUCT_DETAILS_ASSOCIATED_TWO,
  PRODUCT_LISTING,
  PRODUCT_LISTING_HOTSPOT,
} from 'consts/pages';
import { initAdManager } from 'managers/AdManager/AdManager.utils';
import { initProductManager } from 'managers/ProductManager/ProductManager.utils';
import getCurrentPageInfo from 'utils/helpers/getCurrentPageInfo';
import {
  hideLoadingSpinner,
  showLoadingSpinner,
} from 'utils/helpers/loadingSpinner';
import mapConfigPages from 'utils/helpers/mapConfigPages';
import waitForDlApi from 'utils/helpers/waitForDlApi';
import waitForDynamicContent from 'utils/helpers/waitForDynamicContent';

window.sponsoredProductConfig = {
  tagLabel: 'SPONSOROWANY',

  productsListing: {
    zone: PRODUCT_LISTING_HOTSPOT,
    isEnabled: true,
    productsCount: 6,
  },
  pageDetails: {
    isEnabled: true,
    zone: PRODUCT_DETAILS_ASSOCIATED_THREE,
    productsCount: 6,
  },
  mainPage: {
    isEnabled: true,
    zone: MAIN_PAGE_HOTSPOT_FOUR,
    productsCount: 6,
  },
  basketPage: {
    isEnabled: true,
    zone: BASKET_PAGE_HOTSPOT,
    productsCount: 6,
  },
};

showLoadingSpinner();

const runApp = async () => {
  try {
    const page = getCurrentPageInfo();

    if (!page) return;

    const configPage = window.sponsoredProductConfig[mapConfigPages(page)];

    if (typeof configPage === 'object' && !configPage.isEnabled) return;

    await waitForDynamicContent(page);
    await waitForDlApi();

    const AdManager = initAdManager(page);
    const products = await AdManager.getPromotedProducts();

    const ProductManager = initProductManager(page);

    ProductManager.injectProduct(products);

    hideLoadingSpinner();
  } catch (e) {
    if (e instanceof Error) {
      hideLoadingSpinner();
      console.error(e.message);
    }
  }
};

if (document.readyState !== 'loading') {
  runApp();
} else {
  window.addEventListener('DOMContentLoaded', async () => {
    runApp();
  });
}
