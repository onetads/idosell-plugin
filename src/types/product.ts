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
  PRICE_OMNIBUS = 'PRICE_OMNIBUS',
  IMG = 'IMG',
  PRODUCT_LINK = 'PRODUCT_LINK',
  DESCRIPTION = 'DESCRIPTION',
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
  dsaUrl: string;
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
          price: {
            gross: {
              formatted: string;
            };
          };
          omnibusPrice: {
            gross: {
              formatted: string;
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
  priceOmnibus: string;
  imageUrl: string;
  link: string;
  description: string;
  points: string;
  priceRegular: string;
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
