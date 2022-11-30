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
import calendar from 'dayjs/plugin/calendar'
import { IsoDate, UnixDate, StringDate } from '@/types'

const INPUT_DATE_FORMAT: OptionType = 'DD/MM/YYYY'

export class DateUtil {
  static get ISOFormat(): IsoDate {
    return 'YYYY-MM-DDT00:00:00+00:00'
  }

  static get minDate(): IsoDate {
    return this.toISO('01/01/1900')
  }

  private static _dayjs(date: ConfigType, format?: OptionType): Dayjs {
    dayjs.extend(isSameOrBefore)
    dayjs.extend(isSameOrAfter)
    dayjs.extend(calendar)

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

  public static toHuman(date: ConfigType, format?: OptionType): StringDate {
    return this._dayjs(date, format).calendar(null, {
      sameDay: '[Today at] HH:mm',
      lastDay: '[Yesterday at] HH:mm',
      lastWeek: '[Last] dddd [at] HH:mm',
      nextWeek: '[Next] dddd [at] HH:mm',
      sameElse: 'DD/MM/YYYY',
    })
  }

  public static toInput(date: ConfigType, format?: OptionType): StringDate {
    return this._dayjs(date, format).format(INPUT_DATE_FORMAT as string)
  }

  public static now(format?: OptionType): Dayjs {
    return this._dayjs(undefined, format)
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
}
