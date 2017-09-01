import * as Koa from 'koa'
import {ActionTypes, ACTIONS} from '../constants'
import MetadataStore from '../MetadataStore'

export type ActionDecorator =
  (target: any, name: string, descriptor: TypedPropertyDescriptor<Koa.Middleware>) => any

export function Action (method: string, path: string = ''): ActionDecorator {
  return function (target, name, descriptor) {
    MetadataStore.push(target, ACTIONS, {method, path, name})
  }
}

export function All (path?: string) {
  return Action(ActionTypes.ALL, path)
}

export function Head (path?: string) {
  return Action(ActionTypes.HEAD, path)
}

export function Get (path?: string) {
  return Action(ActionTypes.GET, path)
}

export function Post (path?: string) {
  return Action(ActionTypes.POST, path)
}

export function Put (path?: string) {
  return Action(ActionTypes.PUT, path)
}

export function Patch (path?: string) {
  return Action(ActionTypes.PATCH, path)
}

export function Delete (path?: string) {
  return Action(ActionTypes.DELETE, path)
}

export function Options (path?: string) {
  return Action(ActionTypes.OPTIONS, path)
}
