废话不多说，直接开始了

## 首先搭建好目录结构
> modules 自定义模块文件夹
views 视图目录
public 公共资源目录
routers 路由组件 暂时为空
app.js nodejs 项目入口文件
其他 就不说了
配上一张图
![留言板](http://bucai-blog.oss-cn-beijing.aliyuncs.com/18-12-4/23402942.jpg)

## 视图

随便写了个界面 在views/index.html
![留言板](http://bucai-blog.oss-cn-beijing.aliyuncs.com/18-12-4/21519214.jpg)
这里的添加操作是通过 ajax请求 而不是服务端渲染的

## NodeJs 端
 nodejs 通过 http模块 创建一个服务器
const server = http.createServer();
 
同时创建一个监听事件服务用于分发路由 （有点难受这个分发 不过算是实现了一点）

然后监听 **request 请求** 事件
> 路由分发逻辑
```javascript
  // 获取url 用于判断 路由。。。
  const {url:req_url} = req;
  // console.log(req_url)
  // 解析url 获取路径名 pathname （用于过滤get参数）
  const {pathname} = new url.parse(req_url,true);
  /* 
判读路径是否是public
如果是就是静态资源
就触发 静资源的路由处理器 其他同理 
如果是 直接的路由名 就直接触发该路由的监听事件
 */
  if(pathname.indexOf("/public") == 0){

    httpEvent.emit("public", { req, res });

  }else{

    httpEvent.emit(pathname, { req, res });

  }

```

==添加评论我直接是发送什么返回什么 没有多余的处理==

全部代码 github