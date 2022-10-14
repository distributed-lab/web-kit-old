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
import { IsoDate, UnixDate } from '@/types'

export class DateUtil {
  private static _dayjs(date: ConfigType, format?: OptionType): Dayjs {
    dayjs.extend(isSameOrBefore)
    dayjs.extend(isSameOrAfter)

    return format ? dayjs(date, format) : dayjs(date)
  }

  public static toTimestamp(date: ConfigType, format?: OptionType): UnixDate {
    return this._dayjs(date, format).unix()
  }

  public static toISO(date?: ConfigType): IsoDate {
    return this._dayjs(date).toISOString()
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
