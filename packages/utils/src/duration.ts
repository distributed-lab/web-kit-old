import { Duration } from 'dayjs/plugin/duration'
import { TimeDurationUnitsObject, UnixDate } from '@/types'
import dayjs from 'dayjs'

export class TimeDuration {
  #duration: Duration

  constructor(units: TimeDurationUnitsObject) {
    this.#duration = this._duration(units)
  }

  private _duration(units: TimeDurationUnitsObject): Duration {
    return dayjs.duration(units)
  }

  public asMilliseconds(): UnixDate {
    return this.#duration.asMilliseconds()
  }
  public asSeconds(): UnixDate {
    return this.#duration.asSeconds()
  }
  public asMinutes(): UnixDate {
    return this.#duration.asMinutes()
  }
  public asHours(): UnixDate {
    return this.#duration.asHours()
  }
  public asDays(): UnixDate {
    return this.#duration.asDays()
  }
  public asWeeks(): UnixDate {
    return this.#duration.asWeeks()
  }
  public asMonths(): UnixDate {
    return this.#duration.asMonths()
  }
  public asYears(): UnixDate {
    return this.#duration.asYears()
  }
  public humanize(): string {
    return this.#duration.humanize()
  }
}

export const timeDuration = (units: TimeDurationUnitsObject): TimeDuration =>
  new TimeDuration(units)
