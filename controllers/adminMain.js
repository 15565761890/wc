var query = require('../configMysql');
var varify = require('../js/varify');
//管理员登录
var fn_adminLogin = async(ctx,next) => {
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
        var true_name = ctx.request.body.name;
        var password = ctx.request.body.password;
        var strSql = 'select password from member where true_name = "'+true_name+'"';
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
        
        if(results[0].password == password) {
            console.log('登录成功');
            console.log(results[0].password);
            ctx.response.body= { 'success': 1, 'data': results};
        } else {
            ctx.response.body= { 'success': 0, 'error': '密码错误，请从新输入！' };
        }
        
    } else if (flag == 'false'){
        ctx.response.body= { 'success': 0, 'error': '非法请求！' };
    }
}
//更改管理员密码
var fn_changeAdminPassword = async(ctx,next) => {
    ctx.response.type="text/json";
    var password1 = ctx.request.body.password1;
    var password2 = ctx.request.body.password2;
    var password3 = ctx.request.body.password3;
    var true_name = ctx.request.body.name;
    var strSql = 'select password,id from member where true_name = "'+true_name+'";';
    var results = await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
            if (err) {
                reject("{ 'success': 0, 'error':"+err.message +"}");
            } else if (datas.length == 0) {
                reject("{ 'success': 0, 'error':'没有找到想要的数据'}");
            }
            resolve(datas);
        });
    });
    var id = results[0].id;
    if(results[0].password == password1) {
        var strSqlUpdate = 'update member set password = "'+password2+'" where id = '+id+';';
        console.log(strSqlUpdate);
        var resu =  await new Promise(function (resolve,reject) {
            query(strSqlUpdate,function (err,datas) {
                if (err) {
                    reject("{ 'success': 0, 'error':"+err.message +"}");
                } else if (datas.changedRows == 0) {
                    reject("{ 'success': 0, 'error':'没有找到要修改的数据'}");
                }
                resolve(datas);
            });
        });
        ctx.response.body= { 'success': 1, 'data': resu};
    } else {
        ctx.response.body= { 'success': 0, 'error': '非法请求！' };
    }
     
}
//获取所有的单品
var fn_getItemAll =  async(ctx,next) => {
    ctx.response.type="text/json";
    var strSql = 'select id,article_name,state,price_free,price,type,type_item from article  where type_item BETWEEN 1 AND 3';
    var startIndex = ctx.request.body.startIndex,
    pageSize = ctx.request.body.pageSize,
    sorting = ctx.request.body.sorting;
    if (sorting != "" && sorting != null) {
        strSql += ' order by '+sorting;
    }
    if (pageSize != "" && pageSize != null && startIndex != "" && startIndex != null) {
        strSql += ' limit '+startIndex+', '+pageSize;
    }
    var results =  await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
            if (err) {
                reject("{ 'success': 0, 'error':"+err.message +"}");
            }
            resolve(datas);
        });
    });
    var count =  await new Promise(function (resolve,reject) {
        query('select Count(*) from article',function (err,datas) {
            if (err) {
                reject("{ 'success': 0, 'error':"+err.message +"}");
            }
            resolve(datas[0]);
        });
    });
    ctx.response.body= { 'success':1 , 'data': results,'total':count};
}
//删除一个单品
var fn_deleteItemOne = async (ctx,next) => {
    ctx.response.type="text/json";
    var id = ctx.request.body.id;
    var strSql = 'delete from article where id = '+id;
    var results =  await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
            if (err) {
                reject("{ 'success': 0, 'error':"+err.message +"}");
            }
            if (datas.affectedRows == 0) {
                reject("{ 'success': 0, 'error':'没有找到要删除的数据'}");    
            }
            resolve(datas);
        });
    });
    ctx.response.body= { 'success': 1,'data':results.affectedRows};
}
//获得一个单品的所有信息
var fn_getItemOne = async (ctx,next)=> {
    ctx.response.type="text/json";
    var id = ctx.request.query.id;
    var strSql = 'select * from article where id = '+id;
    var results =  await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
            if (err) {
                reject("{ 'success': 0, 'error':"+err.message +"}");
            }
            var da = datas[0];
            if (da == undefined || da == null) {
                reject("{'success'0,'error':'该数据不存在！'}");
            }
            resolve(datas);
        });
    });
    ctx.response.body= { 'success': 1,'data':results};
}
//音频上传
var fn_YpUploadAll = async(ctx,next) => {
    ctx.response.type="text/json";
    var strSql = "";
    var str = "";
    var strVlaue = "";
    var YpName = ctx.request.body.YpName;
    if (YpName != null && YpName != "") {
        str += 'article_name,';
        strVlaue += '"'+YpName+'",';
    } else {
        ctx.response.body={ 'success': 0, 'error': '音频名称必须填写！' };
        return;
    }
    var uploadYpUrl1 = ctx.request.body.uploadYpUrl1;//音频
    if (uploadYpUrl1 != null && uploadYpUrl1 != "") {
        str += 'profile,'
        strVlaue += '"'+uploadYpUrl1+'",';
    } else {
        ctx.response.body={ 'success': 0, 'error': '音频必须上传！' };
        return;
    }
    var uploadYpUrl2 = ctx.request.body.uploadYpUrl2;//音频封面
    if (uploadYpUrl2 != null && uploadYpUrl2 != "") {
        str += 'front_cover,';
        strVlaue += '"'+uploadYpUrl2+'",';
    }else {
        ctx.response.body = {'success':0,'error':'音频封面必须上传'};
        return;
    }
    var detail = ctx.request.body.detail;
    if (detail != null && detail != "") {
        str += 'details,';
        strVlaue += "'"+detail+"',"
    } else {
        ctx.response.body = {'success':0,'errror':'文章内容必须填写！'};
        return;
    }
    var uploadYpUrl3 = ctx.request.body.uploadYpUrl3;//
    if (uploadYpUrl3 != null && uploadYpUrl3 != "") {
        str += 'yp_tw_try,';
        strVlaue += '"'+uploadYpUrl3+'",';
    } else {
        ctx.response.body = {'success':0,'error':'试听音频必须上传！'}
        return;
    }
    var priceOrFree = ctx.request.body.priceOrFree;//是否免费1:免费2：付费
    var price = ctx.request.body.price;
    if (priceOrFree != null && priceOrFree != "") {
        str += 'price_free,'
        strVlaue += '"'+priceOrFree+'",';
        if (priceOrFree != '1') {
            if (price != null && price != "") {
                str += 'price,'
                strVlaue += '"'+price+'",';
            }else {
                ctx.response.body = {'success':0,'error':'你已经设置文章为付费，请设置金额！'}
                return;
            }
        }
        
    } else {
        ctx.response.body = {'success':0,'error':'请设置文章是否免费！'};
        return;
    }
    var type = ctx.request.body.type;
    if (type != null && type != "") {
        str += 'type,';
        strVlaue += '"'+type+'",';
    } else {
        ctx.response.body = {'success':0,'error':'请设置文章的所属类别，可以多选！'};
        return;
    }
    var type_item = '1';
    str += 'type_item,';
    strVlaue += '"'+type_item+'",'
    var state = ctx.request.body.state;
    if (state != undefined && state != "") {
        str += 'state';
        strVlaue += '"'+state+'"';
    } else {
        ctx.response.body = {'success':0,'error':'请设置是否上架！'};
        return;
    }
    strSql = 'insert into article('+str+') values('+strVlaue+')';
    //console.log(strSql);
    var results =  await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
            if (err) {
                reject("{ 'success': 0, 'error':"+err.message +"}");
            }
            resolve(datas);
        });
    });
    ctx.response.body= { 'success': 1, 'data': results};
}
//音频修改
fn_YpUploadAllChange =async (ctx,next) => {
    ctx.response.type="text/json";
    var strSql = "";
    var str = "";
    var YpName = ctx.request.body.YpName;
    if (YpName != null && YpName != "") {
        str += 'article_name="'+YpName+'",';
    } else {
        ctx.response.body={ 'success': 0, 'error': '音频名称必须填写！' };
        return;
    }
    var uploadYpUrl1 = ctx.request.body.uploadYpUrl1;//音频
    if (uploadYpUrl1 != null && uploadYpUrl1 != "") {
        str += 'profile="'+uploadYpUrl1+'",';
    } else {
        ctx.response.body={ 'success': 0, 'error': '音频必须上传！' };
        return;
    }
    var uploadYpUrl2 = ctx.request.body.uploadYpUrl2;//音频封面
    if (uploadYpUrl2 != null && uploadYpUrl2 != "") {
        str += 'front_cover="'+uploadYpUrl2+'",';
    }else {
        ctx.response.body = {'success':0,'error':'音频封面必须上传'};
        return;
    }
    var detail = ctx.request.body.detail;
    if (detail != null && detail != "") {
        str += "details='"+detail+"',";
    } else {
        ctx.response.body = {'success':0,'errror':'文章内容必须填写！'};
        return;
    }
    var uploadYpUrl3 = ctx.request.body.uploadYpUrl3;//
    if (uploadYpUrl3 != null && uploadYpUrl3 != "") {
        str += 'yp_tw_try="'+uploadYpUrl3+'",';
    } else {
        ctx.response.body = {'success':0,'error':'试听音频必须上传！'}
        return;
    }
    var priceOrFree = ctx.request.body.priceOrFree;//是否免费1:免费2：付费
    var price = ctx.request.body.price;
    if (priceOrFree != null && priceOrFree != "") {
        str += 'price_free="'+priceOrFree+'",';
        if (priceOrFree != '1') {
            if (price != null && price != "") {
                str += 'price="'+price+'",';
            }else {
                ctx.response.body = {'success':0,'error':'你已经设置文章为付费，请设置金额！'}
                return;
            }
        }
    } else {
        ctx.response.body = {'success':0,'error':'请设置文章是否免费！'};
        return;
    }
    var type = ctx.request.body.type;
    if (type != null && type != "") {
        str += 'type="'+type+'",';
    } else {
        ctx.response.body = {'success':0,'error':'请设置文章的所属类别，可以多选！'};
        return;
    }
    var type_item = '1';
    str += 'type_item="'+type_item+'",';
    var state = ctx.request.body.state;
    if (state != undefined && state != "") {
        str += 'state="'+state+'"';
    } else {
        ctx.response.body = {'success':0,'error':'请设置是否上架！'};
        return;
    }
    var id = ctx.request.body.id;
    strSql += ' update article set '+str+' where id = '+id+';';
    var results =  await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
            if (err) {
                reject("{ 'success': 0, 'error':"+err.message +"}");
            }
            /*if(datas.changedRows == 0) {
                reject("{ 'success': 0, 'error':'没有找到要修改的数据！'}");
            }*/
            resolve(datas);
        });
    });
    
    ctx.response.body= { 'success': 1, 'data': results};
}
//图文上传
var fn_TwUploadAll = async(ctx,next) => {
    ctx.response.type="text/json";
    var strSql = "";
    var str = "";
    var strVlaue = "";
    var TwName = ctx.request.body.TwName;
    if (TwName != undefined && TwName != "") {
        str += 'article_name,';
        strVlaue += '"'+TwName+'",';
    } else {
        ctx.response.body={ 'success': 0, 'error': '音频名称必须填写！' };
        return;
    }
    var uploadTwUrl1 = ctx.request.body.uploadTwUrl1;//图文封面
    if (uploadTwUrl1 != undefined && uploadTwUrl1 != "") {
        str += 'front_cover,'
        strVlaue += '"'+uploadTwUrl1+'",';
    } else {
        ctx.response.body={ 'success': 0, 'error': '图文封面必须上传！' };
        return;
    }
    /*var uploadYpUrl2 = ctx.request.body.uploadYpUrl2;//音频封面
    if (uploadYpUrl2 != null && uploadYpUrl2 != "") {
        str += 'front_cover,';
        strVlaue += '"'+uploadYpUrl2+'",';
    }else {
        ctx.response.body = {'success':0,'error':'音频封面必须上传'};
        return;
    }*/
    var detail = ctx.request.body.detail;
    if (detail != undefined && detail != "") {
        str += 'details,';
        strVlaue += "'"+detail+"',"
    } else {
        ctx.response.body = {'success':0,'errror':'图文内容必须填写！'};
        return;
    }
    var detailTry = ctx.request.body.detailTry;
    if (detailTry != undefined && detailTry != "") {
        str += 'yp_tw_try,';
        strVlaue += "'"+detailTry+"',"
    } else {
        ctx.response.body = {'success':0,'errror':'图文试看内容必须填写！'};
        return;
    }
    /*var uploadYpUrl3 = ctx.request.body.uploadYpUrl3;//
    if (uploadYpUrl3 != null && uploadYpUrl3 != "") {
        str += 'yp_tw_try,';
        strVlaue += '"'+uploadYpUrl3+'",';
    } else {
        ctx.response.body = {'success':0,'error':'试听音频必须上传！'}
        return;
    }*/
    var priceOrFree = ctx.request.body.priceOrFree;//是否免费1:免费2：付费
    var price = ctx.request.body.price;
    if (priceOrFree != undefined && priceOrFree != "") {
        str += 'price_free,'
        strVlaue += '"'+priceOrFree+'",';
        if (priceOrFree != '1') {
            if (price != undefined && price != "") {
                str += 'price,'
                strVlaue += '"'+price+'",';
            }else {
                ctx.response.body = {'success':0,'error':'你已经设置文章为付费，请设置金额！'}
                return;
            }
        }
    } else {
        ctx.response.body = {'success':0,'error':'请设置文章是否免费！'};
        return;
    }
    var type = ctx.request.body.type;
    if (type != undefined && type != "") {
        str += 'type,';
        strVlaue += '"'+type+'",';
    } else {
        ctx.response.body = {'success':0,'error':'请设置文章的所属类别，可以多选！'};
        return;
    }
    var type_item = '3';
    str += 'type_item,';
    strVlaue += '"'+type_item+'",'
    var state = ctx.request.body.state;
    if (state != undefined && state != "") {
        str += 'state';
        strVlaue += '"'+state+'"';
    } else {
        ctx.response.body = {'success':0,'error':'请设置是否上架！'};
        return;
    }
    strSql = 'insert into article('+str+') values('+strVlaue+')';
    //console.log(strSql);
    var results =  await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
            if (err) {
                reject("{ 'success': 0, 'error':"+err.message +"}");
            }
            resolve(datas);
        });
    });
    ctx.response.body= { 'success': 1, 'data': results};
}
//图文修改
var fn_TwUploadAllChange = async(ctx,next) => {
    ctx.response.type="text/json";
    var strSql = "";
    var str = "";
    var TwName = ctx.request.body.TwName;
    if (TwName != undefined && TwName != "") {
        str += 'article_name="'+TwName+'",';
    } else {
        ctx.response.body={ 'success': 0, 'error': '音频名称必须填写！' };
        return;
    }
    var uploadTwUrl1 = ctx.request.body.uploadTwUrl1;//图文封面
    if (uploadTwUrl1 != undefined && uploadTwUrl1 != "") {
        str += 'front_cover="'+uploadTwUrl1+'",';
    } else {
        ctx.response.body={ 'success': 0, 'error': '图文封面必须上传！' };
        return;
    }
    var detail = ctx.request.body.detail;
    if (detail != undefined && detail != "") {
        str += 'details="'+detail+'",';
    } else {
        ctx.response.body = {'success':0,'errror':'图文内容必须填写！'};
        return;
    }
    var detailTry = ctx.request.body.detailTry;
    if (detailTry != undefined && detailTry != "") {
        str += 'yp_tw_try="'+detailTry+'",';
    } else {
        ctx.response.body = {'success':0,'errror':'图文试看内容必须填写！'};
        return;
    }
    var priceOrFree = ctx.request.body.priceOrFree;//是否免费1:免费2：付费
    var price = ctx.request.body.price;
    if (priceOrFree != undefined && priceOrFree != "") {
        str += 'price_free="'+priceOrFree+'",'
        if (priceOrFree != '1') {
            if (price != undefined && price != "") {
                str += 'price="'+price+'",';
            }else {
                ctx.response.body = {'success':0,'error':'你已经设置文章为付费，请设置金额！'}
                return;
            }
        }
    } else {
        ctx.response.body = {'success':0,'error':'请设置文章是否免费！'};
        return;
    }
    var type = ctx.request.body.type;
    if (type != undefined && type != "") {
        str += 'type="'+type+'",';
    } else {
        ctx.response.body = {'success':0,'error':'请设置文章的所属类别，可以多选！'};
        return;
    }
    var type_item = '3';
    str += 'type_item="'+type_item+'",';
    var state = ctx.request.body.state;
    if (state != undefined && state != "") {
        str += 'state="'+state+'"';
        //strVlaue += '"'+state+'"';
    } else {
        ctx.response.body = {'success':0,'error':'请设置是否上架！'};
        return;
    }
    var id = ctx.request.body.id;
    strSql = 'update article set '+str+' where id = '+id+';';
    console.log(strSql);
    var results =  await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
            if (err) {
                reject("{ 'success': 0, 'error':"+err.message +"}");
            }
            /*if(datas.changedRows == 0) {
                reject("{ 'success': 0, 'error':'没有找到要修改的数据！'}");
            }*/
            resolve(datas);
        });
    });
    ctx.response.body= { 'success': 1, 'data': results};
}
//视频上传
var fn_SpUploadAll = async(ctx,next) => {
    ctx.response.type="text/json";
    var strSql = "";
    var str = "";
    var strVlaue = "";
    var SpName = ctx.request.body.SpName;
    if (SpName != undefined && SpName != "") {
        str += 'article_name,';
        strVlaue += '"'+SpName+'",';
    } else {
        ctx.response.body={ 'success': 0, 'error': '视频名称必须填写！' };
        return;
    }
    var uploadSpUrl1 = ctx.request.body.uploadSpUrl1;//视频
    if (uploadSpUrl1 != null && uploadSpUrl1 != "") {
        str += 'profile,'
        strVlaue += '"'+uploadSpUrl1+'",';
    } else {
        ctx.response.body={ 'success': 0, 'error': '音频必须上传！' };
        return;
    }
    var uploadSpUrl2 = ctx.request.body.uploadSpUrl2;//视频封面
    if (uploadSpUrl2 != undefined && uploadSpUrl2 != "") {
        str += 'front_cover,';
        strVlaue += '"'+uploadSpUrl2+'",';
    }else {
        ctx.response.body = {'success':0,'error':'视频封面必须上传'};
        return;
    }
    var uploadSpUrl3 = ctx.request.body.uploadSpUrl3;//视频贴片
    if (uploadSpUrl3 != undefined && uploadSpUrl3 != "") {
        str += 'item_sp_patch,';
        strVlaue += '"'+uploadSpUrl3+'",';
    } else {
        ctx.response.body = {'success':0,'error':'视频贴片必须上传！'}
        return;
    }
    var detail = ctx.request.body.detail;
    if (detail != null && detail != "") {
        str += 'details,';
        strVlaue += "'"+detail+"',"
    } else {
        ctx.response.body = {'success':0,'errror':'视频内容必须填写！'};
        return;
    }
    
    var priceOrFree = ctx.request.body.priceOrFree;//是否免费1:免费2：付费
    var price = ctx.request.body.price;
    if (priceOrFree != null && priceOrFree != "") {
        str += 'price_free,'
        strVlaue += '"'+priceOrFree+'",';
        if (priceOrFree != '1') {
            if (price != null && price != "") {
                str += 'price,'
                strVlaue += '"'+price+'",';
            }else {
                ctx.response.body = {'success':0,'error':'你已经设置视频为付费，请设置金额！'}
                return;
            }
        }
    } else {
        ctx.response.body = {'success':0,'error':'请设置视频是否免费！'};
        return;
    }
    var type = ctx.request.body.type;
    if (type != null && type != "") {
        str += 'type,';
        strVlaue += '"'+type+'",';
    } else {
        ctx.response.body = {'success':0,'error':'请设置视频的所属类别，可以多选！'};
        return;
    }
    var type_item = '2';
    str += 'type_item,';
    strVlaue += '"'+type_item+'",'
    var state = ctx.request.body.state;
    if (state != undefined && state != "") {
        str += 'state';
        strVlaue += '"'+state+'"';
    } else {
        ctx.response.body = {'success':0,'error':'请设置是否上架！'};
        return;
    }
    strSql = 'insert into article('+str+') values('+strVlaue+')';
    //console.log(strSql);
    var results =  await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
            if (err) {
                reject("{ 'success': 0, 'error':"+err.message +"}");
            }
            resolve(datas);
        });
    });
    ctx.response.body= { 'success': 1, 'data': results};
}
//视频修改
var fn_SpUploadAllChange =  async(ctx,next) => {
    ctx.response.type="text/json";
    var strSql = "";
    var str = "";
    var SpName = ctx.request.body.SpName;
    if (SpName != undefined && SpName != "") {
        str += 'article_name="'+SpName+'",';
    } else {
        ctx.response.body={ 'success': 0, 'error': '视频名称必须填写！' };
        return;
    }
    var uploadSpUrl1 = ctx.request.body.uploadSpUrl1;//视频
    if (uploadSpUrl1 != null && uploadSpUrl1 != "") {
        str += 'profile="'+uploadSpUrl1+'",';
    } else {
        ctx.response.body={ 'success': 0, 'error': '音频必须上传！' };
        return;
    }
    var uploadSpUrl2 = ctx.request.body.uploadSpUrl2;//视频封面
    if (uploadSpUrl2 != undefined && uploadSpUrl2 != "") {
        str += 'front_cover="'+uploadSpUrl2+'",';
    }else {
        ctx.response.body = {'success':0,'error':'视频封面必须上传'};
        return;
    }
    var uploadSpUrl3 = ctx.request.body.uploadSpUrl3;//视频贴片
    if (uploadSpUrl3 != undefined && uploadSpUrl3 != "") {
        str += 'item_sp_patch="'+uploadSpUrl3+'",';
    } else {
        ctx.response.body = {'success':0,'error':'视频贴片必须上传！'}
        return;
    }
    var detail = ctx.request.body.detail;
    if (detail != null && detail != "") {
        str += 'details="'+detail+'",';
    } else {
        ctx.response.body = {'success':0,'errror':'视频内容必须填写！'};
        return;
    }
    var priceOrFree = ctx.request.body.priceOrFree;//是否免费1:免费2：付费
    var price = ctx.request.body.price;
    if (priceOrFree != null && priceOrFree != "") {
        str += 'price_free="'+priceOrFree+'",';
        if (priceOrFree != '1') {
            if (price != null && price != "") {
                str += 'price="'+price+'",';
            }else {
                ctx.response.body = {'success':0,'error':'你已经设置视频为付费，请设置金额！'}
                return;
            }
        }
    } else {
        ctx.response.body = {'success':0,'error':'请设置视频是否免费！'};
        return;
    }
    var type = ctx.request.body.type;
    if (type != null && type != "") {
        str += 'type="'+type+'",';
    } else {
        ctx.response.body = {'success':0,'error':'请设置视频的所属类别，可以多选！'};
        return;
    }
    var type_item = '2';
    str += 'type_item="'+type_item+'",';
    var state = ctx.request.body.state;
    if (state != undefined && state != "") {
        str += 'state="'+state+'"';
    } else {
        ctx.response.body = {'success':0,'error':'请设置是否上架！'};
        return;
    }
    var id = ctx.request.body.id;
    strSql = 'update article set '+str+' where id = '+id;
    var results =  await new Promise(function (resolve,reject) {
        query(strSql,function (err,datas) {
            if (err) {
                reject("{ 'success': 0, 'error':"+err.message +"}");
            }
            resolve(datas);
        });
    });
    ctx.response.body= { 'success': 1, 'data': results};
}
module.exports = {
    'POST /adminLogin':fn_adminLogin,
    'POST /changeAdminPassword':fn_changeAdminPassword,
    'POST /getItemAll':fn_getItemAll,
    'DELETE /deleteItemOne':fn_deleteItemOne,
    'GET /getItemOne':fn_getItemOne,
    'POST /YpUploadAll':fn_YpUploadAll,
    'POST /YpUploadAllChange':fn_YpUploadAllChange,
    'POST /TwUploadAll':fn_TwUploadAll,
    'POST /TwUploadAllChange':fn_TwUploadAllChange,
    'POST /SpUploadAll':fn_SpUploadAll,
    'POST /SpUploadAllChange':fn_SpUploadAllChange
}