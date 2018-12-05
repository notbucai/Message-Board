const parsePostData = require('../modules/parsePostData.js');


const fn_message_post = async (ctx,next)=>{

	// console.log(ctx.req)

	let [error,result] = await parsePostData(ctx.req)

	if(error){
		ctx.body = {code:-1,message:error}
		return;
	}
	console.log(error,result)

	ctx.body = result;

	await next();
}


module.exports = {
	'POST /message': fn_message_post
}