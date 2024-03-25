import { BASIC_TAG } from 'consts/common';
import {
  LOADER_ANIMATION,
  LOADING_SPINNER_CLASS,
  LOADING_SPINNER_CONTAINER_CLASS,
  LOADING_SPINNER_CONTAINER_STYLES,
  LOADING_SPINNER_STYLES,
} from 'consts/loadingSpinner';
import getCurrentPageInfo from 'utils/helpers/getCurrentPageInfo';
import getProductsContainerIfExists from 'utils/helpers/getProductsContainerIfExists';

const getLoadingSpinnerContainerStyles = (bgColor: string) => `
    .${LOADING_SPINNER_CONTAINER_CLASS} {
        ${LOADING_SPINNER_CONTAINER_STYLES}
        background-color: ${bgColor};
    }

    .${LOADING_SPINNER_CLASS} {
      ${LOADING_SPINNER_STYLES}
    }

    ${LOADER_ANIMATION}
`;

const showLoadingSpinner = () => {
  const page = getCurrentPageInfo();

  if (!page) return;

  const bodyBgColor = window
    .getComputedStyle(document.body, null)
    .getPropertyValue('background-color');

  const spinnerStyles = document.createElement('style');
  spinnerStyles.innerHTML = getLoadingSpinnerContainerStyles(bodyBgColor);

  const loadingSpinnerContainer = document.createElement(BASIC_TAG);
  const loadingSpinner = document.createElement(BASIC_TAG);
  loadingSpinnerContainer.classList.add(LOADING_SPINNER_CONTAINER_CLASS);

  loadingSpinner.classList.add(LOADING_SPINNER_CLASS);
  loadingSpinnerContainer.appendChild(loadingSpinner);

  const productContainer = getProductsContainerIfExists(page) as HTMLElement;

  // Does not set position relative if the container is accordion - tabs__item class exists in accordion wrappers
  if (!productContainer.parentElement!.classList.contains('tabs__item')) {
    productContainer.style.position = 'relative';
  }

  document.body.appendChild(spinnerStyles);
  productContainer.appendChild(loadingSpinnerContainer);
};

const hideLoadingSpinner = () => {
  const loadingSpinnerContainer = document.querySelector(
    `.${LOADING_SPINNER_CONTAINER_CLASS}`,
  );

  loadingSpinnerContainer?.remove();
};

export { showLoadingSpinner, hideLoadingSpinner };
