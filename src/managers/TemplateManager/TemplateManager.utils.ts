import { MAIN_PAGE, PRODUCTS_LIST, PRODUCT_DETAILS_PAGE } from 'consts/pages';
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

  if (
    (page === PRODUCT_DETAILS_PAGE || page === MAIN_PAGE) &&
    'zone' in currentPageConfig
  ) {
    return TEMPLATES_MAP[currentPageConfig.zone];
  }

  return TEMPLATES_MAP[PRODUCTS_LIST];
};

export { checkIsProductAvailable, getMappedTemplate };
