declare function requireDir (path: string, options: any): any

declare module requireDir {}

declare module 'require-dir' {
  export = requireDir
}
