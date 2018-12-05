module.exports = (req)=>{
	return new Promise((resolve,reject)=>{
		try {
			let postData = "";
			req.once('data',(data)=>{
				postData+=data;
			})
			req.on('end',()=>{
				resolve([null,postData])
			})
		} catch(e) {
			// statements
			resolve([e,null])
		}

	})
}