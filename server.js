const Koa = require("koa");
const koaBody = require("koa-body");
const config = require("./config/index.js");

const app = new Koa();

// ----- Persistence -----
if (config.DB.toLowerCase() === "mongo") {
	require("./config/dbConnection.js");
}

// ----- middlewares -----
app.use(koaBody()); // body-parser - urlencoded, multi-part y json

app.use(async (ctx) => {
	ctx.body = " Hello World";
});

const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log(`Server is up in port ${PORT}`);
});
server.on("error", (error) => console.log(`Server error: ${error}`));
