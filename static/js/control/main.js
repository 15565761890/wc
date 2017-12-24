function get2017News() {
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
                    /**<div class="content-content">
								<a href="content_1.html">
									<div class="content-img"><img src="img/18.jpg" /></div>
									<div class="content-text">
										<h4>牛气学堂会员</h4>
										<p class="neirong">牛气学堂讲师汇报，只为最尊贵的你。牛气学堂讲师汇报，只为最尊贵的你。牛气学堂讲师汇报，只为最尊贵的你。牛气学堂讲师汇报，只为最尊贵的你。</p>
										<div class="content-value">
											<p class="number">461人开通</p>
											<p class="price">￥4980/年</p>
										</div>
									</div>
								</a>
                            </div> */
                    str += '<div class="content-content">';
                    str += '<a href="./controller/detail.html?id='+id+'">';
                    str += '<div class="content-img"><img src="../'+row.front_cover+'" /></div>';
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
//获取名师系列课
function getmastersSeries() {
    var articleType='3';
    var data=JSON.stringify({"articleType":articleType});
    $.ajax({
        url: serverApi + 'getmastersSeries',
        type: 'POST',
        dataType: "json",
        data:data,
        headers:{"password":'147852'},
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.success == 1) {
                var listNews = data.data;
                if (listNews.length > 0)
                    allNews = listNews;
                var str = '';
                for (var i=0;i<listNews.length;i++) {
                    var row = listNews[i];
                    var id = row.id;
                  /*<div class="content-content">
                        <a href="content_5.html">
                            <div class="content-img"><img src="img/18.jpg" /></div>
                            <div class="content-text">
                                <h4>玩法变了，新的直通车怎么玩？</h4>
                                <p class="neirong">牛气学堂讲师汇报，只为最尊贵的你。牛气学堂讲师汇报，只为最尊贵的你。牛气学堂讲师汇报，只为最尊贵的你。牛气学堂讲师汇报，只为最尊贵的你。</p>
                                <div class="content-value">
                                    <p class="total">共12期</p>
                                    <p class="number">461人开通</p>
                                    <p class="price">￥4980</p>
                                </div>
                            </div>
                        </a>
                    </div> */
                    str += '<div class="content-content">';
                    str += '<a href="./controller/detail.html?id='+id+'">';
                    str += '<div class="content-img"><img src="'+row.front_cover+'" /></div>';
                    str += '<div class="content-text">';
                    str += '<h4>'+row.article_name+'</h4>';
                    str += '<p class="neirong">'+row.profile+'</p>';
                    str += '<div class="content-value">';
                    str += '<p class="total">共12期</p>';
                    str += '<p class="number">461人开通</p>';
                    str += '<p class="price">￥'+row.price+'/年</p>';
                    str += '</div></div></a></div>';
                    //document.getElementById("content-header").appendChild(str);
                    document.getElementById("content_mastersSeries").innerHTML = str;
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
//获得问答区信息
function getPayForQuestion() {
    $.ajax({
        url: serverApi + 'getPayForQuestionInfo',
        type: 'GET',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.success == 1) {
                var listNews = data.data;
                if (listNews.length > 0)
                    allNews = listNews;
                var str = '';
                for (var i=0;i<listNews.length;i++) {
                    var row = listNews[i];
                    var id = row.id;
                  /*<a href="./controller/answer.html">
                        <div class="content-img"><img src="img/18.jpg" /></div>
                        <div class="content-text">
                            <h4>汇聚电商界名师大咖</h4>
                            <p class="neirong">有问题？上牛气学堂！<span class="glyphicon glyphicon-chevron-right"></span></p>
                            <div class="content-value">
                                <p class="number">47个问题</p>
                            </div>
                        </div>
                    </a>*/
                    str += '<a href="./controller/answer.html">';
                    str += '<div class="content-img"><img src="img/18.jpg" /></div>';
                    str += '<div class="content-text">';
                    str += '<h4>'+row.name+'</h4>';
                    str += '<p class="neirong">'+row.profile+'<span class="glyphicon glyphicon-chevron-right"></span></p>';
                    str += '<div class="content-value">';
                    str += '<p class="number">47个问题</p>';
                    str += '</div></div></a>';
                    document.getElementById("content-content").innerHTML = str;
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
function getPersonMessage () {
    
}
//初始化index.html
function initIndex() {
    get2017News();
    getmastersSeries();
    getPayForQuestion();
    getPersonMessage();
}
