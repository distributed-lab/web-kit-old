import dayjs, { Dayjs } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  IsoDate,
  UnixDate,
  TimeDate,
  TimeFormat,
  TimeOpUnit,
  TimeUnit,
  TimeManipulate,
} from '@/types'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(relativeTime)

export class Time {
  #date: Dayjs

  constructor(date?: TimeDate, format?: TimeFormat) {
    this.#date = this._dayjs(date, format)
  }

  private _dayjs(date?: TimeDate, format?: TimeFormat): Dayjs {
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

  public get(unit: TimeUnit): number {
    return this.#date.get(unit)
  }

  public getAsObject(unit: TimeUnit[]): {
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

  public add(value: number, unit?: TimeManipulate): Time {
    this.#date = this.#date.add(value, unit)
    return this
  }

  public format(format?: string): IsoDate {
    return this.#date.format(format)
  }

  public subtract(value: number, unit?: TimeManipulate): Time {
    this.#date = this.#date.subtract(value, unit)
    return this
  }

  public isSame(comparisonDate?: TimeDate, unit?: TimeOpUnit): boolean {
    return this.#date.isSame(comparisonDate, unit)
  }

  public isBefore(comparisonDate?: TimeDate): boolean {
    return this.#date.isBefore(comparisonDate)
  }

  public isAfter(comparisonDate?: TimeDate): boolean {
    return this.#date.isAfter(comparisonDate)
  }

  public isSameOrAfter(comparisonDate?: TimeDate): boolean {
    return this.#date.isSameOrAfter(comparisonDate)
  }

  public isSameOrBefore(comparisonDate?: TimeDate): boolean {
    return this.#date.isSameOrBefore(comparisonDate)
  }

  public diff(
    comparisonDate: Time,
    unit?: TimeUnit,
    isTruncated = false,
  ): number {
    return this.#date.diff(comparisonDate.dayjs, unit, isTruncated)
  }

  public getFrom(date: TimeDate): string {
    return this.#date.from(date)
  }

  public get fromNow(): string {
    return this.#date.fromNow()
  }

  public getTo(date: TimeDate): string {
    return this.#date.to(date)
  }

  public get toNow(): string {
    return this.#date.toNow()
  }
}

export const time = (date: TimeDate, format?: TimeFormat): Time =>
  new Time(date, format)
