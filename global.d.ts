export declare global {
  interface FCWithoutComponent<P = {}> {
    propTypes?: WeakValidationMap<P> | undefined
    contextTypes?: ValidationMap<any> | undefined
    defaultProps?: Partial<P> | undefined
    displayName?: string | undefined
  }

  type EP<E extends keyof JSX.IntrinsicElements> = Omit<JSX.IntrinsicElements[E], 'ref'> & {
    as?: E
    customRef?: JSX.IntrinsicElements[E]['ref']
  }

  type MainProps = JSX.IntrinsicElements['main']
  type AsideProps = JSX.IntrinsicElements['aside']
  type DivProps = JSX.IntrinsicElements['div']
  type FooterProps = JSX.IntrinsicElements['footer']
  type HeaderProps = JSX.IntrinsicElements['header']
  type LiProps = JSX.IntrinsicElements['li']
  type ULProps = JSX.IntrinsicElements['ul']
  type OLProps = JSX.IntrinsicElements['ol']
  type NavProps = JSX.IntrinsicElements['nav']
  type SpanProps = JSX.IntrinsicElements['span']
  type LabelProps = JSX.IntrinsicElements['label']

  type OverloadedArguments<T> = T extends {
    new (...args: infer A1): any
    new (...args: infer A2): any
    new (...args: infer A3): any
    new (...args: infer A4): any
  }
    ? A1 | A2 | A3 | A4
    : T extends {
        new (...args: infer A1): any
        new (...args: infer A2): any
        new (...args: infer A3): any
      }
    ? A1 | A2 | A3
    : T extends { new (...args: infer A1): any; new (...args: infer A2): any }
    ? A1 | A2
    : T extends new (...args: infer A) => any
    ? A
    : any

  // Utils
  type PartialAndNullable<D extends Record<string, any>, K = keyof D> = {
    [k in K]?: D[K] | null
  }
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
}
