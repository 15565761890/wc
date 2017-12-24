function TestOneMysql() {
	var tabs = $('#tabs').val();
	var condition = $('#condition').val();
	var str ='';
	$.ajax({
	    url: 'http://192.168.1.136:3000/testMysql',
	    type: 'GET',
	    dataType: 'json',
	    headers:{"tabs":tabs,"condition":condition},//不需要在跨域那里设置header
	    contentType: "application/json; charset=utf-8",
	    data: {},
	    success: function (data) {
	        if (data.success == 1) {
	            for(var i=0;i<data.data.length;i++) {
	            	str += '<span>id='+data.data[i].id+' studentName='+data.data[i].studentName+' sex='+data.data[i].sex+' score='+data.data[i].score+'<span>';
	            }
	            document.getElementById("myDiv").innerHTML = str;
	        } else {
	        	//http://192.168.1.136:3030/index
	        	alert("failed!");
	        }
	    },error: function (msg) { alert(msg); }
	});
}
function TestPostAjax() {
	var name = $('#name').val();
	var idCard = $('#idCard').val();
	var str='';
	var data=JSON.stringify({"name":name,"idCard":idCard});
	$.ajax({
		url:'http://192.168.1.136:3000/testPost',
		type:'POST',
		dataType:'json',
		//headers:{"tabs":tabs,"condition":condition},//不需要在跨域那里设置header
	    contentType: "application/json; charset=utf-8",
	    data: data,
	    success: function (data) {
	        if (data.success == 1) {
	            for(var i=0;i<data.data.length;i++) {
	            	str += '<span>id='+data.data[i].id+' studentName='+data.data[i].studentName+' sex='+data.data[i].sex+' score='+data.data[i].score+'<span>';
	            }
	            document.getElementById("myDiv").innerHTML = str;
	        } else {
	        	//http://192.168.1.136:3030/index
	        	alert(data.error);
	        }
	    },error: function (msg) { alert(msg); }
	});
}