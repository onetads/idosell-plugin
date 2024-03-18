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
  tagLabel: string;

  productsListing: TPageConfigCreator<TListingPageZones>;
  pageDetails: TPageConfigCreator<TProductDetailsZones>;
  mainPage: TPageConfigCreator<TMainPageZones>;
};

export type { TSponsoredProductConfig };
