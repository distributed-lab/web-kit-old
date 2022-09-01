import { BigNumber } from 'bignumber.js'

const ROUNDING_MODES = {
  ROUND_UP: 0,
  ROUND_DOWN: 1,
  ROUND_CEIL: 2,
  ROUND_FLOOR: 3,
  ROUND_HALF_UP: 4,
  ROUND_HALF_DOWN: 5,
  ROUND_HALF_EVEN: 6,
  ROUND_HALF_CEIL: 7,
  ROUND_HALF_FLOOR: 8,
}

const ONE = 1000000
const DECIMAL_PLACES = 2

export class MathUtil {
  static toString(a: number, DECIMALS = DECIMAL_PLACES) {
    return new BigNumber(a).toFormat(DECIMALS)
  }

  static add(
    a: string,
    b: string,
    ROUND_TYPE = ROUNDING_MODES.ROUND_UP,
    DECIMALS = DECIMAL_PLACES,
  ): string {
    if (!this._isValidParams('add', a, b)) return '0'

    BigNumber.config({ ROUNDING_MODE: ROUND_TYPE as BigNumber.RoundingMode })
    BigNumber.config({ DECIMAL_PLACES: DECIMALS })

    const one = new BigNumber(a)
    const two = new BigNumber(b)

    const result = one.plus(two)
    return result.toFixed(DECIMALS)
  }

  static subtract(
    a: string,
    b: string,
    ROUND_TYPE = ROUNDING_MODES.ROUND_UP,
    DECIMALS = DECIMAL_PLACES,
  ): string {
    if (!this._isValidParams('subtract', a, b)) return '0'

    BigNumber.config({ ROUNDING_MODE: ROUND_TYPE as BigNumber.RoundingMode })
    BigNumber.config({ DECIMAL_PLACES: DECIMALS })

    const one = new BigNumber(a)
    const two = new BigNumber(b)

    const result = one.minus(two)
    return result.toFixed(DECIMALS)
  }

  static multiply(
    a: string,
    b: string,
    ROUND_TYPE = ROUNDING_MODES.ROUND_UP,
    DECIMALS = 0,
  ): string {
    if (!this._isValidParams('big-multiply', a, b)) return '0'

    BigNumber.config({ ROUNDING_MODE: ROUND_TYPE as BigNumber.RoundingMode })
    BigNumber.config({ DECIMAL_PLACES: DECIMALS })

    const mul1 = new BigNumber(new BigNumber(a).times(new BigNumber(ONE)))
    const mul2 = new BigNumber(new BigNumber(b).times(new BigNumber(ONE)))
    const result = mul1.times(mul2)

    BigNumber.config({ DECIMAL_PLACES: DECIMALS })

    return result
      .dividedBy(new BigNumber(ONE))
      .dividedBy(new BigNumber(ONE))
      .toFixed(DECIMALS)
  }

  static divide(
    a: string,
    b: string,
    ROUND_TYPE = ROUNDING_MODES.ROUND_UP,
    DECIMALS = DECIMAL_PLACES,
  ): string {
    if (!this._isValidParams('big-divide', a, b)) return '0'

    BigNumber.config({ ROUNDING_MODE: ROUND_TYPE as BigNumber.RoundingMode })
    BigNumber.config({ DECIMAL_PLACES: DECIMALS })

    const num = new BigNumber(new BigNumber(a).times(new BigNumber(ONE)))
    const denum = new BigNumber(new BigNumber(b).times(new BigNumber(ONE)))

    const result = num.dividedBy(denum)

    return result.toFixed(DECIMALS)
  }

  // a > b => 1
  // a < b => -1
  // a === b => 0
  static compare(a: string, b: string): number {
    if (!this._isValidParams('comparedTo', a, b)) return -1

    const one = new BigNumber(a)
    const two = new BigNumber(b)

    return one.comparedTo(two)
  }

  static toFormat(
    value: string,
    fmt?: BigNumber.Format,
    DECIMALS = DECIMAL_PLACES,
    ROUND_TYPE = ROUNDING_MODES.ROUND_UP,
  ) {
    return new BigNumber(value).toFormat(
      DECIMALS,
      ROUND_TYPE as BigNumber.RoundingMode,
      fmt,
    )
  }

  static _isValidParams(_op: string, a: string, b: string, c = 0): boolean {
    try {
      new BigNumber(a)
      new BigNumber(b)
      new BigNumber(c)
    } catch (err) {
      return false
    }
    return true
  }

  static get roundingModes(): typeof ROUNDING_MODES {
    return ROUNDING_MODES
  }
}
