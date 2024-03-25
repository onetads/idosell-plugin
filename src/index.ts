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
