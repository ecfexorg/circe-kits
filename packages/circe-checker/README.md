# circe-checker 请求参数验证

> 支持`query`，`params`，`body`的参数

## 安装

[![NPM](https://nodei.co/npm/circe-checker.png?downloads=true)](https://nodei.co/npm/circe-checker/)

## 使用

```typescript
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as checker from 'circe-checker'

const app = new Koa()
const router = new Router()

app.use(checker.init())
app.use(checker.onError((err, ctx) => {
  // err.message
}))

router.get('/users/:userId/posts', checker({
  userId: (ctx) => ctx.checkParam('userId').toNumber(),
  sortBy: (ctx) => ctx.checkQuery('sortBy', false, 'createdAt')
  // someData: (ctx) => ctx.checkBody('key')
}), async (ctx) => {
  const {userId, sortBy} = ctx.vals
  // do something...
})

app.use(router.routes())
app.use(router.allowedMethods())
```

## 参数

### checker.init() 参数

- getQuery?: (ctx: Koa.Context) => any
- getParams?: (ctx: Koa.Context) => any
- getBody?: (ctx: Koa.Context) => any

### checker.onError() 参数

(err: ValidationError, ctx: Koa.Context) => void

### checker() 参数

- [name: string]: (ctx: Koa.Context) => any

## 支持的参数验证函数

查看[源文件](./src/Validator.ts)
