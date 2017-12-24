var query = require('../configMysql');
var varify = require('../js/varify');
var fn_getmastersSeries = async(ctx,next) => {
    var flag='';//验证的标识变量
    ctx.response.type="text/json";
    varify(ctx.request.header.password,function(data) {
        if(data == 'true') {
            flag='true';
        }else {
            flag='false';
        }
    });
    if(flag == 'true') {
        var articleType=ctx.request.body.articleType;
        var strSql = 'select * from article where type ='+articleType+';';
        var results = await new Promise(function (resolve,reject) {
            query(strSql,function (err,datas) {
                if (err) {
                    reject("{ 'success': 0, 'error':"+err.message +"}");
                } else if (datas.length == 0) {
                    reject("{ 'success': 0, 'error':'没有找到要修改的数据'}");
                }
                resolve(datas);
            });
        });
        ctx.response.body= { 'success': 1, 'data': results };
    } else if (flag == 'false'){
        ctx.response.body= { 'success': 0, 'error': '非法请求！' };
    }
}
var fn_get2017News = async(ctx,next) => {
    var flag='';//验证的标识变量
    ctx.response.type="text/json";
    varify(ctx.request.header.password,function(data) {
        if(data == 'true') {
            flag='true';
        }else {
            flag='false';
        }
    })
    if (flag == 'true') {
        var strSql = "select * from article";
        var results = await new Promise(function (resolve,reject) {
            query(strSql,function (err,datas) {
                if (err) {
                    reject("{ 'success': 0, 'error':"+err.message +"}");
                } else if (datas.length == 0) {
                    reject("{ 'success': 0, 'error':'没有找到要修改的数据'}");
                }
                resolve(datas);
            });
        });
        ctx.response.body= { 'success': 1, 'data': results };
    } else if (flag == 'false'){
        ctx.response.body= { 'success': 0, 'error': '非法请求！' };
    }
}
var fn_getPayForQuestionInfo = async(ctx,next)=> {
    ctx.response.type="text/json";
    var strSql = "select * from pay_for_q_a_info";
    var results = await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
            if (err) {
                reject("{ 'success': 0, 'error':"+err.message +"}");
            } else if (datas.length == 0) {
                reject("{ 'success': 0, 'error':'没有找到要修改的数据'}");
            }
            resolve(datas);
        });
    });
    ctx.response.body= { 'success': 1, 'data': results };
}
var fn_getInviteCode= async(ctx,next)=> {
    ctx.response.type="text/json";
    var list = ["5", "6", "8", "9"];
    var items = new Array();
    for (var i = 0; i < list.length; i++)
    {
        for (var x = 0; x < list.length; x++) {
            if (list[i] != list[x])
            {
                items.push("R" + list[i] + list[x] + list[i] + list[i] + list[i]);
                items.push("R" + list[i] + list[x] + list[i] + list[i] + list[x]);
                items.push("R" + list[i] + list[x] + list[i] + list[x] + list[i]);
                items.push("R" + list[i] + list[x] + list[i] + list[x] + list[x]);
                items.push("R" + list[i] + list[x] + list[x] + list[i] + list[i]);
                items.push("R" + list[i] + list[x] + list[x] + list[i] + list[x]);
                items.push("R" + list[i] + list[x] + list[x] + list[x] + list[i]);
                items.push("R" + list[i] + list[x] + list[x] + list[x] + list[x]);

                items.push("R" + list[i] + list[i] + list[i] + list[i] + list[x]);
                items.push("R" + list[i] + list[i] + list[i] + list[x] + list[i]);
                items.push("R" + list[i] + list[i] + list[i] + list[x] + list[x]);
                items.push("R" + list[i] + list[i] + list[x] + list[i] + list[i]);
                items.push("R" + list[i] + list[i] + list[x] + list[i] + list[x]);
                items.push("R" + list[i] + list[i] + list[x] + list[x] + list[i]);
                items.push("R" + list[i] + list[i] + list[x] + list[x] + list[x]);
            }
        }
    }
    ctx.response.body= { 'success': 1, 'str': items };
}
module.exports = {
    'GET /get2017News':fn_get2017News,
    'POST /getmastersSeries':fn_getmastersSeries,
    'GET /getPayForQuestionInfo':fn_getPayForQuestionInfo,
    'GET /getInviteCode':fn_getInviteCode
}
