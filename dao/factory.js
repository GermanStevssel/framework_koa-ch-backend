const config = require("../config/index.js");

let productsDao;

if (`${config.DB}` === "mongo") {
	const { default: ProductsDaoMongo } = require(`./product/${config.DB}DAO.js`);

	productsDao = new ProductsDaoMongo("products", productSchema);
} else {
	console.log("Solo existe persistencia en mongo");
}

export default productsDao;
