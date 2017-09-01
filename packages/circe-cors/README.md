# circe-cors 处理跨域请求

## 安装

[![NPM](https://nodei.co/npm/circe-cors.png?downloads=true)](https://nodei.co/npm/circe-cors/)

## 使用

```typescript
import * as Koa from 'koa'
import cors from 'circe-cors'

const app = new Koa()

app.use(cors())
```

## 参数

- origin?: string
- allowMethods?: string | string[]
- allowHeaders?: string | string[]
- exposeHeaders?: string | string[]
- maxAge?: string
- credentials?: boolean
