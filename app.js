const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');//设置跨域访问
const controller = require('./controller');
const templating = require('./templating');
const app = new Koa();


const isProduction = process.env.NODE_ENV === 'production';
//设置跨域访问
app.use(cors({
    'origin':'*',
    'expose':['WWW-Authenticate', 'Server-Authorization'],
    'maxAge': 5,
    'credentials': true,
    'methods': ['GET', 'POST', 'DELETE'],
    'headers': ['Content-Type', 'Authorization', 'Accept']
}));


app.use(async(ctx,next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	var start = new Date().getTime(), 
         execTime; 
    await next(); 
    execTime = new Date().getTime() - start; 
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});
// static file support: 
if(!isProduction) {
    let staticFiles = require('./static-files'); 
    app.use(staticFiles('/static/',__dirname + '/static')); 
}


app.use(templating('views',{
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(bodyParser());
app.use(controller());
app.listen(3030);
console.log('app started at port 3030....');