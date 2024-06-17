import { SPONSORED_PRODUCT_CLASS } from 'consts/products';

const applyAdditionalStyles = () => {
  const searchViewElement =
    document.querySelector<HTMLDivElement>('.search__view');
  const products = document.querySelectorAll<HTMLDivElement>(
    `.${SPONSORED_PRODUCT_CLASS}`,
  );

  function updateVisibility() {
    if (searchViewElement?.classList.contains('--list')) {
      products.forEach((product) => {
        product.style.display = 'none';
      });
    } else {
      products.forEach((product) => {
        product.style.display = 'block';
      });
    }
  }

  updateVisibility();

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'class') {
        updateVisibility();
      }
    });
  });

  if (searchViewElement) {
    observer.observe(searchViewElement, {
      attributes: true,
    });
  }
};

export default applyAdditionalStyles;
