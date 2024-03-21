import {
  CONTENT,
  PRODUCT_DESCRIPTION_KEY,
  PRODUCT_ID_KEY,
  PRODUCT_IMAGE_URL_KEY,
  PRODUCT_LINK_KEY,
  PRODUCT_POINTS_KEY,
  PRODUCT_PRICE_MAIN_KEY,
  PRODUCT_PRICE_OMNIBUS_KEY,
  PRODUCT_PRICE_REGULAR_KEY,
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

  [EProductElements.PRICE_MAIN]: {
    key: PRODUCT_PRICE_MAIN_KEY,
    map: [
      {
        selector: '.product .price:not(.--points,.--max)',
        replace: [CONTENT],
        prepareValue: (element) => {
          element.childNodes[0].textContent = PRODUCT_PRICE_MAIN_KEY;
          return element.innerHTML;
        },
      },
    ],
  },

  [EProductElements.PRICE_OMNIBUS]: {
    key: PRODUCT_PRICE_OMNIBUS_KEY,
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

  [EProductElements.POINTS]: {
    key: PRODUCT_POINTS_KEY,
    map: [
      {
        selector: '.product .price:has(.--points)',
        replace: [CONTENT],
        canBeNull: true,
        prepareValue: (element) => {
          element.childNodes[0].textContent = PRODUCT_POINTS_KEY;
          return element.innerHTML;
        },
      },
    ],
  },

  [EProductElements.PRICE_REGULAR]: {
    key: PRODUCT_PRICE_REGULAR_KEY,
    map: [
      {
        selector: '.product .--max del',
        replace: [CONTENT],
        canBeNull: true,
      },
    ],
  },
} as Record<EProductElements, TContentMapItem>;
