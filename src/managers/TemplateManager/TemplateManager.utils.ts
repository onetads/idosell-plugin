import { PRODUCT_DISABLE_KEY, PRODUCT_UNAVAILABLE, PRODUCT_OMNIBUS_PRICE } from 'consts/products';
import { TEMPLATES_MAP } from 'consts/templates';
import { TPages } from 'types/pages';
import { ETemplates } from 'types/templates';
import mapConfigPages from 'utils/helpers/mapConfigPages';

const checkIsProductAvailable = (product: HTMLElement) => {
  const dataSet = product.dataset;

  const productUnavailable = product.querySelector(`.${PRODUCT_UNAVAILABLE}`);

  if (productUnavailable) {
    return false;
  }

  return !(
    PRODUCT_DISABLE_KEY in dataSet && dataSet[PRODUCT_DISABLE_KEY] === 'true'
  );
};

const checkIfProductHasDiscount = (product: HTMLElement) => {
  const productDiscounted= product.querySelector(`.${PRODUCT_OMNIBUS_PRICE}`);

  if (productDiscounted) {
    return true;
  }
};

const getMappedTemplate = (page: TPages): ETemplates => {
  const currentPageConfig = window.sponsoredProductConfig[mapConfigPages(page)];
  return TEMPLATES_MAP[currentPageConfig.zone];
};

const shouldOnlyRunAddToBasket = (): boolean =>
    window.sponsoredProductConfig.execution?.onlyAddToBasket === true;

export { checkIsProductAvailable, checkIfProductHasDiscount, getMappedTemplate, shouldOnlyRunAddToBasket };
