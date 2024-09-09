import {
  TBasketPageZones,
  TListingPageZones,
  TMainPageZones,
  TProductDetailsZones,
} from 'types/pages';

type TPageConfigCreator<TZone> = {
  isEnabled: boolean;
  zone: TZone;
  productsCount: number;
};

type TSponsoredProductConfigExecution = {
  onlyAddToBasked: boolean;
}

type TSponsoredProductConfig = {
  tagLabel: string;
  isLoaderVisible: boolean;
  isListViewEnabled: boolean;

  execution?: Partial<TSponsoredProductConfigExecution>

  productsListing: TPageConfigCreator<TListingPageZones>;
  pageDetails: TPageConfigCreator<TProductDetailsZones>;
  mainPage: TPageConfigCreator<TMainPageZones>;
  basketPage: TPageConfigCreator<TBasketPageZones>;
};

export type { TSponsoredProductConfig };
