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
import relativeTime from 'dayjs/plugin/relativeTime'
import { IsoDate, UnixDate } from '@/types'

export class Time {
  #date: Dayjs

  constructor(date?: ConfigType, format?: OptionType) {
    this.#date = this._dayjs(date, format)
  }

  private _dayjs(date?: ConfigType, format?: OptionType): Dayjs {
    dayjs.extend(isSameOrBefore)
    dayjs.extend(isSameOrAfter)
    dayjs.extend(relativeTime)

    return dayjs(date, format)
  }

  public get dayjs(): Dayjs {
    return this.#date
  }

  public get isValid(): boolean {
    return this.#date.isValid()
  }

  public clone(): Time {
    return new Time(this.#date.clone())
  }

  public get timestamp(): UnixDate {
    return this.#date.unix()
  }

  public get ISO(): IsoDate {
    return this.#date.toISOString()
  }

  public get(unit: UnitType): number {
    return this.#date.get(unit)
  }

  public getAsObject(unit: UnitType[]): {
    [K in typeof unit[number]]: number
  } {
    return unit.reduce(
      (acc, item) => {
        acc[item] = this.get(item)

        return acc
      },
      {} as {
        [K in typeof unit[number]]: number
      },
    )
  }

  public add(value: number, unit?: ManipulateType): Time {
    this.#date = this.#date.add(value, unit)
    return this
  }

  public format(format?: string): IsoDate {
    return this.#date.format(format)
  }

  public subtract(value: number, unit?: ManipulateType): Time {
    this.#date = this.#date.subtract(value, unit)
    return this
  }

  public isSame(comparisonDate?: ConfigType, unit?: OpUnitType): boolean {
    return this.#date.isSame(comparisonDate, unit)
  }

  public isBefore(comparisonDate?: ConfigType): boolean {
    return this.#date.isBefore(comparisonDate)
  }

  public isAfter(comparisonDate?: ConfigType): boolean {
    return this.#date.isAfter(comparisonDate)
  }

  public isSameOrAfter(comparisonDate?: ConfigType): boolean {
    return this.#date.isSameOrAfter(comparisonDate)
  }

  public isSameOrBefore(comparisonDate?: ConfigType): boolean {
    return this.#date.isSameOrBefore(comparisonDate)
  }

  public diff(
    comparisonDate: Time,
    unit?: UnitType,
    isTruncated = false,
  ): number {
    return this.#date.diff(comparisonDate.dayjs, unit, isTruncated)
  }

  public getFrom(date: ConfigType): string {
    return this.#date.from(date)
  }

  public get fromNow(): string {
    return this.#date.fromNow()
  }

  public getTo(date: ConfigType): string {
    return this.#date.to(date)
  }

  public get toNow(): string {
    return this.#date.toNow()
  }
}

export const time = (date: ConfigType, format?: OptionType): Time =>
  new Time(date, format)
