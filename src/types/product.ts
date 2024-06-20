import {
  BASKET_PAGE,
  MAIN_PAGE,
  PRODUCTS_LIST,
  PRODUCT_DETAILS_PAGE,
} from 'consts/pages';
import { getProductMap } from 'managers/ProductManager/ProductManager.utils';
import {
  TBasketPageZones,
  TListingPageZones,
  TMainPageZones,
  TProductDetailsZones,
} from 'types/pages';

enum EProductElements {
  ID = 'ID',
  TITLE = 'TITLE',
  PRODUCER = 'PRODUCER',
  PRODUCER_URL = 'PRODUCER_URL',
  PRICE_MAIN = 'PRICE_MAIN',
  PRICE_PERCENT = 'PRICE_PERCENT',
  PRICE_OMNIBUS = 'PRICE_OMNIBUS',
  PRICE_OMNIBUS_PERCENT = 'PRICE_OMNIBUS_PERCENT',
  IMG = 'IMG',
  PRODUCT_LINK = 'PRODUCT_LINK',
  DESCRIPTION = 'DESCRIPTION',
  DESCRIPTION_TRAIT = 'DESCRIPTION_TRAIT',
  POINTS = 'POINTS',
  PRICE_REGULAR = 'PRICE_REGULAR',
}

type TProductSelectors = {
  [BASKET_PAGE]: Record<TBasketPageZones, string>;
  [MAIN_PAGE]: Record<TMainPageZones, string>;
  [PRODUCT_DETAILS_PAGE]: Record<TProductDetailsZones, string>;
  [PRODUCTS_LIST]: Record<TListingPageZones, string>;
};

type TProductIdExtractorKeys = {
  [BASKET_PAGE]: Record<TBasketPageZones, string>;
  [MAIN_PAGE]: Record<TMainPageZones, string>;
  [PRODUCT_DETAILS_PAGE]: Record<TProductDetailsZones, string>;
  [PRODUCTS_LIST]: Record<TListingPageZones, string>;
};

type TProductContainers = {
  [BASKET_PAGE]: Record<TBasketPageZones, string>;
  [MAIN_PAGE]: Record<TMainPageZones, string>;
  [PRODUCT_DETAILS_PAGE]: Record<TProductDetailsZones, string>;
  [PRODUCTS_LIST]: Record<TListingPageZones, string>;
};

type TAdProduct = {
  offerId: string;
  imageUrl: string;
  offerUrl: string;
  dsaUrl: string | undefined;
};

type TProductResponse = {
  data: {
    products: {
      products: {
        description: string;
        id: number;
        name: string;
        pointsReceive: string;
        price: {
          youSavePercent: number;
          omnibusPriceDetails: {
            youSavePercent: number;
            omnibusPriceIsHigherThanSellingPrice?: boolean;
          };
          price: {
            gross: {
              formatted: string;
              value?: number;
            };
          };
          omnibusPrice: {
            gross: {
              formatted: string;
              value?: number;
            };
          } | null;
          crossedPrice: {
            gross: {
              formatted: string;
            };
          } | null;
        };
        producer: {
          name: string;
          link: string;
        };
        sizes: {
          availability: {
            status: string;
          };
        }[];
      }[];
    };
  };
};

type TFormattedProduct = {
  id: string;
  title: string;
  producerName: string;
  producerUrl: string;
  priceMain: string;
  pricePercent: string;
  priceOmnibus: string;
  priceOmnibusPercent: string;
  imageUrl: string;
  link: string;
  description: string;
  points: string;
  priceRegular: string;
  dsaUrl: string | undefined;
  div: string;
  renderAd: () => void;
};

type TCheckProductValueMap = {
  key: keyof ReturnType<typeof getProductMap>;
  shouldDelete: (value: string) => boolean;
  selector: string;
}[];

export { EProductElements };
export type {
  TProductSelectors,
  TProductContainers,
  TProductIdExtractorKeys,
  TProductResponse,
  TAdProduct,
  TFormattedProduct,
  TCheckProductValueMap,
};
