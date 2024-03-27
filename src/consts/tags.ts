import { ETemplates } from 'types/templates';

const TAG_STYLES_CLASS = 'onet-ads-sponsored-label';

const OVERRIDE_STYLES = `
  margin: 0 !important;
  line-height: 1 !important;
  height: fit-content !important;
  min-height: fit-content !important;
  width: fit-content !important;
  min-width: fit-content !important;
  letter-spacing: 0.5px !important;
  font-size: 9px !important;
  font-weight: 400 !important;
  background-color: rgba(255,255,255,0.5) !important;
  z-index: 999 !important;
  pointer-events: none !important;
`;

const TAGS_STYLES = {
  [ETemplates.PRODUCT_LISTING]: {
    selector: '.product__icon',
    styles: `
      .${TAG_STYLES_CLASS} {
          position: absolute;
          top: 0;
          left: 0;
          padding: 6px !important;
          
          ${OVERRIDE_STYLES}
      }
      `,
  },
  [ETemplates.PRODUCT_LISTING_HOTSPOT]: {
    selector: '.product__icon',
    styles: `
      .${TAG_STYLES_CLASS} {
          position: absolute;
          top: 0;
          left: 0;
          padding: 6px;

          ${OVERRIDE_STYLES}
      }
      `,
  },

  [ETemplates.PRODUCT_DETAILS_ASSOCIATED_ONE]: {
    selector: '.product__wrapper h3',
    styles: `
      .${TAG_STYLES_CLASS} {
          ${OVERRIDE_STYLES}
      }
      `,
  },
  [ETemplates.PRODUCT_DETAILS_ASSOCIATED_TWO]: {
    selector: '.product__icon',
    styles: `
      .${TAG_STYLES_CLASS} {
          position: absolute;
          top: 0;
          left: 0;
          padding: 6px !important;

          ${OVERRIDE_STYLES}
      }
      `,
  },
  [ETemplates.PRODUCT_DETAILS_ASSOCIATED_THREE]: {
    selector: '.product__icon',
    styles: `
      .${TAG_STYLES_CLASS} {
          position: absolute;
          top: 0;
          left: 0;
          padding: 6px !important;

          ${OVERRIDE_STYLES}
      }
      `,
  },
  [ETemplates.PRODUCT_DETAILS_ASSOCIATED_FOUR]: {
    selector: '.product__icon',
    styles: `
      .${TAG_STYLES_CLASS} {
          position: absolute;
          top: 0;
          left: 0;
          padding: 6px !important;

          ${OVERRIDE_STYLES}
      }
      `,
  },

  [ETemplates.MAIN_PAGE_HOTSPOT_ONE]: {
    selector: '.product__icon',
    styles: `
      .${TAG_STYLES_CLASS} {
          position: absolute;
          top: 0;
          left: 0;
          padding: 6px;

          ${OVERRIDE_STYLES}
      }
      `,
  },
  [ETemplates.MAIN_PAGE_HOTSPOT_TWO]: {
    selector: '.product__icon',
    styles: `
      .${TAG_STYLES_CLASS} {
          position: absolute;
          top: 0;
          left: 0;
          padding: 6px;

          ${OVERRIDE_STYLES}
      }
      `,
  },
  [ETemplates.MAIN_PAGE_HOTSPOT_THREE]: {
    selector: '.product__icon',
    styles: `
      .${TAG_STYLES_CLASS} {
          position: absolute;
          top: 0;
          left: 0;
          padding: 6px;

          ${OVERRIDE_STYLES}
      }
      `,
  },
  [ETemplates.MAIN_PAGE_HOTSPOT_FOUR]: {
    selector: '.product__icon',
    styles: `
      .${TAG_STYLES_CLASS} {
          position: absolute;
          top: 0;
          left: 0;
          padding: 6px;

          ${OVERRIDE_STYLES}
      }
      `,
  },

  [ETemplates.BASKET_PAGE_HOTSPOT]: {
    selector: '.product__icon',
    styles: `
      .${TAG_STYLES_CLASS} {
          position: absolute;
          top: 0;
          left: 0;
          padding: 6px;

          ${OVERRIDE_STYLES}
      }
      `,
  },
};

const DSA_ICON =
  '<svg style="width: 1em; height: 1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.964 27.964" xml:space="preserve">\n' +
  '        <g>\n' +
  '        <g id="c126_exclamation">\n' +
  '          <path fill="currentColor" d="M13.982,0.001C6.259,0.001,0,6.259,0,13.984c0,7.721,6.259,13.98,13.982,13.98c7.722,0,13.982-6.26,13.982-13.98C27.965,6.259,21.704,0.001,13.982,0.001z M13.982,26.533c-6.933,0-12.551-5.619-12.551-12.549c0-6.935,5.618-12.552,12.551-12.552c6.931,0,12.55,5.617,12.55,12.552C26.532,20.914,20.913,26.533,13.982,26.533z"/>\n' +
  '            <rect fill="currentColor" x="12.004" y="12" width="3.931" height="11" />\n' +
  '            <path fill="currentColor"d="M13.995,5.072c-1.265,0-2.095,0.852-2.095,1.963c0,1.087,0.802,1.964,2.044,1.964c1.317,0,2.119-0.877,2.119-1.964C16.037,5.924,15.262,5.072,13.995,5.072z"/>\n' +
  '        </g>\n' +
  '      </g>\n' +
  '    </svg>';

export { TAGS_STYLES, TAG_STYLES_CLASS, DSA_ICON };
