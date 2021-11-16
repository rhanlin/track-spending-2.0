import { useState, forwardRef, cloneElement, isValidElement } from 'react'
import { createPortal } from 'react-dom'

import useEnhancedEffect from '@/view/hooks/useEnhancedEffect'
import useForkRef from '@/view/hooks/useForkRef'
import setRef from '@/view/utils/shared/setRef'

export interface PortalProps {
  // 這邊不使用 ReactNode，原因為 TS 會一直警告 children 無 ref 和 props，
  // https://github.com/Microsoft/TypeScript/issues/6471
  // 上述 issue 解決方式為 any
  children: any
  disablePortal?: boolean
  container?: HTMLElement
}

const Portal = forwardRef<HTMLElement, PortalProps>(function Portal(props, ref) {
  const { disablePortal = false, container, children } = props
  const [mountNode, setMountNode] = useState<HTMLElement>()
  const isValidChildren = isValidElement(children)
  const handleRef = useForkRef(isValidChildren ? (children as any).ref : null, ref)

  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(container || document.body)
    }
  }, [container, disablePortal])

  useEnhancedEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode)
      return () => {
        setRef(ref, null)
      }
    }
  }, [ref, mountNode, disablePortal])

  if (disablePortal) {
    if (isValidChildren) {
      return cloneElement(children as any, {
        ref: handleRef
      })
    }
    return children
  }

  return mountNode ? createPortal(children, mountNode as Element) : null
})

export default Portal
