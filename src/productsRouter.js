const express = require("express");
const routes = express.Router();
const productsController = require("./productsController");

routes.get("/", (req, res) => {
  try {
    productsController.getProducts((err, results) => {
      if (err) {
        return res.status(400).json({ status: "Error", message: err.message });
      }
      return res.status(200).json({ status: "OK", data: results });
    });
  } catch (err) {
    return res.status(400).json({ status: "Error", message: err.message });
  }
});
routes.get("/:productId", (req, res) => {
  try {
    const productId = parseInt(req.params.productId);

    productsController.getProductById(productId, (err, results) => {
      if (err) {
        return res.status(400).json({ status: "Error", message: err.message });
      }
      return res.status(200).json({ status: "OK", data: results });
    });
  } catch (err) {
    return res.status(400).json({ status: "Error", message: err.message });
  }
});

routes.post("/", (req, res) => {
  try {
    const productDetails = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
    };
    productsController.saveProductDetails(productDetails, (err, results) => {
      if (err) {
        return res.status(400).json({ status: "Error", message: err.message });
      }
      return res.status(201).json({ status: "OK", data: results });
    });
  } catch (err) {
    return res.status(400).json({ status: "Error", message: err.message });
  }
});

routes.delete("/:productId", (req, res) => {
  try {
    const productId = parseInt(req.params.productId);

    if (!productId) {
      return res
        .status(400)
        .json({ status: "Error", message: "Product ID is required" });
    }
    try {
      productsController.deleteProductById(
        parseInt(productId),
        (err, results) => {
          if (err) {
            return res
              .status(400)
              .json({ status: "Error", message: err.message });
          }
          return res.status(200).json({ status: "OK", data: results });
        }
      );
    } catch (err) {
      return res.status(400).json({ status: "Error", message: err.message });
    }
  } catch (err) {
    return res.status(400).json({ status: "Error", message: err.message });
  }
});

module.exports = routes;
