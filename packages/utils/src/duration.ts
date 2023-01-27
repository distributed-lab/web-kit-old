import { Duration as DurationPlugin } from 'dayjs/plugin/duration'
import { DurationUnitsObject } from '@/types'
import dayjs from 'dayjs'

export class Duration {
  readonly #duration: DurationPlugin

  constructor(units: DurationUnitsObject) {
    this.#duration = this._duration(units)
  }

  private _duration(units: DurationUnitsObject): DurationPlugin {
    return dayjs.duration(units)
  }

  public get duration(): DurationPlugin {
    return this.#duration
  }

  public get asMilliseconds(): number {
    return this.#duration.asMilliseconds()
  }

  public get milliseconds(): number {
    return this.#duration.milliseconds()
  }

  public get asSeconds(): number {
    return this.#duration.asSeconds()
  }

  public get seconds(): number {
    return this.#duration.seconds()
  }

  public get asMinutes(): number {
    return this.#duration.asMinutes()
  }

  public get minutes(): number {
    return this.#duration.minutes()
  }

  public get asHours(): number {
    return this.#duration.asHours()
  }

  public get hours(): number {
    return this.#duration.hours()
  }

  public get asDays(): number {
    return this.#duration.asDays()
  }

  public get days(): number {
    return this.#duration.days()
  }

  public get asWeeks(): number {
    return this.#duration.asWeeks()
  }

  public get weeks(): number {
    return this.#duration.weeks()
  }

  public get asMonths(): number {
    return this.#duration.asMonths()
  }

  public get months(): number {
    return this.#duration.months()
  }

  public get asYears(): number {
    return this.#duration.asYears()
  }

  public get years(): number {
    return this.#duration.years()
  }

  public get humanized(): string {
    return this.#duration.humanize()
  }

  public format(formatStr?: string): string {
    return this.#duration.format(formatStr)
  }
}

export const duration = (units: DurationUnitsObject): Duration =>
  new Duration(units)
