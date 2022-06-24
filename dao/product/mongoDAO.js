const mongoose = require("mongoose");
const Product = require("../../models/Product.js");
const ProductDTO = require("../../dto/productDTO.js");

const isValidId = mongoose.Types.ObjectId.isValid;

class ProductMongoDAO {
  constructor()

  create = async (data) => {
    const {id, title, price, thumbnail} = await Product.create(data)
    return new ProductDTO(id, title, price, thumbnail)
  }

  findById = async (id) => {
    if (!isValidId(id)) return null;

    const product = await Product.findById(id);

    if (product) {
      const { id, title, price, thumbnail } = product;
      return new ProductDTO(id, title, price, thumbnail);
    }
    return null;
  }

  findAll = async () => {
    const products = await Product.find();
    return products.map(
      ({ id, title, price, thumbnail }) =>
        new ProductDTO(id, title, price, thumbnail)
    );
  }

  update = async (id, toUpdate) => {
    if (!isValidId(id)) return null;

    if (await Product.findByIdAndUpdate(id, toUpdate)) {
      return new ProductDTO(
        id,
        toUpdate.title,
        toUpdate.price,
        toUpdate.thumbnail
      );
    }
    return null;
  }

  delete = async (id) => {
    if (!isValidId(id)) return null;

    const { id, title, price, thumbnail } = await Product.findByIdAndDelete(id);
    return new ProductDTO(id, title, price, thumbnail);
  }
}

module.exports = new ProductMongoDAO();
