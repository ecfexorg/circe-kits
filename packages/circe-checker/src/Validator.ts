import * as _ from 'lodash'
import ValidatorError from './ValidationError'

export type ValidatorMethod = (this: Validator, ...args: any[]) => Validator

// tslint:disable:member-ordering
export default class Validator {
  public static addMethod = function (name: string, method: ValidatorMethod) {
    if (name in Validator.prototype) {
      throw new Error(`'${name}' already exists in Validator.prototype`)
    }

    (Validator.prototype as any)[name] = function () {
      return this.ignored ? this : method.apply(this, arguments)
    }
  }

  public static addMethods = function (methods: {[name: string]: ValidatorMethod}) {
    for (const name in methods) {
      Validator.addMethod(name, methods[name])
    }
  }

  public key: string
  public value: any
  public ignored: boolean

  constructor (key: string, value: any, required: boolean = true, defaultValue?: any) {
    this.key = key
    this.value = value === undefined ? defaultValue : value

    if (this.value === undefined) {
      if (required) {
        this.throw(`${this.key} is required, but got undefined`)
      } else {
        this.ignored = true
      }
    }
  }

  private throw = (message?: string) => {
    throw new ValidatorError(this.key, this.value, message || '')
  }

  private throwIf = (bool: boolean, message?: string) => {
    if (bool) {
      this.throw(message)
    }
  }

  private throwIfNot = (bool: boolean, message?: string) => {
    if (!bool) {
      this.throw(message)
    }
  }

  // -----------------------------------------------------
  // --[ methods ]----------------------------------------
  // -----------------------------------------------------

  // judgements

  public isString (tip?: string) {
    this.throwIfNot(_.isString(this.value), tip || `${this.key} must be a string, but got ${typeof this.value}`)
    return this
  }

  public isObject (tip?: string) {
    this.throwIfNot(_.isObject(this.value), tip || `${this.key} must be an object, but got ${typeof this.value}`)
    return this
  }

  public isBoolean (tip?: string) {
    this.throwIfNot(_.isBoolean(this.value), tip || `${this.key} must be a boolean, but got ${typeof this.value}`)
    return this
  }

  public isNumber (tip?: string) {
    this.throwIfNot(_.isNumber(this.value), tip || `${this.key} must be a number, but got ${typeof this.value}`)
    return this
  }

  public isArray (tip?: string) {
    this.throwIfNot(_.isArray(this.value), tip || `${this.key} must be an array, but got ${typeof this.value}`)
    return this
  }

  public isDate (tip?: string) {
    this.throwIfNot(_.isDate(this.value), tip || `${this.key} must be a date object, but got ${typeof this.value}`)
    return this
  }

  public equal(otherValue: any, tip?: string) {
    this.throwIfNot(_.isEqual(this.value, otherValue), tip || `${this.key} must be equal to ${otherValue}`)
    return this
  }

  public notEqual (otherValue: any, tip?: string) {
    this.throwIf(_.isEqual(this.value, otherValue), tip || `${this.key} must be not equal to ${otherValue}`)
    return this
  }

  public in (array: any[], tip?: string) {
    this.throwIfNot(_.includes(array, this.value), tip || `value of ${this.key} is not supported`)
    return this
  }

  public notIn (array: any[], tip?: string) {
    this.throwIf(_.includes(array, this.value), tip || `value of ${this.key} is not supported`)
    return this
  }

  public match (regExp: RegExp, tip?: string) {
    this.isString(tip)
    this.throwIfNot(regExp.test(this.value), tip)
  }

  // mutations

  public toArray () {
    this.value = _.isArray(this.value) ? this.value : [this.value]
    return this
  }

  public toNumber (defaultValue?: number) {
    this.value = Number(this.value)
    if (isNaN(this.value) && typeof defaultValue === 'number') {
      this.value = defaultValue
    }
    return this
  }

  public unique (tip: string) {
    this.isArray(tip)
    this.value = _.uniq(this.value)
    return this
  }

  public toString () {
    if (!_.isNil(this.value)) {
      this.value = this.value.toString()
    }
    return this
  }

  public trim (tip?: string) {
    this.isString(tip)
    this.value = this.value.trim()
    return this
  }

  public notEmpty (tip?: string) {
    this.trim(tip)
    this.throwIf(this.value === '', tip)
    return this
  }
}
