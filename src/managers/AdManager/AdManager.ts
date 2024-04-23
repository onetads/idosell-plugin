import { MAX_TIMEOUT_MS, SLOT_NAME, TPL_CODE } from 'consts/dlApi';
import {
  COULDNT_FETCH_PRODUCTS_DATA,
  ERROR_PROMOTED_PRODUCTS_MSG,
  REQUEST_TIMED_OUT,
} from 'consts/messages';
import { SPONSORED_PRODUCT_TAG } from 'consts/products';
import { getProductsIds } from 'managers/AdManager/AdManager.utils';
import { TFetchNativeAdProductItem } from 'types/dlApi';
import { TPages } from 'types/pages';
import { TProductResponse, TFormattedProduct } from 'types/product';
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

  public getPromotedProducts = async (productsCount: number) => {
    if (!dlApi.fetchNativeAd)
      throw new Error(getMessage(ERROR_PROMOTED_PRODUCTS_MSG));

    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(getMessage(REQUEST_TIMED_OUT));
      }, MAX_TIMEOUT_MS);
    });

    const fetchNativeAd = new Promise<TFormattedProduct[]>(
      (resolve, reject) => {
        const products: TFormattedProduct[] = [];

        dlApi.cmd = dlApi.cmd || [];
        dlApi.cmd.push(async (dlApiObj) => {
          try {
            for (let index = 1; index <= productsCount; index++) {
              const ads = await dlApiObj.fetchNativeAd!({
                slot: SLOT_NAME,
                opts: {
                  offer_ids: this.productsIds.join(','),
                  pos: index,
                },
                div: SPONSORED_PRODUCT_TAG + index,
                asyncRender: true,
                tplCode: TPL_CODE,
              });

              const trackingAdLink = ads.meta.adclick;
              const dsaUrl = ads.meta.dsaurl;
              const { offers = [] } = ads.fields.feed;

              const offerData = offers[0];

              const productData = await this.prepareProductsData(
                offerData,
                trackingAdLink,
                dsaUrl,
              );

              if (productData) {
                ads.render();
                products.push({
                  ...productData,
                  div: SPONSORED_PRODUCT_TAG + index,
                });
              }
            }

            resolve(products);
          } catch {
            reject(getMessage(ERROR_PROMOTED_PRODUCTS_MSG));
          }
        });
      },
    );

    return (await Promise.race([fetchNativeAd, timeoutPromise])
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw new Error(error);
      })) as TFormattedProduct[];
  };

  private prepareProductsData = async (
    product: TFetchNativeAdProductItem,
    trackingAdLink: string,
    dsaUrl: string | undefined,
  ) => {
    const productsResponse = await fetch(
      `${window.location.origin}/graphql/v1/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: prepareProductsQuery(product.offer_id),
        }),
      },
    );

    if (!productsResponse.ok) {
      throw new Error(getMessage(COULDNT_FETCH_PRODUCTS_DATA));
    }

    const fetchedProductData =
      (await productsResponse.json()) as TProductResponse;

    const nestedProductsData = fetchedProductData.data.products.products;

    if (!nestedProductsData) return;

    const productData = nestedProductsData[0];

    if (!productData) return;

    const { description, id, name, price, producer, sizes, pointsReceive } =
      productData;

    if (!sizes) return;

    const isAvailable = sizes.some(
      (item) => item.availability.status !== 'disable',
    );

    if (!isAvailable) return;

    const { offer_image, offer_url } = product;

    return {
      description,
      id: id.toString(),
      imageUrl: offer_image,
      link: trackingAdLink + offer_url,
      priceOmnibus: price.omnibusPrice?.gross?.formatted || '',
      priceMain: price.price.gross.formatted,
      producerName: producer.name,
      producerUrl: producer.link,
      title: name,
      points: pointsReceive,
      priceRegular: price.crossedPrice?.gross?.formatted || '',
      dsaUrl: dsaUrl,
    };
  };
}
export default AdManager;
