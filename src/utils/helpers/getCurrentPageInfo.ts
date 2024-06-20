import {
  BASKET_PAGE,
  BASKET_PAGE_SELECTOR,
  MAIN_PAGE,
  MAIN_PAGE_CONTAINER_CLASS,
  MAIN_PAGE_SELECTOR,
  PRODUCTS_LIST,
  PRODUCT_DETAILS_PAGE,
  PRODUCT_DETAILS_PAGE_SELECTOR,
} from 'consts/pages';
import { PRODUCT_LISTING_SELECTOR } from 'consts/products';

const getCurrentPageInfo = () => {
  const productListing = document.querySelector(PRODUCT_LISTING_SELECTOR);

  if (productListing) {
    return PRODUCTS_LIST;
  }

  const productDetailsPage = document.querySelector(
    PRODUCT_DETAILS_PAGE_SELECTOR,
  );

  if (productDetailsPage) {
    return PRODUCT_DETAILS_PAGE;
  }

  const mainPageContainer = document.querySelector(MAIN_PAGE_SELECTOR);

  if (
    mainPageContainer &&
    mainPageContainer.classList.contains(MAIN_PAGE_CONTAINER_CLASS)
  ) {
    return MAIN_PAGE;
  }

  const basketPage = document.querySelector(BASKET_PAGE_SELECTOR);

  if (basketPage) {
    return BASKET_PAGE;
  }
};

export default getCurrentPageInfo;
