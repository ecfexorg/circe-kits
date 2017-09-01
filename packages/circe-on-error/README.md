# circe-on-error 错误处理

## 安装

[![NPM](https://nodei.co/npm/circe-on-error.png?downloads=true)](https://nodei.co/npm/circe-on-error/)

## 使用

```typescript
import * as Koa from 'koa'
import OnError from 'circe-on-error'

const app = new Koa()

app.use(onError((err, ctx) => {
  ctx.status = 500
  ctx.body = process.env.NODE_ENV === 'development'
    ? err.message
    : 'Internal Server Error'
}))
```
