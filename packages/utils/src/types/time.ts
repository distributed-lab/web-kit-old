import { Dayjs } from 'dayjs'

export type IsoDate = string // RFC3999Nano ISO Date String

export type UnixDate = number // Unix time

export type TimeDate = string | number | Date | Dayjs | null | undefined

export type TimeFormat =
  | {
      locale?: string
      format?: string
      utc?: boolean
    }
  | string
  | string[]

export type TimeUnitShort = 'd' | 'D' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'

export type TimeUnitLong =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'month'
  | 'year'
  | 'date'

export type TimeUnitLongPlural =
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'months'
  | 'years'
  | 'dates'

export type TimeUnit = TimeUnitLong | TimeUnitLongPlural | TimeUnitShort

export type TimeOpUnit = TimeUnit | 'week' | 'weeks' | 'w'

export type TimeManipulate = Exclude<TimeOpUnit, 'date' | 'dates'>
