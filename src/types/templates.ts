import { TMainPageZones, TPages, TProductDetailsZones } from 'types/pages';
import { EProductElements } from 'types/product';

enum ETemplates {
  PRODUCTS_LISTING = 'GRID_VIEW',
  ASSOCIATED_PRODUCTS_LISTING_ONE = 'ASSOCIATED_PRODUCTS_LISTING_ONE',
  ASSOCIATED_PRODUCTS_LISTING_TWO = 'ASSOCIATED_PRODUCTS_LISTING_TWO',
}

type TContentMap = {
  selector: string;
  replace: string[];
  canBeNull?: boolean;
  prepareValue?: (item: Element) => string;
};

type TContentMapItem = {
  key: EProductElements;
  map: TContentMap[];
};

type TReplaceContentMap = Record<
  TPages,
  | TContentMapItem[]
  | Record<TMainPageZones, TContentMapItem[]>
  | Record<TProductDetailsZones, TContentMapItem[]>
>;

export { ETemplates };
export { TReplaceContentMap };
