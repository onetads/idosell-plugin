import { EProductElements } from 'types/product';

enum ETemplates {
  PRODUCT_LISTING = 'PRODUCT_LISTING',
  PRODUCT_LISTING_HOTSPOT = 'PRODUCT_LISTING_HOTSPOT',

  PRODUCT_DETAILS_ASSOCIATED_ONE = 'PRODUCT_DETAILS_ASSOCIATED_ONE',
  PRODUCT_DETAILS_ASSOCIATED_TWO = 'PRODUCT_DETAILS_ASSOCIATED_TWO',

  MAIN_PAGE_HOTSPOT_ONE = 'MAIN_PAGE_HOTSPOT_ONE',
  MAIN_PAGE_HOTSPOT_TWO = 'MAIN_PAGE_HOTSPOT_TWO',
  MAIN_PAGE_HOTSPOT_THREE = 'MAIN_PAGE_HOTSPOT_THREE',
  MAIN_PAGE_HOTSPOT_FOUR = 'MAIN_PAGE_HOTSPOT_FOUR',
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
