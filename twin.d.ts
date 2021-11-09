import { ComponentType } from 'react'

import styledImport, { css as cssImport } from 'styled-components'
import { TwFn, TemplateFn } from 'twin.macro'

declare module 'twin.macro' {
  type TwComponentWrapper = <T extends ComponentType<any>>(component: T) => TemplateFn<T>
  const tw: TwFn & TwComponentMap & TwComponentWrapper
  const css: typeof cssImport
  const styled: typeof styledImport

  export = tw
  export { css, styled }
}

declare module 'react' {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp
  }
  // The inline svg css prop
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp
  }
}
