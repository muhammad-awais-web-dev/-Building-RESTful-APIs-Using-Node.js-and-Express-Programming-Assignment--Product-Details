const fs = require("fs");

const getProducts = function (done) {
  fs.readFile("./src/products.json", "utf-8", (err, data) => {
    if (err) {
      return done(err);
    }
    const productData = JSON.parse(data);
    return done(undefined, productData);
  });
};

const getProductById = function (id, done) {
  fs.readFile("./src/products.json", "utf-8", (err, data) => {
    if (err) {
      return done(err);
    }
    const productData = JSON.parse(data);
    const productDetails = productData.find((product) => product.id === id);
    return done(undefined, productDetails);
  });
};

const saveProductDetails = function (ProductDetails, done) {
  fs.readFile("src/products.json", "utf-8", (err, data) => {
    if (err) {
      return done(err);
    }
    const productData = JSON.parse(data);
    const newId = productData.length > 0 ? Math.max(...productData.map((p) => p.id)) + 1 : 1;
    ProductDetails.id = newId;
    productData.push(ProductDetails);
    fs.writeFile("./src/products.json", JSON.stringify(productData), (err) => {
      if (err) {
        return done(err);
      }
      return done(undefined, ProductDetails);
    });
  });
};

const deleteProductById = function (productId, done) {
  fs.readFile("./src/products.json", "utf-8", (err, data) => {
    if (err) {
      return done(err);
    }
    let productData = JSON.parse(data);
    productData = productData.filter((product) => product.id !== productId);
    fs.writeFile("./src/products.json", JSON.stringify(productData), (err) => {
      if (err) {
        return done(err);
      }
      return done(undefined, { message: "Product deleted successfully" });
    });
  });
};

module.exports = {
  getProducts,
  getProductById,
  saveProductDetails,
  deleteProductById,
};
