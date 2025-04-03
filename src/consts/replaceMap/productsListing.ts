import {
  CONTENT,
  PRODUCT_DESCRIPTION_KEY,
  PRODUCT_DESCRIPTION_TRAIT_KEY,
  PRODUCT_ID_KEY,
  PRODUCT_IMAGE_URL_KEY,
  PRODUCT_LINK_KEY,
  PRODUCT_POINTS_KEY,
  PRODUCT_PRICE_MAIN_KEY,
  PRODUCT_PRICE_OMNIBUS_KEY,
  PRODUCT_PRICE_OMNIBUS_PERCENT_KEY,
  PRODUCT_PRICE_PERCENT_KEY,
  PRODUCT_PRICE_REGULAR_KEY,
  PRODUCT_PRODUCER_NAME_KEY,
  PRODUCT_PRODUCER_URL_KEY,
  PRODUCT_TITLE_KEY,
  PRODUCT_SIZE,
} from 'consts/replaceMap/keys';
import { EProductElements } from 'types/product';
import { TContentMapItem } from 'types/templates';

export default {
  [EProductElements.SIZE]: {
    key: PRODUCT_SIZE,
    map: [
      {
        selector: '.product .product__size',
        replace: [CONTENT],
        canBeNull: true,
      },
    ],
  },
  [EProductElements.ID]: {
    key: PRODUCT_ID_KEY,
    map: [
      {
        selector: '.product',
        replace: ['data-product_id'],
      },
      {
        selector: '.product .product__icon',
        canBeNull: true,
        replace: ['data-product-id'],
      },
      {
        selector: '.product .product__addtobasket button',
        canBeNull: true,
        replace: ['data-product_id'],
      },
      {
        selector: '.product .product__compare_item',
        canBeNull: true,
        replace: ['href'],
        prepareValue: (element) => {
          const preparedUrl = (element as HTMLAnchorElement).href
            .replace('remove', 'add')
            .replace(/(comparers=add).*/, '$1' + `&product=${PRODUCT_ID_KEY}`);

          return preparedUrl;
        },
      },
      {
        selector: '.product .product__compare_item',
        canBeNull: true,
        replace: [CONTENT],
        prepareValue: (element) => {
          const isCompareAdd = element.className.includes('--add');

          if (!isCompareAdd) {
            return '+ Dodaj do porównania';
          }

          return element.innerHTML;
        },
      },
      {
        selector: '.product .product-add-to-bsk',
        canBeNull: true,
        replace: ['href'],
        prepareValue: (element: HTMLAnchorElement) => {
          return (element.href = element.href.replace(
            /product=\d+(?=&)/,
            `product=${PRODUCT_ID_KEY}`,
          ));
        },
      },
      {
        selector: '.product form input[name="product"]',
        canBeNull: true,
        replace: ['value'],
      },
    ],
  },

  [EProductElements.TITLE]: {
    key: PRODUCT_TITLE_KEY,
    map: [
      {
        selector: '.product .product__icon',
        canBeNull: true,
        replace: ['title'],
      },
      {
        selector: '.product .product__icon img',
        canBeNull: true,
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
        selector: '.product .price:not(.--points,.--max,.--omnibus)',
        replace: [CONTENT],
        prepareValue: (element) => {
          element.childNodes[0].textContent = PRODUCT_PRICE_MAIN_KEY;
          return element.innerHTML;
        },
      },
    ],
  },

  [EProductElements.PRICE_PERCENT]: {
    key: PRODUCT_PRICE_PERCENT_KEY,
    map: [
      {
        canBeNull: true,
        selector: '.product .price:has(.omnibus_label) .price_percent',
        replace: [CONTENT],
      },
      {
        canBeNull: true,
        selector: '.promo_percent',
        replace: [CONTENT]
      }
    ]
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

  [EProductElements.PRICE_OMNIBUS_PERCENT]: {
    key: PRODUCT_PRICE_OMNIBUS_PERCENT_KEY,
    map: [
      {
        canBeNull: true,
        selector: '.product .price:has(.omnibus_price__text) .price_percent',
        replace: [CONTENT],
      },
    ],
  },

  [EProductElements.IMG]: {
    key: PRODUCT_IMAGE_URL_KEY,
    map: [
      {
        selector: '.product .product__icon img',
        canBeNull: true,
        replace: ['src'],
      },
      {
        selector: '.product .product__icon img',
        canBeNull: true,
        replace: ['data-src'],
      },
      {
        selector: '.product .product__icon source',
        canBeNull: true,
        replace: ['src', 'srcset', 'data-srcset'],
      },
      {
        selector: '.product .product__icon img',
        canBeNull: true,
        replace: ['data-original'],
      },
      {
        selector: '.product .product__icon img',
        canBeNull: true,
        replace: ['data-additional'],
      },
    ],
  },

  [EProductElements.PRODUCT_LINK]: {
    key: PRODUCT_LINK_KEY,
    map: [
      {
        selector: '.product .product__icon',
        canBeNull: true,
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

  [EProductElements.DESCRIPTION_TRAIT]: {
    key: PRODUCT_DESCRIPTION_TRAIT_KEY,
    map: [
      {
        selector: '.product .description_trait',
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
        selector: '.product .--max',
        replace: [CONTENT],
        canBeNull: true,
      },
    ],
  },
} as Record<EProductElements, TContentMapItem>;
