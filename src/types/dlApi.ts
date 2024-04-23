type TFetchNativeAdOptions = {
  slot: string;
  tplCode: string;
  div: string;
  asyncRender: boolean;
  opts: {
    pos: number;
    offer_ids: string;
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
