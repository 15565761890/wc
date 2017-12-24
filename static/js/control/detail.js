function getDetailArticle(id) {
    $.ajax({
        url: serverApi + 'get2017News',
        type: 'GET',
        dataType: "json",
        data:{},
        headers:{"password":'147852'},
        success: function (data) {
            if (data.success == 1) {
                var listNews = data.data;
                if (listNews.length > 0)
                    allNews = listNews;
                var str = '';
                for (var i=0;i<listNews.length;i++) {
                    var row = listNews[i];
                    var id = row.id;
                    
                    str += '<div class="content-content">';
                    str += '<a href="./controller/detail.html?id='+id+'">';
                    str += '<div class="content-img"><img src="'+row.front_cover+'" /></div>';
                    str += '<div class="content-text">';
                    str += '<h4>'+row.article_name+'</h4>';
                    str += '<p class="neirong">'+row.profile+'</p>';
                    str += '<div class="content-value">';
                    str += '<p class="number">461人开通</p>';
                    str += '<p class="price">￥'+row.price+'/年</p>';
                    str += '</div></div></a></div>';
                    //document.getElementById("content-header").appendChild(str);
                    document.getElementById("content-2017").innerHTML = str;
                }
            } else {
                alert(data.error);
            }
        },
        error: function (data) {
            alert("服务器未响应，请联系客服。");
        }
    });
}
function initDetail(pa) {
    alert(pa);
    //getDetailArticle(pa);
}