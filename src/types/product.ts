import { MAIN_PAGE, PRODUCTS_LIST, PRODUCT_DETAILS_PAGE } from 'consts/pages';
import { TMainPageZones, TPages, TProductDetailsZones } from 'types/pages';

enum EProductElements {
  ID = 'ID',
  IMG = 'IMG',
  PRODUCT_NAME = 'PRODUCT_NAME',
  PRODUCT_LINK = 'PRODUCT_LINK',
  PRICE = 'PRICE',
  CATEGORY = 'CATEGORY',
  PRODUCER = 'PRODUCER',
  PRODUCER_LINK = 'PRODUCER_LINK',
  AVAILABILITY = 'AVAILABILITY',
  DELIVERY = 'DELIVERY',
  DESCRIPTION = 'DESCRIPTION',
  STOCK_ID = 'STOCK_ID',
}

type TProductSelectors = Record<TPages, string>;

type TProductContainers = {
  [MAIN_PAGE]: Record<TMainPageZones, string>;
  [PRODUCT_DETAILS_PAGE]: Record<TProductDetailsZones, string>;
  [PRODUCTS_LIST]: string;
};

export { EProductElements, TProductSelectors, TProductContainers };
