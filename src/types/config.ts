import { TMainPageZones, TProductDetailsZones } from 'types/pages';

type TSponsoredProductConfig = {
  isLoaderVisible: boolean;

  productsListing: {
    isEnabled: boolean;
    productsCount: number;
  };

  pageDetails: {
    isEnabled: boolean;
    zone: TProductDetailsZones;
    productsCount: number;
  };

  mainPage: {
    isEnabled: boolean;

    zone: TMainPageZones;
    productsCount: number;
  };
};

export type { TSponsoredProductConfig };
