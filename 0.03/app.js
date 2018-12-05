const express = require("express");
const artTemplate = require("express-art-template");

const app  = express();

// 绑定引擎
app.engine('html', artTemplate);

// 渲染首页
app.get('/',(req,res)=>{

   res.render('index.html',{
   	title:"我还是标题",
   	list:[
	  {
	    id:1,
	    name:"不才",
	    content:"寒假以后，我遇见了这样一位大学教授，高大壮硕，行动从容，微微含笑，为我们讲授诗词，因为曾经是体育系的，他看起来不同一般的中文系气质。每个周末，我们都要到老师家里上课，大家围着餐桌，并不用餐，而是解说一首诗或者一阕词。看见他朗然笑语，喷吐烟雾，我悄悄想着，这就是一个伟岸男子了吧？四十岁的老师，当时在学术界是很活跃的，意气风发，锋芒耀眼，上他的课，却从未停止兴味盎然地观看着他和他和家庭。",
	    date:(new Date("2018-9-23")).getTime()
	  },
	  {
	    id:2,
	    name:"拉拉",
	    content:"他有一个同样在大学里教书的妻子，两个儿子。",
	    date:(new Date("2018-12-23")).getTime()
	  },
	  {
	    id:3,
	    name:"WuXin",
	    content:"那一天，我去得很早，从头到尾，想着或许我可以帮什么忙。但，我能帮什么忙？告别仪式中，扩音器里播放的是费玉清缭绕若丝的美声：“妹妹啊妹妹，你松开我的手，我不能跟你走……”",
	    date:(new Date("2008-07-30")).getTime()
	  },
	  {
	    id:4,
	    name:"0.0",
	    content:"这一年，我已经在大学里专任了第十一个年头了，即将跨入40岁。生活忽然繁忙起来，广播、电视和应接不暇的演讲，但我尽量不让其他杂务影响了教学，总是抱着欣然的情绪走进教室，面对着那些等待着的眼睛。特别是为法商学院的学生开设的通识课程，在许多与生命相关的议题里，我每每期待着能将自己或者是他们带来一个意想不到的地方去。",
	    date:(new Date("2017-2-3")).getTime()
	  }
	],
	date : (time)=>{
		return new Date(time)
	}
   })
})

// 监听前台的message post请求

app.post('/message',(req,res)=>{
	let postdata = "";
	req.once('data',(data)=>{
		postdata += data;
	});
	req.once('end',()=>{
		res.send(postdata);
	});
});

// 托管静态文件 监听 /public 开头的请求
app.use('/public',express.static('public'))

app.listen(2223,()=>{
	console.log('http://localhost:2223')
})