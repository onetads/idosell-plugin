import { EProductElements } from 'types/product';

enum ETemplates {
  PRODUCTS_LISTING = 'PRODUCTS_LISTING',

  PRODUCT_DETAILS_ASSOCIATED_ONE = 'PRODUCT_DETAILS_ASSOCIATED_ONE',
  PRODUCT_DETAILS_ASSOCIATED_TWO = 'PRODUCT_DETAILS_ASSOCIATED_TWO',

  MAIN_PAGE_HOTSPOT_ONE = 'MAIN_PAGE_HOTSPOT_ONE',
  MAIN_PAGE_HOTSPOT_TWO = 'MAIN_PAGE_HOTSPOT_TWO',
  MAIN_PAGE_HOTSPOT_THREE = 'MAIN_PAGE_HOTSPOT_THREE',
}

type TContentMap = {
  selector: string;
  replace: string[];
  canBeNull?: boolean;
  prepareValue?: (item: Element) => string;
};

type TContentMapItem = {
  key: string;
  map: TContentMap[];
};

type TReplaceContentMap = Record<
  ETemplates,
  Record<EProductElements, TContentMapItem>
>;

export { ETemplates };
export { TReplaceContentMap, TContentMapItem };
