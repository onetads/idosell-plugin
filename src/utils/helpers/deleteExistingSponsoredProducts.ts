import { SPONSORED_PRODUCT_CLASS } from 'consts/products';

const deleteExisitingSponsoredProducts = () => {
  const sponsoredProducts = document.querySelectorAll(
    `.${SPONSORED_PRODUCT_CLASS}`,
  );

  sponsoredProducts.forEach((product) => {
    product.remove();
  });
};

export default deleteExisitingSponsoredProducts;
