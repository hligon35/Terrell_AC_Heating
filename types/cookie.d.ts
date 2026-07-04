declare module 'cookie' {
  const cookie: any
  export default cookie
}
declare module 'cookie' {
  interface CookieSerializeOptions {
    maxAge?: number
    expires?: Date
    path?: string
    domain?: string
    secure?: boolean
    httpOnly?: boolean
    sameSite?: boolean | 'lax' | 'strict' | 'none'
  }
  export function serialize(name: string, val: string, options?: CookieSerializeOptions): string
  export function parse(str: string): { [key: string]: string }
  const cookie: { serialize: typeof serialize; parse: typeof parse }
  export default cookie
}
