const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const http = require('http')
const router = new Router({
    prefix: "/api"
});
const port = 3000
/* 给一个全局变量，以存储缓存数据 */
let cache = getData()
app.use(async (ctx, next) => {
    await next()
})
app.use(router.routes());
/* 假定一个接口返回一些数据 */
router.get('/data/username', async (ctx, next) => {
    ctx.body = cache;
})

/* 获取数据实现 */
function getData() {
    console.log("现在是：", new Date(), "服务器请求了一次真实数据");
    return [{ datetime: Date.now() }, { name: "jiangyueqi" }]
}

/* 刷新数据 */
function refreshData() {
    setInterval(() => {
        /* 获取当前小时、分钟 */
        let nowHours = new Date().getHours()
        let nowMinutes = new Date().getMinutes()
        /* 每日0点自动刷新数据 */
        if (nowHours === 0 && nowMinutes === 0) {
            cache = getData()
        }
        isSet = true
    }, 60000)
}

/* 模拟请求（每分钟请求一次） */
function requstData() {
    var reqOption = {
        host: 'localhost',
        port: port,
        method: 'GET',
        path: '/api/data/username',
        headers: {
            "Content-Type": 'application/json',
            "Content-Length": 0
        }
    }
    setInterval(() => {
        var body = ''
        var req = http.request(reqOption, function (res) {
            res.on('data', function (data) {
                body += data
            }).on('end', function () {
                console.log(
                    "现在是：", 
                    new Date(), 
                    "模拟请求了一次接口。接口返回：",
                    "response: " , 
                    res.statusCode,body)
            })
        }).on('error', function (e) {
            console.log("error: " + e.message);
        })
        req.write('')
        req.end()
    }, 60000)
}

(async () => {
    /* 监听端口 */
    await app.listen(port)
    /* 定时缓存数据刷新 */
    await refreshData()
    /* 模拟请求（每分钟请求一次） */
    await requstData()
})()

