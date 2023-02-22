export type EventMap = Record<string, unknown>

export type EventKey<T extends EventMap> = string & keyof T

export type EventHandler<T> = (params: T) => void

export type EventHandlers<T extends EventMap> = {
  [K in keyof T]?: Array<(p: T[K]) => void>
}
