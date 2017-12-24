module.exports = {
	'POST /signin':async (ctx,next) => {
		var 
			name = ctx.request.body.name || '',
			password = ctx.request.body.password || '';
		if (name === 'jym' && password === '123456') {
			ctx.response.body='<h3>signin ok!</h3>';
			console.log('signin ok!');
			/*ctx.render('signin-ok.html',{
				title:'Sign In ok',
				name:'jym'
			});*/
		} else {
			ctx.response.body='<h3>signin failed!</h3>';
			console.log('signin failed!');
			/*ctx.render('signin-failed!',{
				title:'Sign In failed!'
			});*/
		}
	}
};