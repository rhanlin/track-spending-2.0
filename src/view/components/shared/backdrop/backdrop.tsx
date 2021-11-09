import { forwardRef } from 'react'

import tw from 'twin.macro'

import Fade from '@view/components/shared/fade'
import type { FadeProps } from '@view/components/shared/fade'

export interface BackdropProps extends FadeProps {
  invisible?: boolean
  hidden?: boolean
}

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(function Backdrop(props, ref) {
  const { children, invisible = false, hidden = false, ...restProps } = props
  return (
    <Fade {...restProps}>
      <div
        ref={ref}
        css={[
          tw`fixed flex items-center justify-center bg-transparent -webkit-tap-highlight-color[transparent]`,
          invisible === false && hidden === false && tw`bg-black bg-opacity-50`,
          hidden === false && tw`top-0 left-0 right-0 bottom-0`
        ]}
      >
        {children}
      </div>
    </Fade>
  )
})

export default Backdrop
