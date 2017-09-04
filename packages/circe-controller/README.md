# circe-controller 装饰器形式路由配置

## 安装

[![NPM](https://nodei.co/npm/circe-controller.png?downloads=true)](https://nodei.co/npm/circe-controller/)

## 使用

```typescript
import * as Koa from 'koa'
import {IContext, Controller, Get, Post, Put, Delete, Use, toRouter} from 'circe-controller'

@Controller('/users')
@Use(someMiddleware)
class UserController {

  @Get()
  @Use(otherMiddleware)
  async list (ctx: IContext) {}

  @Get()
  async get (ctx: IContext) {}

  @Post()
  async create (ctx: IContext) {}

  @Put()
  async update (ctx: IContext) {}

  @Delete()
  async delete (ctx: IContext) {}
}

const app = new Koa()
const router = toRouter([UserController])

app.use(router.routes())
app.use(router.allowedMethods())
```

## API

### function toRouter (controllers: Controller[]): Router

## 已支持装饰器

- Controller
- Use
- Action
- Get
- Post
- Put
- Patch
- Delete
- Head
- Options
- All
