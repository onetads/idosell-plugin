import { PRODUCTS_LIST, PRODUCT_DETAILS_PAGE } from 'consts/pages';
import {
  PRODUCT_DETAILS_PAGE_SELECTOR,
  PRODUCT_LIST_SELECTOR,
} from 'consts/products';

const getCurrentPageInfo = () => {
  const productList = document.querySelector(PRODUCT_LIST_SELECTOR);

  if (productList) {
    return PRODUCTS_LIST;
  }

  const relatedProductList = document.querySelector(
    PRODUCT_DETAILS_PAGE_SELECTOR,
  );

  if (relatedProductList) {
    return PRODUCT_DETAILS_PAGE;
  }
};

export default getCurrentPageInfo;
