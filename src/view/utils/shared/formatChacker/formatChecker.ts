export const isSet = <Others>(whatever: Others | null | undefined): whatever is Others =>
  whatever !== null && whatever !== undefined

export const isNotSet = <Others>(
  whatever: Others | null | undefined
): whatever is null | undefined => whatever === null || whatever === undefined

export const isAry = <Others>(whatever: Others | any[]): whatever is any[] =>
  Array.isArray(whatever)

export const isEmptyArray = (whatever: any) => isAry(whatever) && whatever.length === 0

export const isNotEmptyArray = (whatever: any) => isAry(whatever) && whatever.length !== 0

export const isString = <Others>(whatever: Others | string): whatever is string =>
  typeof whatever === 'string'

export const isEmptyString = (whatever: any) => isString(whatever) && whatever.length === 0

export const isNotEmptyString = (whatever: any): whatever is string =>
  isString(whatever) && whatever.length !== 0

export const isBoolean = <Others>(whatever: boolean | Others): whatever is boolean =>
  typeof whatever === 'boolean'

export const isTrue = <Others>(whatever: Others | true | false): whatever is true =>
  isBoolean(whatever) && whatever

export const isFalse = <Others>(whatever: Others | true | false): whatever is false =>
  isBoolean(whatever) && !whatever

const formatChecker = {
  isSet,
  isNotSet,
  isAry,
  isEmptyArray,
  isNotEmptyArray,
  isString,
  isEmptyString,
  isNotEmptyString,
  isBoolean,
  isTrue,
  isFalse
}

export default formatChecker
