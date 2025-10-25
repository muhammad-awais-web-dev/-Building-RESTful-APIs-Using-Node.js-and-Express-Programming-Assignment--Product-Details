const productsDao = require("./productDao");

const getProducts = function (done) {
  productsDao.getProducts(done);
};

const getProductById = function (id, done) {
  productsDao.getProductById(id, done);
};
const saveProductDetails = function (productDetails, done) {
  productsDao.saveProductDetails(productDetails, done);
};

const deleteProductById = (productId, done) => {
  productsDao.deleteProductById(productId, done);
};

module.exports = {
  getProducts,
  getProductById,
  saveProductDetails,
  deleteProductById,
};
