import { MAIN_PAGE, PRODUCTS_LIST, PRODUCT_DETAILS_PAGE } from 'consts/pages';
import { TMainPageZones, TPages, TProductDetailsZones } from 'types/pages';

enum EProductElements {
  ID = 'ID',
  TITLE = 'TITLE',
  PRODUCER = 'PRODUCER',
  PRODUCER_URL = 'PRODUCER_URL',
  PRICE = 'PRICE',
  OMNIBUS = 'OMNIBUS',
  IMG = 'IMG',
  PRODUCT_LINK = 'PRODUCT_LINK',
  COMPARE = 'COMPARE',
  DESCRIPTION = 'DESCRIPTION',
}

type TProductSelectors = Record<TPages, string>;

type TProductIdExtractorKeys = Record<TPages, string>;

type TProductContainers = {
  [MAIN_PAGE]: Record<TMainPageZones, string>;
  [PRODUCT_DETAILS_PAGE]: Record<TProductDetailsZones, string>;
  [PRODUCTS_LIST]: string;
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
  price: string;
  omnibus: string;
  imageUrl: string;
  link: string;
  description: string;
};

export {
  EProductElements,
  TAdProduct,
  TProductSelectors,
  TProductContainers,
  TProductIdExtractorKeys,
  TProductResponse,
  TFormattedProduct,
};
