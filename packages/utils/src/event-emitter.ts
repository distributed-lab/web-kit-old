import { EventKey, EventMap, EventHandler, EventHandlers } from '@/types'

export class EventEmitter<T extends EventMap> {
  #handlers: EventHandlers<T> = {}

  public on<K extends EventKey<T>>(key: K, fn: EventHandler<T[K]>): void {
    this.#handlers[key] = (this.#handlers[key] || [])?.concat(fn)
  }

  public off<K extends EventKey<T>>(key: K, fn: EventHandler<T[K]>): void {
    this.#handlers[key] = (this.#handlers[key] || [])?.filter(f => f !== fn)
  }

  public emit<K extends EventKey<T>>(key: K, data: T[K]): void {
    ;(this.#handlers[key] || [])?.forEach((fn: EventHandler<T[K]>) => {
      fn(data)
    })
  }
}
