import { HTMLAttributes, useRef } from 'react'
import { Transition } from 'react-transition-group'

import { TransitionProps } from 'react-transition-group/Transition'
import tw from 'twin.macro'

import { States } from '@/view/constants/components/transition'

/**
 * %----------transition lifecycle------------%
 * enter -> entering -> entered -> exit -> exiting ->exited
 */

type CollapseProps = HTMLAttributes<HTMLDivElement> &
  TransitionProps & {
    children: React.ReactNode
    inProps: boolean
    appear?: boolean
    timeout?: number
    direction?: 'horizontal' | 'vertical'
    // theme: {
    //   collapse: string
    //   content: string
    // }
  }

function Collapse(props: CollapseProps) {
  const {
    inProps,
    appear = false,
    timeout = 300,
    direction = 'vertical',
    collapsedSize = '0px',
    children,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    ...resProps
  } = props

  const nodeRef = useRef<HTMLDivElement>(null) // 控制 Transition component
  const wrapperRef = useRef<HTMLDivElement>(null) // 控制 Wrapper component，用來控制橫向伸縮的 position

  const isVertical = direction === 'vertical'
  const isHorizontal = direction === 'horizontal'
  const size = isHorizontal ? 'width' : 'maxHeight'

  const getWrapperSize = () =>
    wrapperRef.current![isHorizontal ? 'clientWidth' : 'clientHeight'] || 0

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

  const handleEnter = normalizedTransitionCallback((node: HTMLElement) => {
    // console.log('Enter')
    if (wrapperRef.current && isHorizontal) {
      // Set absolute position to get the size of collapsed content
      wrapperRef.current.style.position = 'absolute'
    }
    node.style[size] = collapsedSize

    // if (onEnter) {
    //   onEnter(node, isAppearing)
    // }
  })
  const handleEntering = normalizedTransitionCallback((node: HTMLElement) => {
    // console.log('Entering')
    const wrapperSize = getWrapperSize()
    if (wrapperRef.current && isHorizontal) {
      // After the size is read reset the position back to default
      wrapperRef.current.style.position = 'static'
    }
    node.style[size] = `${wrapperSize}px`

    // if (onEntering) {
    //   onEntering(node, isAppearing)
    // }
  })
  const handleEntered = normalizedTransitionCallback((node: HTMLElement) => {
    // console.log('Entered')
    const wrapperSize = getWrapperSize()
    if (isHorizontal) {
      node.style[size] = `${wrapperSize}px`
    } else {
      node.style[size] = `unset`
    }

    // if (onEntered) {
    //   onEntered(node, isAppearing)
    // }
  })
  const handleExit = normalizedTransitionCallback((node: HTMLElement) => {
    // console.log('Exit')

    const wrapperSize = getWrapperSize()
    node.style[size] = `${wrapperSize}px`

    // if (onExit) {
    //   onExit(node)
    // }
  })
  const handleExiting = normalizedTransitionCallback((node: HTMLElement) => {
    // console.log('Exiting')

    const wrapperSize = getWrapperSize()
    node.style[size] = `${wrapperSize}px`

    // if (onExiting) {
    //   onExiting(node)
    // }
  })
  const handleExited = normalizedTransitionCallback((node: HTMLElement) => {
    // console.log('Exited')
    node.style[size] = collapsedSize
  })

  return (
    <Transition
      nodeRef={nodeRef}
      in={inProps}
      appear
      timeout={{
        enter: timeout,
        exit: timeout
      }}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
    >
      {(state: States) => {
        const isEntered = state === States.entered
        return (
          <div
            ref={nodeRef}
            css={[
              tw`overflow-hidden transition-timing-function[cubic-bezier(0.4, 0, 0.2, 1)] transition-delay[0ms]`,
              isHorizontal && tw`transition-property[width]`,
              isVertical && tw`max-h-0 transition-property[max-height]`,
              state === States.entered && tw`overflow-visible`
            ]}
            style={{
              [isHorizontal ? 'width' : 'minHeight']: collapsedSize,
              overflow: isEntered ? 'initial' : 'hidden',
              transitionDuration: `${timeout}ms`
            }}
            {...resProps}
          >
            <div ref={wrapperRef}>{children}</div>
          </div>
        )
      }}
    </Transition>
  )
}

export default Collapse
