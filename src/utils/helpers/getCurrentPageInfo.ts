import { PRODUCTS_LIST, PRODUCT_DETAILS } from 'consts/pages';
import {
  PRODUCT_DETAILS_SELECTOR,
  PRODUCT_LIST_SELECTOR,
} from 'consts/products';

const getCurrentPageInfo = () => {
  const productList = document.getElementById(PRODUCT_LIST_SELECTOR);

  if (productList) {
    return PRODUCTS_LIST;
  }

  const productDetails = document.getElementById(PRODUCT_DETAILS_SELECTOR);

  if (productDetails) {
    return PRODUCT_DETAILS;
  }
};

export default getCurrentPageInfo;
