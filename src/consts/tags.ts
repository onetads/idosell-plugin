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
};

export { TAGS_STYLES, TAG_STYLES_CLASS };
