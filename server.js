const Koa = require("koa");
const koaBody = require("koa-body");
const productRouter = require("./routes/productsRoutes.js");
const config = require("./config/index.js");

const app = new Koa();

// ----- Persistence -----
if (config.DB.toLowerCase() === "mongo") {
	require("./config/dbConnection.js");
}

// ----- middlewares -----
app.use(koaBody()); // body-parser - urlencoded, multi-part y json
app.use(productRouter.routes()).use(productRouter.allowedMethods());

const PORT = config.PORT;
const server = app.listen(PORT, () => {
	console.log(`Server is up in port ${PORT} || Worker ${process.pid} started!`);
});
server.on("error", (error) => console.log(`Server error: ${error}`));
