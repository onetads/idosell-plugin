import {
  BASKET_PAGE_HOTSPOT,
  MAIN_PAGE_HOTSPOT_ONE,
  PRODUCT_DETAILS_ASSOCIATED_TWO,
  PRODUCT_LISTING,
} from 'consts/pages';
import { initAdManager } from 'managers/AdManager/AdManager.utils';
import { initProductManager } from 'managers/ProductManager/ProductManager.utils';
import getCurrentPageInfo from 'utils/helpers/getCurrentPageInfo';
import { showLoadingSpinner } from 'utils/helpers/loadingSpinner';
import mapConfigPages from 'utils/helpers/mapConfigPages';
import waitForDynamicContent from 'utils/helpers/waitForDynamicContent';

window.sponsoredProductConfig = {
  tagLabel: 'SPONSOROWANY',

  productsListing: {
    zone: PRODUCT_LISTING,
    isEnabled: true,
    productsCount: 2,
  },
  pageDetails: {
    isEnabled: true,
    zone: PRODUCT_DETAILS_ASSOCIATED_TWO,
    productsCount: 2,
  },
  mainPage: {
    isEnabled: true,
    zone: MAIN_PAGE_HOTSPOT_ONE,
    productsCount: 5,
  },
  basketPage: {
    isEnabled: true,
    zone: BASKET_PAGE_HOTSPOT,
    productsCount: 5,
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

    const AdManager = initAdManager(page);
    const products = await AdManager.getPromotedProducts();

    const ProductManager = initProductManager(page);
    ProductManager.injectProduct(products);
  } catch (e) {
    if (e instanceof Error) {
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
