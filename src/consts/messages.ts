const EMPTY_LIST_WARN = 'EMPTY_LIST_WARN';
const PRODUCTS_CONTAINER_NOT_FOUND = 'PRODUCTS_CONTAINER_NOT_FOUND';
const PRODUCTS_ID_EXTRACTOR_NOT_FOUND = 'PRODUCTS_ID_EXTRACTOR_NOT_FOUND';
const PRODUCTS_ID_SELECTOR_NOT_FOUND = 'PRODUCTS_ID_SELECTOR_NOT_FOUND';
const COULDNT_SAVE_TEMPLATE = 'COULDNT_SAVE_TEMPLATE';
const SELECTOR_NOT_FOUND = 'SELECTOR_NOT_FOUND';
const ERROR_PROMOTED_PRODUCTS_MSG = 'ERROR_PROMOTED_PRODUCTS_MSG';
const REQUEST_TIMED_OUT = 'REQUEST_TIMED_OUT';
const COULDNT_FETCH_PRODUCTS_DATA = 'COULDNT_FETCH_PRODUCTS_DATA';
const FETCHING_DLAPI_TOOK_TOO_LONG = 'FETCHING_DLAPI_TOOK_TOO_LONG';
const TEMPLATE_NOT_VALID = 'TEMPLATE_NOT_VALID';
const EMPTY_PRODUCTS_ID_LIST = 'EMPTY_PRODUCTS_ID_LIST';
const EMPTY_PRODUCTS_ARRAY = 'EMPTY_PRODUCTS_ARRAY';
const EMPTY_ADS_ARRAY = 'EMPTY_ADS_ARRAY';
const APP_SHOP_RUN_APP = 'APP_SHOP_RUN_APP';
const PRODUCT_CONFIG_EMPTY = 'PRODUCT_CONFIG_EMPTY';

const messagesMap = {
  [EMPTY_LIST_WARN]: "List is empty or product selector doesn't match",
  [PRODUCTS_CONTAINER_NOT_FOUND]: 'Products container not found',
  [COULDNT_SAVE_TEMPLATE]:
    'Something went wrong while saving template in session storage',
  [SELECTOR_NOT_FOUND]: 'Selector not found: ',
  [ERROR_PROMOTED_PRODUCTS_MSG]:
    'An error occurred while fetching promoted products',
  [REQUEST_TIMED_OUT]: 'Request timed out',
  [COULDNT_FETCH_PRODUCTS_DATA]:
    'Something wemt wrong while fetching products data',
  [PRODUCTS_ID_EXTRACTOR_NOT_FOUND]: 'Products id extractor not found',
  [PRODUCTS_ID_SELECTOR_NOT_FOUND]: 'Products id selector not found',
  [FETCHING_DLAPI_TOOK_TOO_LONG]: 'Fetching dlApi took too long',
  [TEMPLATE_NOT_VALID]: 'Template is not valid',
  [EMPTY_PRODUCTS_ID_LIST]:
    "List of products ids is empty - probably script couldn't find any products by ids selector",
  [EMPTY_PRODUCTS_ARRAY]: 'Products array is empty',
  [EMPTY_ADS_ARRAY]: 'fetchNativeAd: Ads array is empty',
  [APP_SHOP_RUN_APP]: 'app_shop.runApp() function error',
  [PRODUCT_CONFIG_EMPTY]: 'Products config settings = products count set with value 0'
};

export {
  messagesMap,
  EMPTY_LIST_WARN,
  PRODUCTS_CONTAINER_NOT_FOUND,
  COULDNT_SAVE_TEMPLATE,
  SELECTOR_NOT_FOUND,
  ERROR_PROMOTED_PRODUCTS_MSG,
  REQUEST_TIMED_OUT,
  COULDNT_FETCH_PRODUCTS_DATA,
  PRODUCTS_ID_EXTRACTOR_NOT_FOUND,
  PRODUCTS_ID_SELECTOR_NOT_FOUND,
  FETCHING_DLAPI_TOOK_TOO_LONG,
  TEMPLATE_NOT_VALID,
  EMPTY_PRODUCTS_ID_LIST,
  EMPTY_PRODUCTS_ARRAY,
  EMPTY_ADS_ARRAY,
  APP_SHOP_RUN_APP,
  PRODUCT_CONFIG_EMPTY
};
