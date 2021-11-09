import { forwardRef, cloneElement, useRef, HTMLAttributes } from 'react'
import { Transition } from 'react-transition-group'

import tw from 'twin.macro'

import { Status } from '@view/constants/components/transition'

import type { TransitionProps } from '@view/types/components/transition'
import { CallbackFunctionVariadic } from '@view/types/shared/function'

import useForkRef from '@view/hooks/useForkRef'

export interface FadeProps<T = HTMLDivElement> extends TransitionProps, HTMLAttributes<T> {
  inProps: boolean
  // 這邊不使用 ReactNode，原因為 TS 會一直警告 children 無 ref 和 props，
  // https://github.com/Microsoft/TypeScript/issues/6471
  // 上述 issue 解決方式為 any
  children: any
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const {
    inProps,
    children,
    onEntering,
    onEnter,
    onEntered,
    onExiting,
    onExit,
    onExited,
    appear = true,
    timeout = 300,
    ...restProps
  } = props
  const nodeRef = useRef<HTMLElement>(null!)
  const foreignRef = useForkRef(children.ref, ref)
  const handleRef = useForkRef(nodeRef, foreignRef)

  const normalizedTransitionCallback =
    (callback?: CallbackFunctionVariadic) =>
    (maybeIsAppearing?: any): void => {
      if (callback) {
        const node = nodeRef.current

        // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
        if (maybeIsAppearing === undefined) {
          callback(node)
        } else {
          callback(node, maybeIsAppearing)
        }
      }
    }

  const reflow = (node: HTMLElement) => node.scrollTop

  const handleEntering = normalizedTransitionCallback(onEntering)

  const handleEnter = normalizedTransitionCallback((node: HTMLElement, isAppearing: any) => {
    reflow(node) // So the animation always start from the start.

    if (onEnter) {
      onEnter(node, isAppearing)
    }
  })

  const handleEntered = normalizedTransitionCallback(onEntered)
  const handleExiting = normalizedTransitionCallback(onExiting)
  const handleExit = normalizedTransitionCallback(onExit)
  const handleExited = normalizedTransitionCallback(onExited)

  return (
    <Transition
      appear={appear}
      timeout={timeout}
      in={inProps}
      nodeRef={nodeRef}
      onEntering={handleEntering}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onExiting={handleExiting}
      onExit={handleExit}
      onExited={handleExited}
    >
      {(status: Status, childProps: Object) => {
        const isEntered = status === Status.entered
        return cloneElement(children, {
          style: {
            ...tw`transition-opacity`,
            opacity: isEntered ? 1 : 0,
            transitionDuration: `${timeout}ms`,
            ...children.props.style
          },
          ref: handleRef,
          ...restProps,
          ...childProps
        })
      }}
    </Transition>
  )
})

export default Fade
