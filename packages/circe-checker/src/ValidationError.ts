export default class ValidationError extends Error {
  public key: string
  public value: any
  public message: string

  constructor(key: string, value: any, message: string) {
    super(message)

    this.key = key
    this.value = value
    this.message = message
  }
}
