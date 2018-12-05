const Koa = require("koa"); // 返回的是一个类
const path = require("path"); // 返回的是一个类

const static = require('koa-static');

const koaNunjucks = require('koa-nunjucks-2');
// const KoaRouter = require('koa-router'); // 返回的是一个函数

const controller = require('./controller.js'); // 返回的是一个函数
// const staticFiles = require('./static-files.js'); // 返回的是一个函数

const koa = new Koa(); // 实例化对象

koa.use(async (ctx,next)=>{
	console.log(ctx.url) 
	// 不同步执行函数就会
	// 回调函数执行完成,异步函数还在执行 
	// 这个时候客户端已经接收到了数据 就无法执行下一个监听的回调了
	// 导致 报错 数据已经发送出去 无法再次发送
	await next();
});

koa.use(koaNunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}));

// 将路由绑定到koa中
koa.use(controller());
// koa.use(staticFiles("/public",path.join(__dirname,"public")))

// 配置静态web服务的中间件
koa.use(static(path.join(__dirname, 'public')));

koa.listen(2222,()=>{
	console.log("启动成功")
});

