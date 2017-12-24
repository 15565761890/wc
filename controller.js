var fs = require('fs');
function addMapping(router,mapping) {
	for (var url in mapping) {
		if (url.startsWith('GET')) {
			//如果url类似GET ***
			var path = url.substring(4);
			router.get(path,mapping[url]);
			console.log(`register URL mapping:GET ${path}`);
		} else if (url.startsWith('POST')) {
			var path = url.substring(5);
			router.post(path,mapping[url]);
			console.log(`register URL mapping: POST ${path}`);
		} else if (url.startsWith('PUT')) {
			var path = url.substring(4);
			router.put(path,mapping[url]);
			console.log(`register URL mapping: PUT ${path}`);
		} else if (url.startsWith('DELETE')) {
			var path = url.substring(7);
			router.del(path,mapping[url]);
			console.log(`register URL mapping: DELETE ${path}`);
		}else {
			console.log(`invalid URL :${url}`);
		}
		
	}
}
function addControllers(router,dir) {
	//使用sync是因为启动时只用一次，不存在性能问题
	fs.readdirSync(__dirname + '/'+ dir).filter((f) => {
		//过滤出.js文件
		return f.endsWith('.js');
	}).forEach((f) => {
		console.log(`process controller:${f}...`);
		//导入js文件
		let mapping = require(__dirname + '/' + dir + '/' + f);
		addMapping(router,mapping);
	});
}
//上传文件
function addUploadFile(router) {
	//文件上传
	const multer = require('koa-multer');
	//配置
	var dataUrl = "";
	var storage = multer.diskStorage({
		//文件保存路径
		destination:function (req,file,cb) {
			var fileFm = (file.originalname).split(".");
			if (fileFm[fileFm.length-1] == "mp3") {
				cb(null,'./public/uploads/mp3/');
				dataUrl = 'public/uploads/mp3/';
			} else if (fileFm[fileFm.length-1] == "jpg" || fileFm[fileFm.length-1] == "png") {
				cb(null,'./public/uploads/img/');
				dataUrl = 'public/uploads/img/';
			} else if (fileFm[fileFm.length-1] == "mp4") {
				cb(null,'./public/uploads/mp4/');
				dataUrl = 'public/uploads/mp4/';
			} else if (fileFm[fileFm.length-1] == "docx" || fileFm[fileFm.length-1] == "txt" || fileFm[fileFm.length-1] == "doc") {
				cb(null,'./public/uploads/doc/');
				dataUrl = 'public/uploads/doc/';
			} else {
				cb(null,'./public/uploads/others/')
				dataUrl = 'public/uploads/others/';
			}
		},
		filename:function (req,file,cb){
			var fileFormat = (file.originalname).split(".");
			cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
		},
	})
	var upload = multer({storage:storage});
	//upload.single('file')这里面的file是上传空间的name<input type="file" name="file"/>  
	router.post('/uploadFile',upload.single('file'),async (ctx,next) => {
		ctx.response.type="text/json";
		//console.log(dataUrl+ ctx.req.file.filename + "------------------------");
		//var data = (ctx.req.file.path).replace(/\\/g,'/');;
		var data = dataUrl+ ctx.req.file.filename;
		//var data = "123";
		ctx.response.body={'success': 1, 'data': data};
	});
	console.log(`register URL mapping: POST /uploadFile`);
}
module.exports = function (dir) {
	let controllers_dir = dir || 'controllers',
		router = require('koa-router')();
	addControllers(router,controllers_dir);
	addUploadFile(router);
	return router.routes();
};
