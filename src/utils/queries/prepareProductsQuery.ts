const prepareProductsQuery = (ids: string) => {
  return `
    query Products {
        products(searchInput: { productsId: [${ids}] }) {
            took
            products {
                id
                name
                description
                pointsReceive
                price {
                    youSavePercent
                    omnibusPrice {
                        gross {
                            formatted
                            value
                        }
                    }
                    price {
                        gross {
                            formatted
                            value
                        }
                    }
                    crossedPrice {
                        gross {
                            formatted
                        }
                    }
                    omnibusPriceDetails {
                        youSavePercent
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
