const PRODUCTS_IDS_KEY = '%%PRODUCTS_IDS%%';

const GET_PRODUCTS_DATA_QUERY = `
    query Products {
        products(searchInput: { productsId: [${PRODUCTS_IDS_KEY}] }) {
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

export { GET_PRODUCTS_DATA_QUERY, PRODUCTS_IDS_KEY };
