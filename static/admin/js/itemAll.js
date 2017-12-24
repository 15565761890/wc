//jtable
function getAllItemJtabl() {
    var cachedCityOptions = null;
    $('#result_content_table').jtable({
        title:'单品列表',
        paging:true,
        pageSize:1,
        sorting:true,
        selecting:true,
        defaultSorting: 'Name ASC',
        actions:{
            listAction:function (postData,jtParams) {
                console.log('loading');
                return $.Deferred(function ($dfd) {
                    var parms = {'startIndex':jtParams.jtStartIndex,'pageSize':jtParams.jtPageSize,'sorting':jtParams.jtSorting};
                    $.ajax({
                        url: serverApi+ 'getItemAll',// 服务端取值：request.query.name
                        type: 'POST',
                        dataType:"json",
                        data:parms,
                        success:function (data) {
                            if (data.success == 1) {
                                var jsonObj = {
                                    "Result":"OK",
                                    "Records":data.data,
                                    "TotalRecordCount":data.total["Count(*)"]
                                }
                                $dfd.resolve(jsonObj);
                            } else {
                                var jsonObj = {
                                    "Result": "ERROR",
                                    "Message": data.error
                                }
                                $dfd.resolve(jsonObj);    
                            }
                        },
                        error:function () {
                            $dfd.reject();
                        }
                    });
                });
            },
            deleteAction:function (postData) {
                console.log('deleting...');
                return $.Deferred(function ($dfd) {
                    var id = postData.id;
                    var parms = {'id':id};
                    $.ajax({
                        url: serverApi+ 'deleteItemOne',// 服务端取值：request.query.name
                        type: 'DELETE',
                        dataType:"json",
                        data:parms,
                        success:function (data) {
                            if (data.success == 1) {
                                var jsonObj = {
                                    "Result":"OK",
                                    "Records":data.data,
                                    "TotalRecordCount":1
                                }
                                $dfd.resolve(jsonObj);
                            } else {
                                var jsonObj = {
                                    "Result": "ERROR",
                                    "Message": data.error
                                }
                                $dfd.resolve(jsonObj);    
                            }
                        },
                        error:function () {
                            $dfd.reject();
                        }
                    });
                });
            },
            /*updateAction: function(postData) {
                window.location.assign('./itemDetailYp.html');
            }
            createAction: function (postData) {
                window.location.assign('./itemDetailYp.html');
            }*/
            //deleteAction:deleteItem()
        },
        fields: {
            id: {
                title:'ID',
                key:true,
                list:false,
                edit:false
            },
            article_name: {
                title:'单品名称',
                width:'30px',
                list:true,
                edit:true
            },
            state: {
                title:'状态',
                width:'2px',
                list:true,
                edit:true,
                options:{'1':'上架','2':'未上架'}
            },
            price_free:{
                title:'是否免费',
                width:'4px',
                list:false,
                edit:false
            },
            price: {
                title:'价格',
                width:'2px',
                list:true,
                edit:true,
                display:function(data) {
                    if (data.record.price_free == '1') {
                        return '免费';
                    } else {
                        return data.record.price;
                    }
                }
            },
            type: {
                title:'相关',
                width:'3px',
                list:true,
                edit:false,
                display:function(data) {
                    var ty = data.record.type.split("-");
                    var str = '';
                    for(var i=0;i<ty.length;i++) {
                        if (ty[i] == '1') {
                            str += '专栏：腾骏会员<br/>';
                        }
                        if (ty[i] == '2') {
                            str += '专栏：社群营销<br/>';
                        } 
                        if (ty[i] == '3') {
                            str += '专栏：淘系课程<br/>';
                        }
                        if(ty[i] == '4') {
                            str += '专栏：直播体系<br/>';
                        }
                    }
                    /*onmouseover =function(data) {
                        return data;
                    }*/
                    return str;
                    
                }
            },
            type_item: {
                title:'单品类型',
                width:'3px',
                list:true,
                edit:true,
                options:{'1':'音频','2':'视频','3':'图文'}
            },
            testColumn:{
                'title':'更多',
                display:function(data) {
                    var str = '评论数：2'+'<br/>'+ '订阅量2';
                    return str;
                }
            }
        }
    });
    $('#result_content_table').jtable('load');
}
//获取多选按钮的值
function getCheckBoxValueString(obj) {
    var s ="";
    for(var i=0; i<obj.length; i++){ 
        if(obj[i].checked) {
            if(i == obj.length-1) {
                s+=obj[i].value; //如果选中，将value添加到变量s中 
            } else {
                s+=obj[i].value+'-'; //如果选中，将value添加到变量s中 
            }
        }
    }
    var ck = s.charAt(s.length-1)
    if (ck != '-') {
        s+='-';
    }
    return s;
}
//解析多选按钮返回数组
function parseCheckBoxValue(str,type_item) {
    if (type_item == '1') {
        if(str != null || str != "") {
            str.replace(/^\s+|\s+$/g,"");
            var arr = str.split("-");
            var fenlei = document.getElementsByName("feilei");
            for (var i =0 ;i<fenlei.length;i++) {
                for(var j =0;j<arr.length;j++) {
                    if (arr[j] == "" || arr[j] == null) {
                        continue;
                    }
                    if(i == arr[j]-1) {
                        fenlei[i].checked = true; 
                    }
                }
            }
        }
    }
    if (type_item == '2') {
        if(str != null || str != "") {
            str.replace(/^\s+|\s+$/g,"");
            var arr = str.split("-");//4,1
            var fenlei = document.getElementsByName("feileiSp");
            for (var i =0 ;i<fenlei.length;i++) {
                for(var j =0;j<arr.length;j++) {
                    if (arr[j] == "" || arr[j] == null) {
                        continue;
                    }
                    if(i == arr[j]-1) {
                        fenlei[i].checked = true; 
                    }
                    //fenlei[i].checked = true;
                }
            }
        }
    }
    if (type_item == '3') {
        if(str != null || str != "") {
            str.replace(/^\s+|\s+$/g,"");
            var arr = str.split("-");//4,1
            var fenlei = document.getElementsByName("feileiTw");
            for (var i =0 ;i<fenlei.length;i++) {
                for(var j =0;j<arr.length;j++) {
                    if (arr[j] == "" || arr[j] == null) {
                        continue;
                    }
                    if(i == arr[j]-1) {
                        fenlei[i].checked = true; 
                    }
                    //fenlei[i].checked = true;
                }
            }
        }
     }
    
}
//上传音频内容
$(document).off("change", "#uploadYp1");//音频上传
$(document).on("change", "#uploadYp1", function () {
    var file = document.getElementById("uploadYp1")
    var formData = new FormData();
    formData.append('file', file.files[0]);
    $.ajax({
        url: serverApi + 'uploadFile',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (1=== data.success) {
                document.getElementById("uploadYpUrl1").value =data.data;
            } else {
                alert('上传失败')
            }
        },
        error: function () {
            alert("与服务器通信发生错误");
        }
    });
});
//上传音频封面
$(document).off("change", "#uploadYp2");//音频封面
$(document).on("change", "#uploadYp2", function () {
    var file = document.getElementById("uploadYp2")
    var formData = new FormData();
    formData.append('file', file.files[0]);
    $.ajax({
        url: serverApi + 'uploadFile',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (1=== data.success) {
                document.getElementById("uploadYpUrl2").value =data.data;
            } else {
                alert('上传失败')
            }
        },
        error: function () {
            alert("与服务器通信发生错误");
        }
    });
});
//上传音频试听
$(document).off("change", "#uploadYp3");//试听音频
$(document).on("change", "#uploadYp3", function () {
    var file = document.getElementById("uploadYp3")
    var formData = new FormData();
    formData.append('file', file.files[0]);
    $.ajax({
        url: serverApi + 'uploadFile',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (1=== data.success) {
                document.getElementById("uploadYpUrl3").value = data.data;
            } else {
                alert('上传失败')
            }
        },
        error: function () {
            alert("与服务器通信发生错误");
        }
    });
});

//音频上传
function submitYp() {
    var YpName = $('#YpName').val();//音频名称
    var uploadYpUrl1 = $('#uploadYpUrl1').val();//上传的音频
    var uploadYpUrl2 = $('#uploadYpUrl2').val();//音频封面
    var detail = editor.txt.html();//内容
    var uploadYpUrl3 = $('#uploadYpUrl3').val();//音频试听 
    var priceOrFree =$("input[name='price']:checked").val(); //是否免费
    var price = $('#priceText').val();//价格 
    //var fenlei =$("[name='feilei'][checked]").val();//分类
    var fenlei = document.getElementsByName("feilei");
    var type = getCheckBoxValueString(fenlei);
    var state = $("input[name='state']:checked").val();//是否上架
    
    //alert(data);
    var ty = document.getElementById('ypTitle').innerHTML;
    if (ty == "音频添加") {
        var data={"YpName":YpName,"uploadYpUrl1":uploadYpUrl1,"uploadYpUrl2":uploadYpUrl2,"detail":detail,"uploadYpUrl3":uploadYpUrl3,"priceOrFree":priceOrFree,
        "price":price,"type":type,"state":state};
        $.ajax({
            url: serverApi+ 'YpUploadAll',
            type: 'POST',
            dataType:"json",
            data: data, 
            success: function(data) {  
                if(data.success == 1 ) {
                    alert('上传成功！');
                    window.location.assign('./item.html');
                }else if (data.success == 0) {
                    alert(data.error);
                } else {
                    alert(data.error);
                }
            },
            error: function (){   
                alert("服务器未响应，请联系客服。"); 
            }  
        });
    } else {
        var id=document.getElementById('id').value;
        var data={"YpName":YpName,"uploadYpUrl1":uploadYpUrl1,"uploadYpUrl2":uploadYpUrl2,"detail":detail,"uploadYpUrl3":uploadYpUrl3,"priceOrFree":priceOrFree,
        "price":price,"type":type,"state":state,"id":id};
        $.ajax({
            url: serverApi+ 'YpUploadAllChange',//
            type: 'POST',
            dataType:"json",
            data: data, 
            success: function(data) {  
                if(data.success == 1 ) {
                    alert('修改成功！');
                    window.location.assign('./item.html');
                }else if (data.success == 0) {
                    alert(data.error);
                } else {
                    alert(data.error);
                }
            },
            error: function (){   
                alert("服务器未响应，请联系客服。"); 
            }  
        });
    }
    
}
//选中表格中的一列，点击修改
function changeItem() {
    var selectedRows = $('#result_content_table').jtable('selectedRows');
    if (selectedRows.length > 1) {
        alert("每次只能编辑一条记录");
        return;
    }
    if (selectedRows.length == 0) {
        alert("请选择一条记录");
        return;
    }
    var id = '';
    var item_ty = '';
    selectedRows.each(function () {
        var record = $(this).data('record');
        id = record.id;
        item_ty = record.type_item;
    });
    if (id == '' && item_ty == '') {
        return ;
    }
    var url ='';
    if (item_ty == '1') {
        url = 'itemDetailYp.html?id='+id;
    }
    if (item_ty == '2') {
        url = 'itemDetailSp.html?id='+id;
    }
    if (item_ty == '3') {
        url = 'itemDetailTw.html?id='+id;
    }
    if(url == undefined || url == '') {
        alert('url错误！');
        return;
    }
    window.location.assign(url);
}
//如果是修改初始化页面音频
function initItemDetailYp() {
    var url = window.location.href.split("=");
    if (url.length != 1) {
        document.getElementById('ypTitle').innerHTML="音频修改";
    }
    var type = document.getElementById('ypTitle').innerHTML;
    /*if (type == "音频添加") {

    }*/
    if(type == "音频修改") {
        var id = window.location.href.split("=")[1];
        document.getElementById('id').value = id;
        if (id != "" || id != undefined) {
            $.ajax({
                url: serverApi+ 'getItemOne?id='+id,// 服务端取值：request.query.name
                type: 'GET',
                dataType:"json",
                success: function(data) {  
                    if(data.success == 1 ) {
                        var da = data.data[0];
                        document.getElementById('YpName').value = da.article_name;
                        document.getElementById('uploadYpUrl1').value = da.profile;
                        document.getElementById('uploadYpUrl2').value = da.front_cover;
                        editor.txt.html(da.details);
                        document.getElementById('uploadYpUrl3').value = da.yp_tw_try;
                        $("input[name=price][value=" + da.price_free + "]").attr("checked", true); 
                        if(da.price_free == '2') {
                            document.getElementById('priceText').value = da.price;
                        } else {
                            document.getElementById('priceText').value = '';
                        }
                        parseCheckBoxValue(da.type,da.type_item);
                        $("input[name=state][value=" + da.state + "]").attr("checked", true);
                        
                    }else if (data.success == 0) {
                        alert(data.error);
                    } else {
                        alert(data.error);
                    }
                },
                error: function (){   
                    alert("服务器未响应，请联系客服。"); 
                }  
            });
        }
    }
    /*var aa = window.location.href;
    var url = window.location.href.split("=");
    
    var id = url[1].split("&")[0];
    var fromType = url[2];
    if (fromType == '1') {//音频
        document.getElementById('ypTitle').innerHTML = '音频修改';
    }
    var type = document.getElementById('ypTitle').innerHTML;
    alert(type);
    if (type == '音频修改') {
        
    }*/
   // document.getElementById('ypTitle').innerHTML = "音频修改";
    
}
//如果是修改初始化页面图文
function initItemDetailTw() {
    var url = window.location.href.split("=");
    if (url.length != 1) {
        document.getElementById('twTitle').innerHTML="图文修改";
    }
    var type = document.getElementById('twTitle').innerHTML;
    if (type == "图文添加") {

    }
    if(type == "图文修改") {
        var id = window.location.href.split("=")[1];
        document.getElementById('idTw').value = id;
        if (id != "" || id != undefined) {
            $.ajax({
                url: serverApi+ 'getItemOne?id='+id,// 服务端取值：request.query.name
                type: 'GET',
                dataType:"json",
                success: function(data) {  
                    if(data.success == 1 ) {
                        var da = data.data[0];
                        document.getElementById('TwName').value = da.article_name;
                        document.getElementById('uploadTwUrl1').value = da.front_cover;
                        editorTw.txt.html(da.details);
                        editorTw2.txt.html(da.yp_tw_try);
                        $("input[name=priceTw][value=" + da.price_free + "]").attr("checked", true); 
                        if(da.price_free == '2') {
                            document.getElementById('priceTextTw').value = da.price;
                        } else {
                            document.getElementById('priceTextTw').value = '';
                        }
                        parseCheckBoxValue(da.type,da.type_item);
                        $("input[name=stateTw][value=" + da.state + "]").attr("checked", true);
                        
                    }else if (data.success == 0) {
                        alert(data.error);
                    } else {
                        alert(data.error);
                    }
                },
                error: function (){   
                    alert("服务器未响应，请联系客服。"); 
                }
            });
        }
    }
}
//如果是修改初始化页面视频
function initItemDetailSp() {
    var url = window.location.href.split("=");
    if (url.length != 1) {
        document.getElementById('spTitle').innerHTML="视频修改";
    }
    var type = document.getElementById('spTitle').innerHTML;
    if (type == "视频添加") {

    }
    if(type == "视频修改") {
        var id = window.location.href.split("=")[1];
        document.getElementById('idSp').value = id;
        if (id != "" || id != undefined) {
            $.ajax({
                url: serverApi+ 'getItemOne?id='+id,// 服务端取值：request.query.name
                type: 'GET',
                dataType:"json",
                success: function(data) {  
                    if(data.success == 1 ) {
                        var da = data.data[0];
                        document.getElementById('SpName').value = da.article_name;
                        document.getElementById('uploadSpUrl1').value = da.profile;
                        document.getElementById('uploadSpUrl2').value = da.front_cover;
                        document.getElementById('uploadSpUrl3').value = da.item_sp_patch;
                        editorSp.txt.html(da.details);
                        $("input[name=priceSp][value=" + da.price_free + "]").attr("checked", true); 
                        if(da.price_free == '2') {
                            document.getElementById('priceTextSp').value = da.price;
                        } else {
                            document.getElementById('priceTextSp').value = '';
                        }
                        parseCheckBoxValue(da.type,da.type_item);
                        $("input[name=stateSp][value=" + da.state + "]").attr("checked", true);
                        
                    }else if (data.success == 0) {
                        alert(data.error);
                    } else {
                        alert(data.error);
                    }
                },
                error: function (){   
                    alert("服务器未响应，请联系客服。"); 
                }
            });
        }
    }
}
//图文
$(document).off("change", "#uploadTw1");//图文封面
$(document).on("change", "#uploadTw1", function () {
    var file = document.getElementById("uploadTw1")
    var formData = new FormData();
    formData.append('file', file.files[0]);
    $.ajax({
        url: serverApi + 'uploadFile',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (1=== data.success) {
                document.getElementById("uploadTwUrl1").value =data.data;
            } else {
                alert('上传失败')
            }
        },
        error: function () {
            alert("与服务器通信发生错误");
        }
    });
});
//图文上传
function submitTw() {
    var TwName = $('#TwName').val();//音频名称
    var uploadTwUrl1 = $('#uploadTwUrl1').val();//上传图文封面
    var detail = editorTw.txt.html();//图文内容
    var detailTry = editorTw2.txt.html();//图文内容试看
    var priceOrFree =$("input[name='priceTw']:checked").val(); //是否免费
    var price = $('#priceTextTw').val();//价格 
    var fenlei = document.getElementsByName("feileiTw");
    var type = getCheckBoxValueString(fenlei);
    var state = $("input[name='stateTw']:checked").val();//是否上架

    //alert(data);
    var ty = document.getElementById('twTitle').innerHTML;
    if (ty == "图文添加") {
        var data={"TwName":TwName,"uploadTwUrl1":uploadTwUrl1,"detail":detail,"detailTry":detailTry,"priceOrFree":priceOrFree,"price":price,"type":type,"state":state};
        $.ajax({
            url: serverApi+ 'TwUploadAll',
            type: 'POST',
            dataType:"json",
            data: data, 
            success: function(data) {  
                if(data.success == 1 ) {
                    alert('上传成功！');
                    window.location.assign('./item.html');
                }else if (data.success == 0) {
                    alert(data.error);
                } else {
                    alert(data.error);
                }
            },
            error: function (){   
                alert("服务器未响应，请联系客服。"); 
            }  
        });
    } else {
        var id=document.getElementById('idTw').value;
        var data={"TwName":TwName,"uploadTwUrl1":uploadTwUrl1,"detail":detail,"detailTry":detailTry,"priceOrFree":priceOrFree,"price":price,"type":type,"state":state,"id":id};
        $.ajax({
            url: serverApi+ 'TwUploadAllChange',//
            type: 'POST',
            dataType:"json",
            data: data, 
            success: function(data) {  
                if(data.success == 1 ) {
                    alert('修改成功！');
                    window.location.assign('./item.html');
                }else if (data.success == 0) {
                    alert(data.error);
                } else {
                    alert(data.error);
                }
            },
            error: function (){   
                alert("服务器未响应，请联系客服。"); 
            }  
        });
    }
}

//视频
$(document).off("change", "#uploadSp1");//视频上传
$(document).on("change", "#uploadSp1", function () {
    var file = document.getElementById("uploadSp1")
    var formData = new FormData();
    formData.append('file', file.files[0]);
    $.ajax({
        url: serverApi + 'uploadFile',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (1=== data.success) {
                document.getElementById("uploadSpUrl1").value =data.data;
            } else {
                alert('上传失败')
            }
        },
        error: function () {
            alert("与服务器通信发生错误");
        }
    });
});
$(document).off("change", "#uploadSp2");//视频封面
$(document).on("change", "#uploadSp2", function () {
    var file = document.getElementById("uploadSp2")
    var formData = new FormData();
    formData.append('file', file.files[0]);
    $.ajax({
        url: serverApi + 'uploadFile',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (1=== data.success) {
                document.getElementById("uploadSpUrl2").value =data.data;
            } else {
                alert('上传失败')
            }
        },
        error: function () {
            alert("与服务器通信发生错误");
        }
    });
});
$(document).off("change", "#uploadSp3");//视频贴片
$(document).on("change", "#uploadSp3", function () {
    var file = document.getElementById("uploadSp3")
    var formData = new FormData();
    formData.append('file', file.files[0]);
    $.ajax({
        url: serverApi + 'uploadFile',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (1=== data.success) {
                document.getElementById("uploadSpUrl3").value = data.data;
            } else {
                alert('上传失败')
            }
        },
        error: function () {
            alert("与服务器通信发生错误");
        }
    });
});
//视频提交和修改
function submitSp() {
    var SpName = $('#SpName').val();//视频名称
    var uploadSpUrl1 = $('#uploadSpUrl1').val();//上传的视频
    var uploadSpUrl2 = $('#uploadSpUrl2').val();//视频封面
    var uploadSpUrl3 = $('#uploadSpUrl3').val();//视频贴片
    var detail = editorSp.txt.html();//内容
    var priceOrFree =$("input[name='priceSp']:checked").val(); //是否免费
    var price = $('#priceTextSp').val();//价格 
    //var fenlei =$("[name='feilei'][checked]").val();//分类
    var fenlei = document.getElementsByName("feileiSp");
    var type = getCheckBoxValueString(fenlei);
    var state = $("input[name='stateSp']:checked").val();//是否上架
    //alert(data);
    var ty = document.getElementById('spTitle').innerHTML;
    if (ty == "视频添加") {
        var data={"SpName":SpName,"uploadSpUrl1":uploadSpUrl1,"uploadSpUrl2":uploadSpUrl2,"uploadSpUrl3":uploadSpUrl3,"detail":detail,"priceOrFree":priceOrFree,
        "price":price,"type":type,"state":state};
        $.ajax({
            url: serverApi+ 'SpUploadAll',
            type: 'POST',
            dataType:"json",
            data: data, 
            success: function(data) {  
                if(data.success == 1 ) {
                    alert('上传成功！');
                    window.location.assign('./item.html');
                }else if (data.success == 0) {
                    alert(data.error);
                } else {
                    alert(data.error);
                }
            },
            error: function (){   
                alert("服务器未响应，请联系客服。"); 
            }  
        });
    } else {
        var id=document.getElementById('idSp').value;
        var data={"SpName":SpName,"uploadSpUrl1":uploadSpUrl1,"uploadSpUrl2":uploadSpUrl2,"uploadSpUrl3":uploadSpUrl3,"detail":detail,"priceOrFree":priceOrFree,
        "price":price,"type":type,"state":state,"id":id};
        alert(data);
        $.ajax({
            url: serverApi+ 'SpUploadAllChange',//
            type: 'POST',
            dataType:"json",
            data: data, 
            success: function(data) {  
                if(data.success == 1 ) {
                    alert('修改成功！');
                    window.location.assign('./item.html');
                }else if (data.success == 0) {
                    alert(data.error);
                } else {
                    alert(data.error);
                }
            },
            error: function (){   
                alert("服务器未响应，请联系客服。"); 
            }  
        });
    }
}