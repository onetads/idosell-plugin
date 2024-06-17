import { DYNAMIC_CONTENT_CHECK_DELAY } from 'consts/common';
import { TPages } from 'types/pages';
import getProductsContainerIfExists from 'utils/helpers/getProductsContainerIfExists';

const waitForDynamicContent = async (page: TPages) =>
  await new Promise<void>((resolve, reject) => {
    const intervalId = setInterval(() => {
      try {
        const currentProductsContainer = getProductsContainerIfExists(page);
        const parentProductsContainer = currentProductsContainer.parentElement!;
        const grandParentProductsContainer =
          currentProductsContainer.parentElement!.parentElement!;

        // For #products_zone1 ajaxload is always true
        if (
          currentProductsContainer.id === 'products_zone1' ||
          parentProductsContainer.id === 'products_zone1'
        ) {
          clearInterval(intervalId);
          resolve();
        }

        if (
          grandParentProductsContainer.dataset.ajaxload !== 'true' &&
          parentProductsContainer.dataset.ajaxload !== 'true'
        ) {
          clearInterval(intervalId);
          resolve();
        }
      } catch (error) {
        if (error instanceof Error) {
          reject(new Error(error.message));
        }
      }
    }, DYNAMIC_CONTENT_CHECK_DELAY);
  });

export default waitForDynamicContent;
