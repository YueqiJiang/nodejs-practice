const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router({
    prefix:"/api"
});

/* 给一个全局变量，以存储缓存数据 */
let cache = getData()
app.use(async (ctx,next) =>{
   await next()
})
app.use(router.routes());
/* 假定一个接口返回一些数据 */
router.get('/data/username',async (ctx,next)=>{
    ctx.body = cache;
})

/* 获取数据实现 */
function getData(){
    console.log("现在是：",new Date(),"请求了一次数据");
    return [{datetime:Date.now()},{name:"jiangyueqi"},{name:"zhangdeli"},{name:"xiaobuniu"}]
}

/* 刷新数据 */
function refreshData(){
    let isSet = true;
    while(isSet){
        isSet =false
        /* 每一分钟刷新一次 */
        setTimeout(()=>{
            console.log(new Date(),"循环了一次");
            /* 获取当前小时、分钟 */
            let nowHours =new Date().getHours()
            let nowMinutes =new Date().getMinutes()
            /* 每日0点自动刷新数据 */
            if(nowHours===0 && nowMinutes ===0){
                cache = getData() 
            } 
            isSet = true         
        },60000)
    }
}
(async()=>{
    /* 监听端口、启动数据刷新 */
    await app.listen(3000)
    await refreshData()
})()

