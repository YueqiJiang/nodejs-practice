# egg-framework

## 基础框架
### app启动时
1. 通用跨域处理
2. 初始化全局对象\常量\变量

### 监听到请求时（action处理前）
1. 基本参数有效性查询
2. 身份鉴权
3. 对其他app请求来的数据进行验签处理

### 监听到请求时（action处理后）
1. 记录请求日志

### 监听app抛出的error信息
1. 记录日志
2. 返回通用错误信息

### 通用封装
1. 统一的返回参数格式
2. 常用通用功能封装（时间处理、哈希编码、RSA对称加、验签）

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org