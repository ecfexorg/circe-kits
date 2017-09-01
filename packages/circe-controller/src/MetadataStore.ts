export default class MetadataStore {
  public static get <T = any> (target: any, key: string, defaultValue?: T): T {
    return Reflect.getMetadata(key, target) || defaultValue
  }

  public static set <T = any> (target: any, key: string, value: T): void {
    return Reflect.defineMetadata(key, value, target)
  }

  public static push (target: any, list: string, value: any): void {
    let metadata = MetadataStore.get<any>(target, list, [])

    if (!Array.isArray(metadata)) {
      metadata = [metadata]
    }

    metadata.push(value)
    MetadataStore.set(target, list, metadata)
  }
}
