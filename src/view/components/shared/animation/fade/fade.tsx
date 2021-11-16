import { HTMLAttributes, useRef, cloneElement } from 'react'
import { Transition } from 'react-transition-group'

import tw from 'twin.macro'

import { States } from '@/view/constants/components/transition'

import { TransitionProps } from '@/view/types/components/transition'

export type FadeProps = HTMLAttributes<HTMLDivElement> &
  TransitionProps & {
    // 這邊不使用 ReactNode，原因為 TS 會一直警告 children 無 ref 和 props，
    // https://github.com/Microsoft/TypeScript/issues/6471
    // 上述 issue 解決方式為 any
    children: any
    inProps: boolean
  }

function Fade(props: FadeProps) {
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
  const nodeRef = useRef<HTMLDivElement>(null)
  const normalizedTransitionCallback = (callback?: Function) => (maybeIsAppearing?: any) => {
    // 此函式僅用來將 node, isAppearing 帶給各個生命週期函式作為引數
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

  // const reflow = (node: HTMLElement) => node.scrollTop

  const handleEntering = normalizedTransitionCallback(onEntering)

  const handleEnter = normalizedTransitionCallback((node: HTMLElement, isAppearing: any) => {
    // reflow(node) // So the animation always start from the start.

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
      nodeRef={nodeRef}
      in={inProps}
      timeout={{
        enter: timeout,
        exit: timeout
      }}
      onEntering={handleEntering}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onExiting={handleExiting}
      onExit={handleExit}
      onExited={handleExited}
      {...restProps}
    >
      {(states: States, childProps: Object) => {
        const isEntered = states === States.entered
        return cloneElement(children, {
          style: {
            ...tw`transition-opacity`,
            opacity: isEntered ? 1 : 0,
            transitionDuration: `${timeout}ms`,
            ...children.props.style
          },
          ...restProps,
          ...childProps
        })
      }}
    </Transition>
  )
}

export default Fade
