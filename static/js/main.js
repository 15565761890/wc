$(function() {

	/*轮播图触摸事件*/
	var $carousel = $('.carousel');
	var startX, endX;
	var offset = 50;
	$carousel.on('touchstart', function(e) {
		startX = e.originalEvent.changedTouches[0].clientX;
		/*console.log(startX);*/
	});
	$carousel.on('touchmove', function(e) {
		endX = e.originalEvent.changedTouches[0].clientX;
		/*console.log(endX);*/
	})
	$carousel.on('touchend', function(e) {
		var distance = Math.abs(endX - startX);
		if(distance > offset) {
			$(this).carousel(startX > endX ? 'next' : 'prev');
		}
	})
	/*底部导航*/
	var foot = $('#footer');
	var boxs = foot.children('div').children('div').children('div');
	console.log(boxs);
	boxs[1].onclick = function  () {
		console.log(boxs[1]);
	}
	boxs.on('click',function(){
		
		for(var i= 0; i< boxs.length ;i++){
			/*console.log(boxs[i]);*/
			boxs.removeClass('actived');			
		}	
		$(this).addClass('actived');
	})
	/* for(var i=0; i<boxs.length ;i++){
        boxs[i].onclick = function () {
            // alert(2);

            //排他思想：干掉所有人，剩下我自己
            //这个for循环是用来，清楚所有current类名的。（排他思想）
            for(var j= 0; j<boxs.length; j++){
                boxs[j].removeClass('actived');
            }

            //3.书写事件驱动程序
            //（1）.改变背景色

            //剩下我一个
            this.addClass('actived');
        }
    }*/
	

});