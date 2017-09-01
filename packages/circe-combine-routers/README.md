# circe-combine-routers 合并路由对象

## 安装

[![NPM](https://nodei.co/npm/circe-combine-routers.png?downloads=true)](https://nodei.co/npm/circe-combine-routers/)

## 使用

```typescript
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as checker from 'circe-combine-routers'

const app = new Koa()
const userRouter = new Router()
const postRouter = new Router()

app.use(combineRouters([userRouter, postRouter]))
```

## API

### function combineRoutes (routers: Router[], mounted?: string): Koa.Middleware

- routes 路由对象数组
- mount? 路由前缀
