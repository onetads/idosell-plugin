import {
  MAIN_PAGE,
  MAIN_PAGE_HOTSPOT_ONE,
  MAIN_PAGE_HOTSPOT_THREE,
  MAIN_PAGE_HOTSPOT_TWO,
  PRODUCTS_LIST,
  PRODUCT_DETAILS_ASSOCIATED_ONE,
  PRODUCT_DETAILS_ASSOCIATED_TWO,
  PRODUCT_DETAILS_PAGE,
} from 'consts/pages';
import { EProductElements } from 'types/product';
import { TReplaceContentMap } from 'types/templates';

const PRODUCT_NAME_KEY = '{{ PRODUCT_NAME_KEY }}';
const PRODUCT_LINK_KEY = '{{ PRODUCT_LINK_KEY }}';
const PRODUCT_PRODUCER_NAME_KEY = '{{ PRODUCT_PRODUCER_NAME_KEY }}';
const PRODUCT_PRODUCER_ID_KEY = '{{ PRODUCT_PRODUCER_ID_KEY }}';
const PRODUCT_ID_KEY = '{{ PRODUCT_ID_KEY }}';
const PRODUCT_CATEGORY_KEY = '{{ PRODUCT_CATEGORY_KEY }}';
const PRODUCT_IMAGE_URL_KEY = '{{ PRODUCT_IMAGE_URL_KEY }}';
const PRODUCT_PRICE_KEY = '{{ PRODUCT_PRICE_KEY }}';
const PRODUCT_AVAILABILITY_KEY = '{{ PRODUCT_AVAILABILITY_KEY }}';
const PRODUCT_DELIVERY_KEY = '{{ PRODUCT_DELIVERY_KEY }}';
const PRODUCT_DESCRIPTION_KEY = '{{ PRODUCT_DESCRIPTION_KEY }}';
const PRODUCT_STOCK_ID_KEY = '{{ PRODUCT_STOCK_ID_KEY }}';

const CONTENT = 'CONTENT';
const BASKET_ID = 'BASKET_ID';

const REPLACE_CONTENT_MAP: TReplaceContentMap = {
  [PRODUCTS_LIST]: [
    {
      key: EProductElements.ID,
      map: [],
    },
  ],

  [PRODUCT_DETAILS_PAGE]: {
    [PRODUCT_DETAILS_ASSOCIATED_ONE]: [
      {
        key: EProductElements.ID,
        map: [
          {
            selector: '.pasd',
            replace: ['asd'],
          },
        ],
      },
    ],
    [PRODUCT_DETAILS_ASSOCIATED_TWO]: [
      {
        key: EProductElements.ID,
        map: [
          {
            selector: '.pasd',
            replace: ['asd'],
          },
        ],
      },
    ],
  },

  [MAIN_PAGE]: {
    [MAIN_PAGE_HOTSPOT_ONE]: [
      {
        key: EProductElements.ID,
        map: [
          {
            selector: '.pasd',
            replace: ['asd'],
          },
        ],
      },
    ],
    [MAIN_PAGE_HOTSPOT_TWO]: [
      {
        key: EProductElements.ID,
        map: [
          {
            selector: '.pasd',
            replace: ['asd'],
          },
        ],
      },
    ],
    [MAIN_PAGE_HOTSPOT_THREE]: [
      {
        key: EProductElements.ID,
        map: [
          {
            selector: '.pasd',
            replace: ['asd'],
          },
        ],
      },
    ],
  },
};

export {
  REPLACE_CONTENT_MAP,
  CONTENT,
  BASKET_ID,
  PRODUCT_ID_KEY,
  PRODUCT_NAME_KEY,
  PRODUCT_LINK_KEY,
  PRODUCT_CATEGORY_KEY,
  PRODUCT_IMAGE_URL_KEY,
  PRODUCT_PRICE_KEY,
  PRODUCT_AVAILABILITY_KEY,
  PRODUCT_DELIVERY_KEY,
  PRODUCT_DESCRIPTION_KEY,
  PRODUCT_STOCK_ID_KEY,
  PRODUCT_PRODUCER_NAME_KEY,
  PRODUCT_PRODUCER_ID_KEY,
};
