import * as Koa from 'koa'
import * as parse from 'co-body'
import {IncomingForm} from 'formidable'

export interface IIncomingFormOptions {
  encoding?: string
  uploadDir?: string
  keepExtensions?: boolean
  maxFieldsSize?: number
  maxFields?: number
  hash?: string | boolean
  multiples?: boolean
  type?: string
  bytesReceived?: number
  bytesExpected?: number
}

export interface IBodyParserOptions {
  onError?: (err: Error, ctx: any) => void
  encoding?: string
  jsonLimit?: string
  formLimit?: string
  textLimit?: string
  multipart?: boolean
  formidableOptions?: IIncomingFormOptions
}

export default function bodyParserMiddleware (options: IBodyParserOptions = {}): Koa.Middleware {
  const {
    onError,
    encoding = 'utf-8',
    jsonLimit = '1mb',
    formLimit = '56kb',
    textLimit = '56kb',
    multipart = false,
    formidableOptions = {}
  } = options

  return function (ctx, next) {
    let promise: Promise<any> = Promise.resolve({})
    try {
      if (ctx.is('json')) {
        promise = parse.json(ctx, {encoding, limit: jsonLimit})
      } else if (ctx.is('urlencoded')) {
        promise = parse.form(ctx, {encoding, limit: formLimit})
      } else if (ctx.is('text')) {
        promise = parse.text(ctx, {encoding, limit: textLimit})
      } else if (multipart && ctx.is('multipart')) {
        promise = parseMultipart(ctx, formidableOptions)
      }
      return promise.then((body) => {
        (ctx.request as any).body = body
        return next()
      })
    } catch (error) {
      if (onError) {
        onError(error, ctx)
      } else {
        throw error
      }
    }
  }
}

function parseMultipart (ctx: Koa.Context, options: IIncomingFormOptions) {
  return new Promise((resolve, reject) => {
    const fields = {}
    const files = {}
    const form = new IncomingForm()

    // tslint:disable:curly
    if (options.encoding) form.encoding = options.encoding
    if (options.uploadDir) form.uploadDir = options.uploadDir
    if (options.keepExtensions) form.keepExtensions = options.keepExtensions
    if (options.maxFieldsSize) form.maxFieldsSize = options.maxFieldsSize
    if (options.maxFields) form.maxFields = options.maxFields
    if (options.hash) form.hash = options.hash
    if (options.multiples) form.multiples = options.multiples
    if (options.type) form.type = options.type
    if (options.bytesReceived) form.bytesReceived = options.bytesReceived
    if (options.bytesExpected) form.bytesExpected = options.bytesExpected
    // tslint:enable:curly

    form
      .on('end', () => resolve({fields, files}))
      .on('error', (error) => reject(error))
      .on('field', (field, value) => { addTo(fields, field, value) })
      .on('file', function (field, file) { addTo(fields, field, file) })
    form.parse(ctx.req)
  })
}

function addTo (list: any, key: string, value: any) {
  if (list[key]) {
    if (Array.isArray(list[key])) {
      list[key].push(value)
    } else {
      list[key] = [list[key], value]
    }
  } else {
    list[key] = value
  }
}
