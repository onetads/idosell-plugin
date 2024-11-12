import {
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
} from 'consts/replaceMap/keys';
import ProductManager from 'managers/ProductManager/ProductManager';
import { TPages } from 'types/pages';
import { TFormattedProduct } from 'types/product';

const initProductManager = (page: TPages) => new ProductManager(page);

const getProductMap = (product: TFormattedProduct) => {
  return {
    [PRODUCT_ID_KEY]: product.id,
    [PRODUCT_TITLE_KEY]: product.title,
    [PRODUCT_PRODUCER_NAME_KEY]: product.producerName,
    [PRODUCT_PRODUCER_URL_KEY]: product.producerUrl,
    [PRODUCT_PRICE_MAIN_KEY]: product.priceMain,
    [PRODUCT_PRICE_PERCENT_KEY]: product.pricePercent,
    [PRODUCT_PRICE_OMNIBUS_KEY]: product.priceOmnibus,
    [PRODUCT_PRICE_OMNIBUS_PERCENT_KEY]: product.priceOmnibusPercent,
    [PRODUCT_IMAGE_URL_KEY]: product.imageUrl,
    [PRODUCT_LINK_KEY]: product.link,
    [PRODUCT_DESCRIPTION_KEY]: product.description,
    [PRODUCT_DESCRIPTION_TRAIT_KEY]: product.description.replaceAll(
      '<[^>]*>',
      '',
    ),
    [PRODUCT_POINTS_KEY]: product.points,
    [PRODUCT_PRICE_REGULAR_KEY]: product.priceRegular,
  };
};

const overrideProductStyles = (product: Element) => {
  const selectors = '.product .price:not(.--points,.--max,.--omnibus)'

  const productPrice = product.querySelector(selectors,
  ) as HTMLElement;

  if (productPrice instanceof HTMLElement) {
      const computedStyle = window.getComputedStyle(productPrice);
      const computedColor = computedStyle.color || 'inherit';

      if (!productPrice.style.color && computedColor !== 'inherit') {
        productPrice.style.color = 'inherit';
      }

      if (product.querySelectorAll('.price').length === 1) {
        productPrice.style.color = 'inherit';
      }
  }

  const traits = product.querySelectorAll<HTMLElement>('.param_trait li');

  if (traits && traits.length > 0) {
    traits.forEach((trait) => {
      trait.style.listStyleType = 'none';
    });
  }
};

export { initProductManager, getProductMap, overrideProductStyles };
