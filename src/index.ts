import { initAdManager } from 'managers/AdManager/AdManager.utils';
import { initProductManager } from 'managers/ProductManager/ProductManager.utils';
import getCurrentPageInfo from 'utils/helpers/getCurrentPageInfo';
import mapConfigPages from 'utils/helpers/mapConfigPages';
import waitForDynamicContent from 'utils/helpers/waitForDynamicContent';

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
