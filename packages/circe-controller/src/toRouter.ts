import * as Router from 'koa-router'
import MetadataStore from './MetadataStore'
import {ROUTES} from './constants'

export interface IController {
  new (...args: any[]): any
}

export default function toRouter (controllers: IController[], getter?: (Controller: IController) => any) {
  const router: any = new Router()

  for (const Controller of controllers) {
    const ctrl = getter ? getter(Controller) : new Controller()
    const routes = MetadataStore.get<any>(Controller, ROUTES, [])

    for (const route of routes) {
      const {name, path, method, middlewares} = route
      router[method](path, ...middlewares, ctrl[name])
    }
  }

  return router as Router
}
