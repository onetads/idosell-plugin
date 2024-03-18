import {
  MAIN_PAGE_HOTSPOT_FOUR,
  MAIN_PAGE_HOTSPOT_ONE,
  MAIN_PAGE_HOTSPOT_THREE,
  MAIN_PAGE_HOTSPOT_TWO,
  PRODUCT_DETAILS_ASSOCIATED_ONE,
  PRODUCT_DETAILS_ASSOCIATED_TWO,
  PRODUCT_LISTING,
  PRODUCT_LISTING_HOTSPOT,
} from 'consts/pages';
import { initAdManager } from 'managers/AdManager/AdManager.utils';
import { initProductManager } from 'managers/ProductManager/ProductManager.utils';
import getCurrentPageInfo from 'utils/helpers/getCurrentPageInfo';
import mapConfigPages from 'utils/helpers/mapConfigPages';
import waitForDynamicContent from 'utils/helpers/waitForDynamicContent';

window.sponsoredProductConfig = {
  isLoaderVisible: true,
  tagLabel: 'SPONSOROWANY',

  productsListing: {
    zone: PRODUCT_LISTING_HOTSPOT,
    isEnabled: true,
    productsCount: 2,
  },
  pageDetails: {
    isEnabled: true,
    zone: PRODUCT_DETAILS_ASSOCIATED_TWO,
    productsCount: 2,
  },
  mainPage: {
    isEnabled: false,
    zone: MAIN_PAGE_HOTSPOT_ONE,
    productsCount: 5,
  },
};

const runApp = async () => {
  try {
    const page = getCurrentPageInfo();

    if (!page) return;

    const configPage = window.sponsoredProductConfig[mapConfigPages(page)];

    if (typeof configPage === 'object' && !configPage.isEnabled) return;

    await waitForDynamicContent(page);

    const AdManager = initAdManager(page);
    const products = await AdManager.getPromotedProducts();

    const productManager = initProductManager(page);
    productManager.injectProduct(products);
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

