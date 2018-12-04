const http = require("http");
const events = require('events');
const path = require('path');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

const contentTypes = require('./modules/contentTypes.js');

const server = http.createServer();
const httpEvent = new events.EventEmitter();

httpEvent.addListener('public', ({req,res})=>{
  const {url} = req;
  const extname = path.extname(url);

  if(extname){
    const type = contentTypes[extname];
    res.writeHead(200, {
        'content-type': type
    });

    fs.readFile(path.join(__dirname, url), (err,data)=>{
      console.log(err)
      res.end(data);
    });

  }else{

    res.writeHead(404);

  }
  
});

httpEvent.addListener('/', ({req,res})=>{

  const type = contentTypes['.html'];
    res.writeHead(200, {
      'content-type': type
  });

  fs.readFile(path.join(__dirname, "views","index.html"), (err,data)=>{
    // console.log(err)
    res.end(data);
  });

});

httpEvent.addListener('/one', ({req,res})=>{

  const type = contentTypes['.html'];
    res.writeHead(200, {
      'content-type': type
  });

  const query = url.parse(req.url,true).query;

  console.log(query)
  fs.readFile(path.join(__dirname, "views","one.html"),"utf-8", (err,data)=>{
    // console.log(err)
    res.end(data.toString().replace("*^^*","动态数据展示 id："+query.id));
  });

});


httpEvent.addListener('/message', ({req,res})=>{
  
  if(req.method == "POST"){
    res.writeHead(200,{
      'content-type':"application/json;charset=utf-8"
    }); 
    // 
    let dataA = "";
    req.once('data', data => {

       dataA+=data.toString();
       // es.end("1231");

    })
    req.once('end', function(){
      
      res.write(dataA);
      res.end();

    });
  }else{
    res.statusCode = 404;
    res.setHeader("content-Type","text/plug");
  }


});

// httpEvent.addListener('*', ({req,res})=>{
//   // res.end("--home")
// });

// httpEvent.addListener('*', ({req,res})=>{
//   res.setHeader("content-Type","text/html;charset=utf-8");
// });

server.on('request', (req, res) => {

  const {url:req_url} = req;
  console.log(req_url)
  const {pathname} = new url.parse(req_url,true);

  console.log(pathname,"==")

  if(pathname.indexOf("/public") == 0){

    httpEvent.emit("public", { req, res });

  } else{

    httpEvent.emit(pathname, { req, res });

  }


});

server.listen(2221,()=>{

	console.error("http://localhost:2221");

});