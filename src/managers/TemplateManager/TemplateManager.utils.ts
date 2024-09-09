import { PRODUCT_DISABLE_KEY } from 'consts/products';
import { TEMPLATES_MAP } from 'consts/templates';
import { TPages } from 'types/pages';
import { ETemplates } from 'types/templates';
import mapConfigPages from 'utils/helpers/mapConfigPages';

const checkIsProductAvailable = (product: HTMLElement) => {
  const dataSet = product.dataset;

  return !(
    PRODUCT_DISABLE_KEY in dataSet && dataSet[PRODUCT_DISABLE_KEY] === 'true'
  );
};

const getMappedTemplate = (page: TPages): ETemplates => {
  const currentPageConfig = window.sponsoredProductConfig[mapConfigPages(page)];
  return TEMPLATES_MAP[currentPageConfig.zone];
};

const shouldOnlyRunAddToBasket = (): boolean =>
    window.sponsoredProductConfig.execution?.onlyAddToBasked === true;

export { checkIsProductAvailable, getMappedTemplate, shouldOnlyRunAddToBasket };
