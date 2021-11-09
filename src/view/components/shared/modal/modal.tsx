import { forwardRef, useState, useRef } from 'react'

import tw from 'twin.macro'

import useEventCallback from '@view/hooks/useEventCallback'
import useForkRef from '@view/hooks/useForkRef'

import Backdrop from '@view/components/shared/backdrop'
import type { BackdropProps } from '@view/components/shared/backdrop'
import Portal from '@view/components/shared/portal'
import type { PortalProps } from '@view/components/shared/portal'

export interface ModalProps extends PortalProps {
  open: boolean
  onClose?: () => void | undefined
  onBackdropClick?: () => void
  backdropProps?: Partial<BackdropProps>
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(props, ref) {
  const {
    open,
    children,
    onClose,
    onBackdropClick,
    backdropProps = {},
    disablePortal,
    container,
    ...restProps
  } = props
  const { onEnter, onExited, ...restBackdropProps } = backdropProps
  const [exited, setExited] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null!)
  const handleRef = useForkRef(modalRef, ref)

  const handleEnter = () => {
    setExited(false)

    if (onEnter) {
      onEnter()
    }
  }

  const handleExited = () => {
    setExited(true)

    if (onExited) {
      onExited()
    }
  }

  const handleMounted = () => {
    // Fix a bug on Chrome where the scroll isn't initially 0.
    modalRef.current.scrollTop = 0
  }

  const handlePortalRef = useEventCallback((node: HTMLElement) => {
    if (!node) {
      return
    }

    if (open) {
      handleMounted()
    } else {
      node.setAttribute('aria-hidden', 'true')
    }
  })

  const handleBackdropClick = (event: React.SyntheticEvent) => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (onBackdropClick) {
      onBackdropClick()
    }

    if (onClose) {
      onClose()
    }
  }

  if (!open && exited) {
    return null
  }

  return (
    <Portal ref={handlePortalRef} disablePortal={disablePortal} container={container}>
      <div
        role="presentation"
        css={[tw`fixed top-0 left-0 z-10 flex`, open === false && exited && tw`invisible`]}
        ref={handleRef}
        {...restProps}
      >
        <Backdrop
          inProps={open}
          onClick={handleBackdropClick}
          onEnter={handleEnter}
          onExited={handleExited}
          {...restBackdropProps}
        >
          {children}
        </Backdrop>
      </div>
    </Portal>
  )
})

export default Modal
