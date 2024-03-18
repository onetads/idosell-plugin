import { MAIN_PAGE, PRODUCTS_LIST, PRODUCT_DETAILS_PAGE } from 'consts/pages';
import { TSponsoredProductConfig } from 'types/config';
import { TPages } from 'types/pages';

const mapConfigPages = (page: TPages) =>
  ({
    [PRODUCTS_LIST]: 'productsListing',
    [MAIN_PAGE]: 'mainPage',
    [PRODUCT_DETAILS_PAGE]: 'pageDetails',
  })[page] as keyof Omit<
    TSponsoredProductConfig,
    'isLoaderVisible' | 'tagLabel'
  >;

export default mapConfigPages;
