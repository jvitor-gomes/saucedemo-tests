const users = require('../fixtures/users.json');
const productIndices = require('../fixtures/productIndices.json');
const checkout = require('../fixtures/checkout.json');
const productsData = require('../fixtures/products.json');

const TestData = {
    users,
    productIndices,
    checkout,
    products: productsData.products
};

export default TestData;