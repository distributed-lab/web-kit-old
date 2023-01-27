import { Duration as DurationPlugin } from 'dayjs/plugin/duration'
import { DurationUnitsObject } from '@/types'
import dayjs from 'dayjs'

export class Duration {
  #duration: DurationPlugin

  constructor(units: DurationUnitsObject) {
    this.#duration = this._duration(units)
  }

  private _duration(units: DurationUnitsObject): DurationPlugin {
    return dayjs.duration(units)
  }

  public get Milliseconds(): number {
    return this.#duration.asMilliseconds()
  }
  public get Seconds(): number {
    return this.#duration.asSeconds()
  }
  public get Minutes(): number {
    return this.#duration.asMinutes()
  }
  public get Hours(): number {
    return this.#duration.asHours()
  }
  public get Days(): number {
    return this.#duration.asDays()
  }
  public get Weeks(): number {
    return this.#duration.asWeeks()
  }
  public get Months(): number {
    return this.#duration.asMonths()
  }
  public get Years(): number {
    return this.#duration.asYears()
  }
  public get humanized(): string {
    return this.#duration.humanize()
  }
}

export const duration = (units: DurationUnitsObject): Duration =>
  new Duration(units)
