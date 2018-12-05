/*
	路由中间件 读取路由目录下的路由 然后将组件绑定
*/
const fs = require('fs');
const path = require('path');

const KoaRouter = require('koa-router')(); // 返回的是一个函数

function initRouter(dir = path.join(__dirname, 'routers')){

	// 读取目录下所有文件
	const dirList = fs.readdirSync(dir);
	// 便利所有文件 
	dirList.forEach((item)=>{
		// 导入模块文件
		const router = require(path.join(dir, item));
		// 将模块文件的key解析出来 用于判断是什么类型的请求
		for (router_name in router) {
			
			// console.log(router_name)

			if(router_name.startsWith("GET")){
				// 截取路径url
				const path_url = router_name.substring('4');
				// 将模块放回的函数绑定到指定的监听
				KoaRouter.get(path_url, router[router_name]);

			}else if (router_name.startsWith("POST")) {
				// 同上
				const path_url = router_name.substring('5');

				KoaRouter.post(path_url,router[router_name]);
				
			}

		}

	});
	// 返回处理好的路由
	return KoaRouter.routes();
}
// 将函数暴露出去 
module.exports = initRouter;