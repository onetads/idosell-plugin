import {
  BASKET_PAGE,
  MAIN_PAGE,
  PRODUCTS_LIST,
  PRODUCT_DETAILS_PAGE,
} from 'consts/pages';
import { TSponsoredProductConfig } from 'types/config';
import { TPages } from 'types/pages';

const mapConfigPages = (page: TPages) =>
  ({
    [PRODUCTS_LIST]: 'productsListing',
    [MAIN_PAGE]: 'mainPage',
    [PRODUCT_DETAILS_PAGE]: 'pageDetails',
    [BASKET_PAGE]: 'basketPage',
  })[page] as keyof Omit<
    TSponsoredProductConfig,
    'tagLabel' | 'isLoaderVisible' | 'isListViewEnabled' | 'execution'
  >;

export default mapConfigPages;
