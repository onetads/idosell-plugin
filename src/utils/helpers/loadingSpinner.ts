import { BASIC_TAG } from 'consts/common';
import {
  LOADING_SPINNER_CONTAINER_CLASS,
  LOADING_SPINNER_CONTAINER_STYLES,
} from 'consts/loadingSpinner';
import getCurrentPageInfo from 'utils/helpers/getCurrentPageInfo';
import getProductsContainerIfExists from 'utils/helpers/getProductsContainerIfExists';

const showLoadingSpinner = () => {
  const page = getCurrentPageInfo();

  if (!page) return;

  console.log('test');

  const bodyBgColor = window
    .getComputedStyle(document.body, null)
    .getPropertyValue('background-color');

  const spinnerStyles = document.createElement('style');
  spinnerStyles.innerHTML = `
      .${LOADING_SPINNER_CONTAINER_CLASS} {
          ${LOADING_SPINNER_CONTAINER_STYLES}
          background-color: ${bodyBgColor};
      }
  `;
  const loadingSpinnerContainer = document.createElement(BASIC_TAG);
  loadingSpinnerContainer.classList.add(LOADING_SPINNER_CONTAINER_CLASS);

  const productContainer = getProductsContainerIfExists(page);

  console.log(productContainer);

  productContainer.appendChild(spinnerStyles);
  productContainer.appendChild(loadingSpinnerContainer);
};

export { showLoadingSpinner };
