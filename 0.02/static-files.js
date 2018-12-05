const path = require('path');
const fs = require('fs');

function static_files_fun (url, dir) {
	console.log(url,dir,"-===")

	return async (ctx,next)=>{

		const rpath = ctx.url;

		console.log(rpath)

		if(rpath.startsWith(url)){
			console.log(path.join(dir,rpath.substring(url.length)))
			const file_path = path.join(dir,rpath.substring(url.length));
		
			try {

				const data = fs.readFileSync(file_path);
				
				ctx.status = 200;
				
				ctx.type = ctx.accepts(file_path.substring(file_path.lastIndexOf('.')+1));
				
				ctx.body = data;

			} catch(e) {
				// statements
				console.log("文件不存在");

			};

		}else{
			await next();
		}

	};
   

}

module.exports = static_files_fun;