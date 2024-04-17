type TFetchNativeAdOptions = {
  slot: string;
  tplCode: string;
  opts: {
    asyncRender: boolean;
    pos: number;
    offer_ids: string;
    div: string;
  };
};

type TFetchNativeAdProductItem = {
  offer_id: string;
  offer_image: string;
  offer_url: string;
};

type TFetchNativeAdResponse = {
  render: () => void;
  meta: {
    adclick: string;
    dsaurl: string | undefined;
  };
  fields: {
    feed: {
      offers: TFetchNativeAdProductItem[];
    };
  };
};

export {
  TFetchNativeAdOptions,
  TFetchNativeAdResponse,
  TFetchNativeAdProductItem,
};
