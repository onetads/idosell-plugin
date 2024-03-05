import { PRODUCT_DISABLE_KEY } from 'consts/products';
import TemplateManager from 'managers/TemplateManager/TemplateManager';
import { TPages } from 'types/pages';

const initTemplateManager = (page: TPages) => new TemplateManager(page);

const checkIsProductAvailable = (product: HTMLElement) => {
  const dataSet = product.dataset;

  return !(
    PRODUCT_DISABLE_KEY in dataSet && dataSet[PRODUCT_DISABLE_KEY] === 'true'
  );
};

export { initTemplateManager, checkIsProductAvailable };
