const Koa = require("koa");
const koaBody = require("koa-body");

const app = new Koa();

app.use(async (ctx) => {
	ctx.body = " Hello World";
});

const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log();
});
