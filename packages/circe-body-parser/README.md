# circe-body-parser 请求体解析

> 支持`json`，`text`，`form`类型

## 安装

[![NPM](https://nodei.co/npm/circe-body-parser.png?downloads=true)](https://nodei.co/npm/circe-body-parser/)

## 使用

```typescript
import * as Koa from 'koa'
import bodyParser from 'circe-body-parser'

const app = new Koa()

app.use(bodyParser())

app.use(async (ctx) => {
  ctx.body = ctx.request.body
})
```

## 参数

- `onError?`: (err: Error, ctx: Koa.Context) => void
- `encoding?`: string = 'utf-8'
- `jsonLimit?`: string = '1mb'
- `formLimit?`: string = '56kb'
- `textLimit?`: string = '56kb'
- `multipart?`: boolean = false
- `formidableOptions?`: IIncomingFormOptions = {}
  - 参考：[formidable](https://github.com/felixge/node-formidable)
  - encoding?: string
  - uploadDir?: string
  - keepExtensions?: boolean
  - maxFieldsSize?: number
  - maxFields?: number
  - hash?: string | boolean
  - multiples?: boolean
  - type?: string
  - bytesReceived?: number
  - bytesExpected?: number
