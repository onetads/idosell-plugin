import { EMPTY_PRODUCTS_ARRAY } from 'consts/messages';
import { initAdManager } from 'managers/AdManager/AdManager.utils';
import { initProductManager } from 'managers/ProductManager/ProductManager.utils';
import getMessage from 'utils/formatters/getMessage';
import getCurrentPageInfo from 'utils/helpers/getCurrentPageInfo';
import {
  hideLoadingSpinner,
  showLoadingSpinner,
} from 'utils/helpers/loadingSpinner';
import mapConfigPages from 'utils/helpers/mapConfigPages';
import waitForDlApi from 'utils/helpers/waitForDlApi';
import waitForDynamicContent from 'utils/helpers/waitForDynamicContent';

window.sponsoredProductConfig = window.sponsoredProductConfig || {
  tagLabel: 'PROMOWANE',
  isLoaderVisible: true,

  productsListing: {
    zone: 'PRODUCT_LISTING',
    isEnabled: true,
    productsCount: 1,
  },
  pageDetails: {
    isEnabled: true,
    zone: 'PRODUCT_DETAILS_ASSOCIATED_ONE',
    productsCount: 1,
  },
  mainPage: {
    isEnabled: true,
    zone: 'MAIN_PAGE_HOTSPOT_FOUR',
    productsCount: 1,
  },
  basketPage: {
    isEnabled: true,
    zone: 'BASKET_PAGE_HOTSPOT',
    productsCount: 1,
  },
};

if (window.sponsoredProductConfig.isLoaderVisible) {
  showLoadingSpinner();
}

const runApp = async () => {
  try {
    const page = getCurrentPageInfo();

    if (!page) return;

    const configPage = window.sponsoredProductConfig[mapConfigPages(page)];

    if (typeof configPage === 'object' && !configPage.isEnabled) return;

    await waitForDynamicContent(page);
    await waitForDlApi();

    const AdManager = initAdManager(page);
    const products = await AdManager.getPromotedProducts(
      configPage.productsCount,
    );

    if (products.length === 0) {
      throw new Error(getMessage(EMPTY_PRODUCTS_ARRAY));
    }

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
  document.addEventListener('DOMContentLoaded', async () => {
    runApp();
  });
}
