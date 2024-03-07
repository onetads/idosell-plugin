const EMPTY_LIST_WARN = 'EMPTY_LIST_WARN';
const PRODUCTS_CONTAINER_NOT_FOUND = 'PRODUCTS_CONTAINER_NOT_FOUND';
const COULDNT_SAVE_TEMPLATE = 'COULDNT_SAVE_TEMPLATE';
const SELECTOR_NOT_FOUND = 'SELECTOR_NOT_FOUND';

const messagesMap = {
  [EMPTY_LIST_WARN]: "List is empty or product selector doesn't match",
  [PRODUCTS_CONTAINER_NOT_FOUND]: 'Products container not found',
  [COULDNT_SAVE_TEMPLATE]:
    'Something went wrong while saving template in session storage',
  [SELECTOR_NOT_FOUND]: 'Selector not found: ',
};

export {
  messagesMap,
  EMPTY_LIST_WARN,
  PRODUCTS_CONTAINER_NOT_FOUND,
  COULDNT_SAVE_TEMPLATE,
  SELECTOR_NOT_FOUND,
};
