import Joi from 'joi'

class Validator {
  static isNotSet(value: unknown): value is null | undefined {
    return value === undefined || value === null
  }

  static isSet<O>(value: O | null | undefined): value is O {
    return value !== undefined && value !== null
  }

  static isArray(value: unknown): value is Array<any> {
    return Array.isArray(value)
  }

  static isNumber(value: unknown): boolean {
    return typeof value === 'number'
  }

  static isString(value: unknown): boolean {
    return typeof value === 'string'
  }

  static isStringEmpty(value: string): boolean {
    return value === ''
  }

  static isArrayEmpty(value: unknown): boolean {
    return this.isArray(value) && value.length === 0
  }

  static isPasswordFormat(value: string): boolean {
    const schema = Joi.string()
      .regex(/^[a-zA-Z0-9]+$/)
      .regex(/\d/)
      .regex(/[a-z]/i)
      .min(6)
      .max(12)
    const result = schema.validate(value)
    return !result.error
  }

  static isEmail(value: string): boolean {
    const schema = Joi.string().email({ tlds: { allow: false } })
    const result = schema.validate(value)
    return !result.error
  }

  /**
   * @author Spencer Lin 2021-09-14
   * 在最大上限範圍之內
   * @param maxLimit 上限值
   * @param value 檢測值
   */
  static isWithinMaxLimit(maxLimit: number, value: string): boolean {
    const schema = Joi.string().max(maxLimit)
    const result = schema.validate(value)

    return !result.error
  }

  /**
   * @author Spencer Lin 2021-09-14
   * 檢查是否為連結格式
   * @param value 檢測值
   */
  static isURI(value: string): boolean {
    // const expression =
    //   /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    const expression =
      /\b(https?|ftp|file):\/\/[a-zA-Z0-9]+[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/gi
    const regex = new RegExp(expression)
    const isValid = value.match(regex)
    return Boolean(isValid)
  }

  /**
   * @author Spencer Lin 2021-10-21
   * 檢查是否為為正確數值(包含正負號)
   * @param value 檢測值
   */
  static isAbsoluteNumber(value: unknown): boolean {
    if (typeof value === 'string') {
      return !Number.isNaN(Number(value))
    }

    return typeof value === 'number'
  }
}

export default Validator
