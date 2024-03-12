const EMPTY_LIST_WARN = 'EMPTY_LIST_WARN';
const PRODUCTS_CONTAINER_NOT_FOUND = 'PRODUCTS_CONTAINER_NOT_FOUND';
const COULDNT_SAVE_TEMPLATE = 'COULDNT_SAVE_TEMPLATE';
const SELECTOR_NOT_FOUND = 'SELECTOR_NOT_FOUND';
const ERROR_PROMOTED_PRODUCTS_MSG = 'ERROR_PROMOTED_PRODUCTS_MSG';
const REQUEST_TIMED_OUT = 'REQUEST_TIMED_OUT';
const COULDNT_FETCH_PRODUCTS_DATA = 'COULDNT_FETCH_PRODUCTS_DATA';

const messagesMap = {
  [EMPTY_LIST_WARN]: "List is empty or product selector doesn't match",
  [PRODUCTS_CONTAINER_NOT_FOUND]: 'Products container not found',
  [COULDNT_SAVE_TEMPLATE]:
    'Something went wrong while saving template in session storage',
  [SELECTOR_NOT_FOUND]: 'Selector not found: ',
  [ERROR_PROMOTED_PRODUCTS_MSG]:
    'An error occured while fetching promoted products',
  [REQUEST_TIMED_OUT]: 'Request timed out',
  [COULDNT_FETCH_PRODUCTS_DATA]:
    'Somethimg wemt wrong while fetching products data',
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
};
