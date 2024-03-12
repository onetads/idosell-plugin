import {
  CONTENT,
  PRODUCT_DESCRIPTION_KEY,
  PRODUCT_ID_KEY,
  PRODUCT_IMAGE_URL_KEY,
  PRODUCT_LINK_KEY,
  PRODUCT_OMNIBUS_KEY,
  PRODUCT_PRICE_KEY,
  PRODUCT_PRODUCER_NAME_KEY,
  PRODUCT_PRODUCER_URL_KEY,
  PRODUCT_TITLE_KEY,
} from 'consts/replaceMap/keys';
import { EProductElements } from 'types/product';
import { TContentMapItem } from 'types/templates';

export default {
  [EProductElements.ID]: {
    key: PRODUCT_ID_KEY,
    map: [
      {
        selector: '.product',
        replace: ['data-product_id'],
      },
      {
        selector: '.product .product__icon',
        replace: ['data-product-id'],
      },
      {
        selector: '.product .product__compare_item',
        replace: ['href'],
        prepareValue: (element) => {
          const preparedUrl = (element as HTMLAnchorElement).href
            .replace('remove', 'add')
            .replace(/(comparers=add).*/, '$1' + `&product=${PRODUCT_ID_KEY}`);

          return preparedUrl;
        },
      },
    ],
  },

  [EProductElements.TITLE]: {
    key: PRODUCT_TITLE_KEY,
    map: [
      {
        selector: '.product .product__icon',
        replace: ['title'],
      },
      {
        selector: '.product .product__icon img',
        replace: ['alt'],
      },
      {
        selector: '.product .product__name',
        replace: ['title', CONTENT],
      },
    ],
  },

  [EProductElements.PRODUCER]: {
    key: PRODUCT_PRODUCER_NAME_KEY,
    map: [
      {
        selector: '.product .product__producer',
        replace: ['title', CONTENT],
        canBeNull: true,
      },
    ],
  },

  [EProductElements.PRODUCER_URL]: {
    key: PRODUCT_PRODUCER_URL_KEY,
    map: [
      {
        selector: '.product .product__producer',
        replace: ['href'],
        canBeNull: true,
      },
    ],
  },

  [EProductElements.PRICE]: {
    key: PRODUCT_PRICE_KEY,
    map: [
      {
        selector: '.product .price',
        replace: [CONTENT],
      },
    ],
  },

  [EProductElements.OMNIBUS]: {
    key: PRODUCT_OMNIBUS_KEY,
    map: [
      {
        selector: '.product .omnibus_price__value',
        replace: [CONTENT],
        canBeNull: true,
      },
    ],
  },

  [EProductElements.IMG]: {
    key: PRODUCT_IMAGE_URL_KEY,
    map: [
      {
        selector: '.product .product__icon img',
        replace: ['src'],
      },
      {
        selector: '.product .product__icon source',
        replace: ['srcset'],
      },
    ],
  },

  [EProductElements.PRODUCT_LINK]: {
    key: PRODUCT_LINK_KEY,
    map: [
      {
        selector: '.product .product__icon',
        replace: ['href'],
      },
      {
        selector: '.product .product__name',
        replace: ['href'],
      },
    ],
  },

  [EProductElements.DESCRIPTION]: {
    key: PRODUCT_DESCRIPTION_KEY,
    map: [
      {
        selector: '.product .product_cleardescription',
        replace: [CONTENT],
        canBeNull: true,
      },
    ],
  },
} as Record<EProductElements, TContentMapItem>;
