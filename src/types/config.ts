import {
  TListingPageZones,
  TMainPageZones,
  TProductDetailsZones,
} from 'types/pages';

type TPageConfigCreator<TZone> = {
  isEnabled: boolean;
  zone: TZone;
  productsCount: number;
};

type TSponsoredProductConfig = {
  isLoaderVisible: boolean;
  tagLabel: string;

  productsListing: TPageConfigCreator<TListingPageZones>;
  pageDetails: TPageConfigCreator<TProductDetailsZones>;
  mainPage: TPageConfigCreator<TMainPageZones>;
};

export type { TSponsoredProductConfig };
