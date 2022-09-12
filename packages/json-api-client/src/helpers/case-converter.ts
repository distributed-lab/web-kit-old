import isPlainObject from 'lodash/isPlainObject'
import camelCase from 'lodash/camelCase'

type CaseConverter = (value: string) => string

/**
 * Deeply convert all resource object keys to the camel case.
 * Can be used to convert JsonApi data object keys.
 */
export function toCamelCaseDeep<T>(object: T): T {
  return convertCaseDeep(object, camelCase)
}

function toCase(value: string, converter: CaseConverter) {
  return value
    .split('.')
    .map(str => converter(str))
    .join('.')
}

function convertCaseDeep<T>(object: T, converter: CaseConverter): T {
  if (Array.isArray(object)) {
    const res = object.map(obj => convertCaseDeep(obj, converter))
    return res as unknown as T
  }

  if (isPlainObject(object)) {
    const convertedObject: Record<string, unknown> = {}

    Object.keys(object).forEach(key => {
      const objectRecord = object as Record<string, unknown>
      convertedObject[toCase(key, converter)] = convertCaseDeep(
        objectRecord[key],
        converter,
      )
    })

    return convertedObject as T
  }

  return object
}
