# circe-jwt JWT处理

## 安装

[![NPM](https://nodei.co/npm/circe-jwt.png?downloads=true)](https://nodei.co/npm/circe-jwt/)

## 使用

```typescript
import * as Koa from 'koa'
import * as JWT from 'circe-jwt'
import jwt from 'circe-jwt'

const app = new Koa()

app.use(
  jwt({secret: 'JSON_WEB_TOKEN_SECRET'})
    .unless({paths: [/^\/public/]})
)

app.use((async (ctx) => {
  // ctx.state.user
  // JWT.sign()
  // JWT.verify()
  // JWT.decode()
}))
```

## 参数

- secret: string
- key?: string
