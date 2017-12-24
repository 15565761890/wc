var query = require('../configMysql');
var fn_testMysql = async(ctx,next) => {
    var strSql = "select * from ";
    var tabs = ctx.request.header.tabs;
    strSql += tabs;
    console.log(tabs);
    //console.log(ctx.request.header.condition);
    ctx.response.type="text/json";
    var results = await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
                if (err) {
                   reject("{ 'success': 0, 'error':"+err.message +"}");
                } else if (datas.length == 0) {
                    reject("{ 'success': 0, 'error':'没有找到要修改的数据'}");
                }
                resolve(datas);
            })
    });
    ctx.response.body = { 'success': 1, 'data': results };
    /*var results = await query(strSql,function (err,datas) {
        if (err) {
            console.log('1');
           ctx.response.body = { 'success': 0, 'error': err.message };
        } else if (datas.length == 0) {
            console.log('2');
            ctx.response.body = { 'success': 0, 'error': '没有找到要修改的数据' };
        }
        //console.log('111');
        //ctx.response.body = { 'success': 1, 'data': datas }
        //console.log(ctx.response.body );
        return  { 'success': 1, 'data': datas };
    });
    ctx.response.body = results;
    console.log(results);
    console.log(ctx.response.body);*/
};
fn_testPost = async(ctx,next) =>{
    var strSql = "select * from students";
    console.log(ctx.request);
    //console.log(ctx.request.header);
    var results = await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
                if (err) {
                    ctx.response.body = { 'success': 0, 'error': err.message };
                } else if (datas.length == 0) {
                    ctx.response.body = { 'success': 0, 'error': '没有找到要修改的数据'};
                }
                resolve(datas);
            })
    });
    ctx.response.type="text/json";
    ctx.response.body = { 'success': 1, 'data': results }
};
/*var fn_index = async (ctx,next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="jym"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

var fn_signin = async (ctx,next) => {
     var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'jym' && password === '123456') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};

module.exports = {
    'GET /test':fn_index,
    'POST /signin':fn_signin
};*/
module.exports = {
	'GET /index':async (ctx,next) => {
		ctx.render('index.html',{
			name:'Welcome'
		});
	},
	'GET /testMvvm':async (ctx,next) => {
		 ctx.response.redirect('../static/index.html'); 
	},
    //'GET /testMysql':fn_testMysql,
    'GET /testMysql':fn_testMysql,
    'POST /testPost':fn_testPost,
    'GET /indexT':async (ctx,next) => {
        ctx.response.redirect('../static/index.html'); 
        //ctx.response.body='../static/index.html';
    }
}
