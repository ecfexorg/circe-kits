import * as Koa from 'koa'
import MetadataStore from '../MetadataStore'
import {MIDDLEWARES} from '../constants'

export type MiddlewareCreator = (...args: any[]) => Koa.Middleware

export default function Use (...middlewares: MiddlewareCreator[]) {
  return function (target: any, name?: string, descriptor?: TypedPropertyDescriptor<any>) {
    const key = descriptor ? `${MIDDLEWARES}/${name}` : MIDDLEWARES
    MetadataStore.push(target, key, middlewares)
  }
}
