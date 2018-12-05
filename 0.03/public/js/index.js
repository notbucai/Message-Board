

function Message(el) {
	this.el = $(el);

	this.__dataList = null;

	Object.defineProperty(this, 'dataList', {
		set:(value)=>{
			// console.log(this)
			this.__dataList = value;
			this.init(value);
		},
		get:()=>{
			return this.__dataList;
		}
	});
}

Message.prototype.init = function(testData){

	this.el.html();
	let dataHtml ="";
	try {
		// console.log(testData)
		for (li of testData) {
			// console.log(li)
			dataHtml+=this.templListFun(li);

		}

		this.el.html(dataHtml);

	} catch(e) {
		console.error("数据出错，无法解析！")
	}

};

Message.prototype.templListFun = ({title,date,content,name})=>{


	const templ_list = `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${name}</h5>
            <small>${new Date(date)}</small>
          </div>
          <p class="mb-1">${content}</p>
        </a>`;

    return templ_list;
}

((window)=>{

	const testData = [
		{
			id:0,
			name:"不才",
			time:"2018-8-3",
			content:"我是一只小小小小鸟，怎么飞也飞不高"
		},
		{
			id:1,
			name:"无心",
			time:"2018-5-3",
			content:"此事件在选项卡显示时触发，但在显示新选项卡之前。使用event.target和event.relatedTarget分别定位活动选项卡和上一个活动选项卡（如果可用）。"
		},
		{
			id:2,
			name:"你才啊",
			time:"2018-2-3",
			content:"	显示选项卡后，此事件将在选项卡显示中触发。使用event.target和event.relatedTarget分别定位活动选项卡和上一个活动选项卡（如果可用）。"
		},
	];


	const message = window.msg = new Message("#content_list");

	/*$.ajax({
		url: '/list',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		console.log(data);

		message.dataList = data;
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});*/
	

	$("#form").on('submit', function(event) {
		event.preventDefault();
		// console.log(1123)
        const formData = $(this).serializeArray();
        let formDataOne = {};
        $.each(formData, function(index, {name, value}) {

           formDataOne[name] = value;

        });

        // console.log(formDataOne)

        $.ajax({
        	url: '/message',
        	type: 'POST',
        	dataType: 'json',
        	data: JSON.stringify(formDataOne),
        	contentType: "application/json; charset=utf-8",
        })
        .done(function(data) {
        	// console.log("success");
        	// console.log(data)
        	console.log(message.dataList)

        	$("input[name=name]").val("");
        	$("textarea[name=content]").val("");

        	message.dataList = [data,...(message.dataList||[])];
        })
        .fail(function() {
        	console.log("error");
        })
        .always(function() {
        	console.log("complete");
        });
        
	});
	
	// const templListFun = ({title,time,content,name})=>{

	// 	const templ_list = `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
 //              <div class="d-flex w-100 justify-content-between">
 //                <h5 class="mb-1">${name}</h5>
 //                <small>${time}</small>
 //              </div>
 //              <p class="mb-1">${content}</p>
 //            </a>`;
 //        return templ_list;
	// }

	// for (li of testData) {
	// 	$("#content_list").append(templListFun(li))
	// }

})(window)
