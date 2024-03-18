import { ETemplates, TReplaceContentMap } from 'types/templates';

import PRODUCT_LISTING_REPLACE_MAP from 'consts/replaceMap/productsListing';
import PRODUCT_LISTING_HOTSPOT_REPLACE_MAP from 'consts/replaceMap/productsListingHotspot';
import PRODUCT_DETAILS_ASSOCIATED_ONE_REPLACE_MAP from 'consts/replaceMap/productsDetailsAssociatedOne';
import PRODUCT_DETAILS_ASSOCIATED_TWO_REPLACE_MAP from 'consts/replaceMap/productsDetailsAssociatedTwo';
import MAIN_PAGE_HOTSPOT_ONE_REPLACE_MAP from 'consts/replaceMap/mainPageHotspotOne';
import MAIN_PAGE_HOTSPOT_TWO_REPLACE_MAP from 'consts/replaceMap/mainPageHotspotTwo';
import MAIN_PAGE_HOTSPOT_THREE_REPLACE_MAP from 'consts/replaceMap/mainPageHotspotThree';
import MAIN_PAGE_HOTSPOT_FOUR_REPLACE_MAP from 'consts/replaceMap/mainPageHotspotFour';

const REPLACE_CONTENT_MAP: TReplaceContentMap = {
  [ETemplates.PRODUCT_LISTING]: PRODUCT_LISTING_REPLACE_MAP,
  [ETemplates.PRODUCT_LISTING_HOTSPOT]: PRODUCT_LISTING_HOTSPOT_REPLACE_MAP,

  [ETemplates.PRODUCT_DETAILS_ASSOCIATED_ONE]:
    PRODUCT_DETAILS_ASSOCIATED_ONE_REPLACE_MAP,
  [ETemplates.PRODUCT_DETAILS_ASSOCIATED_TWO]:
    PRODUCT_DETAILS_ASSOCIATED_TWO_REPLACE_MAP,

  [ETemplates.MAIN_PAGE_HOTSPOT_ONE]: MAIN_PAGE_HOTSPOT_ONE_REPLACE_MAP,
  [ETemplates.MAIN_PAGE_HOTSPOT_TWO]: MAIN_PAGE_HOTSPOT_TWO_REPLACE_MAP,
  [ETemplates.MAIN_PAGE_HOTSPOT_THREE]: MAIN_PAGE_HOTSPOT_THREE_REPLACE_MAP,
  [ETemplates.MAIN_PAGE_HOTSPOT_FOUR]: MAIN_PAGE_HOTSPOT_FOUR_REPLACE_MAP,
};

export { REPLACE_CONTENT_MAP };
