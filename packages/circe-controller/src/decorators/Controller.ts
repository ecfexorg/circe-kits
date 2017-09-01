import * as Koa from 'koa'
import {ACTIONS, MIDDLEWARES, ROUTES} from '../constants'
import MetadataStore from '../MetadataStore'

export default function Controller (mount: string = '') {
  return function (target: any) {
    const prototype = target.prototype

    const controllerMiddlewares = MetadataStore.get(target, MIDDLEWARES, [])
    const actions = MetadataStore.get<any>(prototype, ACTIONS, [])

    const routes = actions.map((action: any) => {
      const {method, path, name} = action
      const actionMiddlewares = MetadataStore.get(prototype, `${MIDDLEWARES}/${name}`, [])

      return {
        name,
        method,
        path: mount + path,
        middlewares: [
          ...controllerMiddlewares,
          ...actionMiddlewares
        ]
      }
    })

    MetadataStore.set(target, ROUTES, routes)
  }
}
