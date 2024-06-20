import { MAX_TIMEOUT_MS, SLOT_NAME, TPL_CODE } from 'consts/dlApi';
import {
  COULDNT_FETCH_PRODUCTS_DATA,
  EMPTY_ADS_ARRAY,
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

  public getPromotedProducts = async (
    productsCount: number,
  ): Promise<TFormattedProduct[]> => {
    if (!dlApi.fetchNativeAd)
      throw new Error(getMessage(ERROR_PROMOTED_PRODUCTS_MSG));

    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(new Error(getMessage(REQUEST_TIMED_OUT)));
      }, MAX_TIMEOUT_MS);
    });

    const fetchNativeAd = new Promise<TFormattedProduct[]>(
      (resolve, reject) => {
        const products: TFormattedProduct[] = [];
        const fetchPromises: Promise<void | TFormattedProduct>[] = [];

        dlApi.cmd = dlApi.cmd || [];
        dlApi.cmd.push((dlApiObj) => {
          for (let index = 1; index <= productsCount; index++) {
            const div = SPONSORED_PRODUCT_TAG + index;

            const fetchPromise = dlApiObj.fetchNativeAd!({
              slot: SLOT_NAME,
              opts: {
                offer_ids: this.productsIds.join(','),
                pos: index,
              },
              div: div,
              asyncRender: true,
              tplCode: TPL_CODE,
            })
              .then(async (ads) => {
                if (
                  ads &&
                  ads.fields.feed.offers &&
                  ads.fields.feed.offers.length
                ) {
                  let isAdAvailable = false;
                  let adIndex = 0;

                  do {
                    const { offers = [] } = ads.fields.feed;
                    if (offers.length === 0) return;

                    const offerData = offers[adIndex];
                    const adData = await this.prepareProductsData(
                      offerData,
                      ads.meta.adclick,
                      ads.meta.dsaurl,
                    );

                    if (adData) {
                      isAdAvailable = true;
                      products.push({
                        ...adData,
                        div: div,
                        renderAd: ads.render,
                      });

                      return adData as TFormattedProduct;
                    }

                    adIndex++;
                  } while (!isAdAvailable);
                } else {
                  console.warn(getMessage(EMPTY_ADS_ARRAY));
                }
              })
              .catch(() => {
                reject(new Error(getMessage(ERROR_PROMOTED_PRODUCTS_MSG)));
              });

            fetchPromises.push(fetchPromise);
          }

          Promise.all(fetchPromises)
            .then(() => resolve(products))
            .catch(() =>
              reject(new Error(getMessage(ERROR_PROMOTED_PRODUCTS_MSG))),
            );
        });
      },
    );

    return (await Promise.race([fetchNativeAd, timeoutPromise])
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
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

    // It is necessary to calculate
    // the price sign for the omnibus price
    // because idosell API does not provide it
    const getOmnibusPriceSign = () => {
      const omnibusPriceVal = price.omnibusPrice?.gross?.value;
      const priceVal = price.price.gross?.value;

      if (!omnibusPriceVal || !priceVal) return '';

      return priceVal > omnibusPriceVal ? '+' : '-';
    };

    const omnibusPriceIsHigherThanSellingPrice =
      price.omnibusPriceDetails?.omnibusPriceIsHigherThanSellingPrice;

    const priceSign = omnibusPriceIsHigherThanSellingPrice ? '+' : '-';
    const omnibusPriceSign = getOmnibusPriceSign();

    return {
      description,
      id: id.toString(),
      imageUrl: offer_image,
      link: trackingAdLink + offer_url,
      pricePercent: `${priceSign}${price.youSavePercent?.toString()}%`,
      priceOmnibus: price.omnibusPrice?.gross?.formatted || '',
      priceOmnibusPercent: `${omnibusPriceSign}${price.omnibusPriceDetails?.youSavePercent?.toString()}%`,
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
