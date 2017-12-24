function adminLogin() {
    var name = $('#username').val();
    var adminPassword = $('#password').val();
    var data={"name":name,"password":adminPassword};
    $.ajax({
        url: serverApi+ 'adminLogin',// 服务端取值：request.query.name
        type: 'POST',
        dataType:"json",
        headers:{"password":'147852'},
        data: data, 
        success: function(data) {  
            if(data.success == 1 ) {
                setCookie("adminName",name);
                setCookie("password",adminPassword);
                window.location.assign('./index.html');
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
//验证admin的管理页面是非法
function verifyAdmin() {
    var name = getCookie("adminName");
    var password = getCookie("password");
    if (name == undefined || password == undefined) {
        alert('非法请求，请登录！');
        window.location.assign('./adminLogin.html');
    } else {
        var pp =document.getElementById('adminNameId').innerHTML='<span>'+name+'</span>';
    }
}

function changeAdminPassword() {
    var password1 = $('#password1').val();
    var password2 = $('#password2').val();
    var password3 = $('#password3').val();
    var name = getCookie("adminName");
    if (password2 != password3) {
        alert('新密码，连续两次输入不一致，请从新输入');
        $('#password2').val('');
        $('#password3').val('');
    } else {
        alert(password1+password2+password3+name);
        var data = {"password1":password1,"password2":password2,"password3":password3,"name":name}
        $.ajax({
            url: serverApi+ 'changeAdminPassword',// 服务端取值：request.query.name
            type: 'POST',
            dataType:"json",
            data: data, 
            success: function(data) {  
                if(data.success == 1 ) {
                    alert('密码修改成功！');
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
function quitAdminLogin() {
    delCookie("adminName");
    delCookie("password");
    alert('退出成功！');
    window.location.assign('./adminLogin.html');
    
}