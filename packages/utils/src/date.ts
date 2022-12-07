import dayjs, {
  Dayjs,
  ConfigType,
  OptionType,
  OpUnitType,
  UnitType,
  ManipulateType,
} from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isBetween from 'dayjs/plugin/isBetween'
import calendar from 'dayjs/plugin/calendar'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration, { Duration } from 'dayjs/plugin/duration'
import {
  IsoDate,
  UnixDate,
  StringDate,
  InclusivityType,
  DurationUnits,
  CalendarType,
} from '@/types'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)
dayjs.extend(calendar)
dayjs.extend(utc)
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(customParseFormat)

export class DateUtil {
  private static _dayjs(date: ConfigType, format?: OptionType): Dayjs {
    return format ? dayjs(date, format) : dayjs(date)
  }

  public static toTimestamp(date: ConfigType, format?: OptionType): UnixDate {
    return this._dayjs(date, format).unix()
  }

  public static toMs(date: ConfigType, format?: OptionType): UnixDate {
    return this._dayjs(date, format).valueOf()
  }

  public static toISO(date?: ConfigType, format?: OptionType): IsoDate {
    return this._dayjs(date, format).toISOString()
  }

  public static toHuman(
    date: ConfigType,
    format?: OptionType,
    calendar?: CalendarType,
  ): StringDate {
    return this._dayjs(date, format).calendar(null, calendar)
  }

  public static toRFC3339(date: ConfigType) {
    if (!date) {
      return ''
    }

    return this._dayjs(date).utc(true).format('YYYY-MM-DDTHH:mm:ss') + 'Z'
  }

  public static toDate(date: ConfigType, format?: OptionType): Date {
    return this._dayjs(date, format).toDate()
  }

  public static date(date?: ConfigType, format?: OptionType): Dayjs {
    return this._dayjs(date, format)
  }

  public static utc(date?: ConfigType, format?: OptionType): Dayjs {
    return this._dayjs(date, format).utc()
  }

  public static now(format?: OptionType): Dayjs {
    return this._dayjs(undefined, format)
  }

  public static startOf(
    unit: OpUnitType,
    date: ConfigType,
    format?: OptionType,
  ) {
    return this._dayjs(date, format).startOf(unit)
  }

  public static get(date: ConfigType, unit: UnitType): number {
    return this._dayjs(date).get(unit)
  }

  public static getAsObject(
    date: ConfigType,
    unit: UnitType[],
  ): {
    [K in typeof unit[number]]: number
  } {
    return unit.reduce(
      (acc, item) => {
        acc[item] = this.get(date, item)

        return acc
      },
      {} as {
        [K in typeof unit[number]]: number
      },
    )
  }

  public static duration(units: DurationUnits): Duration {
    return dayjs.duration(units)
  }

  public static millisecondOf(duration: Duration): number {
    return duration.asMilliseconds()
  }

  public static add(
    targetDate: ConfigType,
    value: number,
    unit?: ManipulateType,
  ): Dayjs {
    return this._dayjs(targetDate).add(value, unit)
  }

  public static format(date: ConfigType, format: string): IsoDate {
    return this._dayjs(date).format(format)
  }

  public static subtract(
    targetDate: ConfigType,
    value: number,
    unit?: ManipulateType,
  ): Dayjs {
    return this._dayjs(targetDate).subtract(value, unit)
  }

  public static isSame(
    targetDate?: ConfigType,
    comparisonDate?: ConfigType,
    unit?: OpUnitType,
  ): boolean {
    return this._dayjs(targetDate).isSame(comparisonDate, unit)
  }

  public static isBefore(
    targetDate?: ConfigType,
    comparisonDate?: ConfigType,
  ): boolean {
    return this._dayjs(targetDate).isBefore(comparisonDate)
  }

  public static isAfter(
    targetDate?: ConfigType,
    comparisonDate?: ConfigType,
  ): boolean {
    return this._dayjs(targetDate).isAfter(comparisonDate)
  }

  public static isSameOrAfter(
    targetDate?: ConfigType,
    comparisonDate?: ConfigType,
  ): boolean {
    return this._dayjs(targetDate).isSameOrAfter(comparisonDate)
  }

  public static isSameOrBefore(
    targetDate?: ConfigType,
    comparisonDate?: ConfigType,
  ): boolean {
    return this._dayjs(targetDate).isSameOrBefore(comparisonDate)
  }

  public static isBetween(
    targetDate?: ConfigType,
    startDate?: ConfigType,
    endDate?: ConfigType,
    unit?: ManipulateType,
    inclusivity?: InclusivityType,
  ): boolean {
    return this._dayjs(targetDate).isBetween(
      startDate,
      endDate,
      unit,
      inclusivity,
    )
  }

  public static diff(
    targetDate: ConfigType,
    comparisonDate: ConfigType,
    unit?: UnitType,
    isTruncated = false,
  ): number {
    return this._dayjs(targetDate).diff(
      this._dayjs(comparisonDate),
      unit,
      isTruncated,
    )
  }

  public static async locale(
    preset?: string | ILocale,
    object?: Partial<ILocale>,
    isLocal?: boolean,
  ): Promise<string> {
    if (typeof preset === 'string') {
      return await import(`dayjs/locale/${preset}`).then(() =>
        dayjs.locale(preset),
      )
    }

    return dayjs.locale(preset, object, isLocal)
  }
}
