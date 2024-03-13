import { TAdProduct } from 'types/product';

const extractProductsIds = (products: TAdProduct[]) => {
  return products.map((product) => product.offerId);
};

const prepareProductsQuery = (products: TAdProduct[]) => {
  return `
    query Products {
        products(searchInput: { productsId: [${extractProductsIds(products).join(',')}] }) {
            took
            products {
                id
                name
                description
                price {
                    omnibusPrice {
                        gross {
                            formatted
                        }
                    }
                    price {
                        gross {
                            formatted
                        }
                    }
                }
                producer {
                    name
                    link
                }
                sizes {
                    availability {
                        status
                    }
                }
            }
        }
    }
`;
};

export default prepareProductsQuery;
