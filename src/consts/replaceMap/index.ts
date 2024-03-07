import { ETemplates, TReplaceContentMap } from 'types/templates';

import PRODUCTS_LIST_REPLACE_MAP from 'consts/replaceMap/productsList';
import PRODUCT_DETAILS_ASSOCIATED_ONE_REPLACE_MAP from 'consts/replaceMap/productsDetailsAssociatedOne';
import PRODUCT_DETAILS_ASSOCIATED_TWO_REPLACE_MAP from 'consts/replaceMap/productsDetailsAssociatedTwo';
import MAIN_PAGE_HOT_SPOT_ONE_REPLACE_MAP from 'consts/replaceMap/mainPageHotSpotOne';
import MAIN_PAGE_HOT_SPOT_TWO_REPLACE_MAP from 'consts/replaceMap/mainPageHotSpotTwo';
import MAIN_PAGE_HOT_SPOT_THREE_REPLACE_MAP from 'consts/replaceMap/mainPageHotSpotThree';

const REPLACE_CONTENT_MAP: TReplaceContentMap = {
  [ETemplates.PRODUCTS_LISTING]: PRODUCTS_LIST_REPLACE_MAP,
  [ETemplates.PRODUCT_DETAILS_ASSOCIATED_ONE]:
    PRODUCT_DETAILS_ASSOCIATED_ONE_REPLACE_MAP,
  [ETemplates.PRODUCT_DETAILS_ASSOCIATED_TWO]:
    PRODUCT_DETAILS_ASSOCIATED_TWO_REPLACE_MAP,
  [ETemplates.MAIN_PAGE_HOTSPOT_ONE]: MAIN_PAGE_HOT_SPOT_ONE_REPLACE_MAP,
  [ETemplates.MAIN_PAGE_HOTSPOT_TWO]: MAIN_PAGE_HOT_SPOT_TWO_REPLACE_MAP,
  [ETemplates.MAIN_PAGE_HOTSPOT_THREE]: MAIN_PAGE_HOT_SPOT_THREE_REPLACE_MAP,
};

export { REPLACE_CONTENT_MAP };
