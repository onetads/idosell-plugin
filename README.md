# Ras

This project contains javascript for IdoSell widget.

# Reqs

Node: v20.8.1 (https://nodejs.org/dist/v20.8.1/docs/api/)
Yarn: v1.22.19

# Scripts

yarn build - builds minified js (code is bundled to dist/bundle.js file) <br/>
yarn eslint - checks for eslint errors


## Config

| Key | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `tagLabel` | `string` | Text for sponsored tag in product card |
| `productsListing` | `object` | Configuration object for **product listing** |
| `pageDetails` | `object` | Configuration object for **product details page**|
| `mainPage` | `object` | Configuration object for **main page** |

#### Configuration object for product listing, products details and main page

| Key | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `isEnabled` | `boolean` | Specifies whether the product should be visible |
| `zone` | `string` | Specify zone where product should appear. **See available zones below** |
| `productsCount` | `object` | Specifies the number of products injected into the list |

#### Zones

| Listing | Zones |
| :-------- | :------- | 
| `productsListing` | `PRODUCT_LISTING, PRODUCT_LISTING_HOTSPOT` | 
| `pageDetails` | `PRODUCT_DETAILS_ASSOCIATED_ONE, PRODUCT_DETAILS_ASSOCIATED_TWO` | 
| `mainPage` | `MAIN_PAGE_HOTSPOT_ONE, MAIN_PAGE_HOTSPOT_TWO,  MAIN_PAGE_HOTSPOT_THREE, MAIN_PAGE_HOTSPOT_FOUR` | 


#### Example Config

The configuration object should be assigned to the `sponsoredProductConfig` key in the `window` object before the script initialization.

```js
window.sponsoredProductConfig = {
  tagLabel: 'SPONSOROWANY',

  productsListing: {
    zone: 'PRODUCT_LISTING_HOTSPOT',
    isEnabled: true,
    productsCount: 2,
  },
  pageDetails: {
    isEnabled: true,
    zone: 'PRODUCT_DETAILS_ASSOCIATED_TWO',
    productsCount: 2,
  },
  mainPage: {
    isEnabled: false,
    zone: 'MAIN_PAGE_HOTSPOT_ONE',
    productsCount: 5,
  },
};
```

