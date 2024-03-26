import { MAX_TIMEOUT_MS, SLOT_NAME, TPL_CODE } from 'consts/dlApi';
import {
  COULDNT_FETCH_PRODUCTS_DATA,
  ERROR_PROMOTED_PRODUCTS_MSG,
  REQUEST_TIMED_OUT,
} from 'consts/messages';
import {
  extractProductsIds,
  getProductsIds,
} from 'managers/AdManager/AdManager.utils';
import { TPages } from 'types/pages';
import { TAdProduct, TProductResponse, TFormattedProduct } from 'types/product';
import getMessage from 'utils/formatters/getMessage';
import prepareProductsQuery from 'utils/queries/prepareProductsQuery';

class AdManager {
  private page: TPages | null;
  private productsIds: number[];

  constructor(page: TPages | null) {
    this.page = page;

    if (this.page) {
      this.productsIds = getProductsIds(this.page);
    }
  }

  public getPromotedProducts = async () => {
    if (!dlApi.fetchNativeAd)
      throw new Error(getMessage(ERROR_PROMOTED_PRODUCTS_MSG));

    let products: TAdProduct[] | null | Error = null;

    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(getMessage(REQUEST_TIMED_OUT));
      }, MAX_TIMEOUT_MS);
    });

    const fetchNativeAd = new Promise<TAdProduct[]>((resolve, reject) => {
      dlApi.cmd = dlApi.cmd || [];
      dlApi.cmd.push(async (dlApiObj) => {
        try {
          const ads = await dlApiObj.fetchNativeAd!({
            slot: SLOT_NAME,
            opts: {
              offer_ids: this.productsIds.join(','),
            },
            tplCode: TPL_CODE,
          });

          const trackingAdLink = ads.meta.adclick;
          const dsaUrl = ads.meta.dsaurl;
          const { offers = [] } = ads.fields.feed;

          products = offers.map(({ offer_id, offer_image, offer_url }) => ({
            offerId: offer_id,
            imageUrl: offer_image,
            offerUrl: trackingAdLink + offer_url,
            dsaUrl: dsaUrl,
          }));

          resolve(products);
        } catch (_) {
          reject(getMessage(ERROR_PROMOTED_PRODUCTS_MSG));
        }
      });
    });

    return (await Promise.race([fetchNativeAd, timeoutPromise])
      .then((result) => {
        return this.prepareProductsData(result as TAdProduct[]);
      })
      .catch((error) => {
        throw new Error(error);
      })) as TFormattedProduct[];
  };

  private prepareProductsData = async (products: TAdProduct[]) => {
    const productsResponse = await fetch(
      `${window.location.origin}/graphql/v1/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: prepareProductsQuery(extractProductsIds(products).join(',')),
        }),
      },
    );

    if (!productsResponse.ok) {
      throw new Error(getMessage(COULDNT_FETCH_PRODUCTS_DATA));
    }

    const productsData = (await productsResponse.json()) as TProductResponse;
    const formattedProducts: TFormattedProduct[] = [];

    for (const product of productsData.data.products.products) {
      const { description, id, name, price, producer, sizes, pointsReceive } =
        product;

      if (!sizes) continue;

      const isAvailable = sizes.some(
        (item) => item.availability.status !== 'disable',
      );

      if (!isAvailable) continue;

      const { imageUrl, offerUrl, dsaUrl } = products.find(
        (p) => p.offerId.toString() === id.toString(),
      )!;

      formattedProducts.push({
        description,
        id: id.toString(),
        imageUrl: imageUrl,
        link: offerUrl,
        priceOmnibus: price.omnibusPrice?.gross?.formatted || '',
        priceMain: price.price.gross.formatted,
        producerName: producer.name,
        producerUrl: producer.link,
        title: name,
        points: pointsReceive,
        priceRegular: price.crossedPrice?.gross?.formatted || '',
        dsaUrl: dsaUrl,
      });
    }

    return formattedProducts;
  };
}
export default AdManager;
