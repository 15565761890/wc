var query = require('./configMysql');
var sqlStr = "select * from students";
query(sqlStr,function(err,datas) {
	if (err) {
        console.log("eroor:  "+err);
    }
    if (datas.changedRows == 0) {
        console.log("没有找到要修改的数据");
    }
    console.log(JSON.stringify(datas));
});