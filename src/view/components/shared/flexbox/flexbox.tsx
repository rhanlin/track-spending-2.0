import React, { createElement, HTMLAttributes, useMemo } from 'react'

import classNames from 'classnames'

type SupportedEl =
  | EP<'div'>
  | EP<'main'>
  | EP<'footer'>
  | EP<'header'>
  | EP<'li'>
  | EP<'ul'>
  | EP<'ol'>
  | EP<'nav'>
  | EP<'span'>
  | EP<'aside'>
  | EP<'label'>
  | EP<'button'>

interface DefaultProps extends EP<'div'> {
  as?: undefined
  customRef?: DivProps['ref']
}

type ElementProps = SupportedEl | DefaultProps

export interface FlexboxProps {
  condition?: boolean
  direction?: 'row' | 'col'
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  expand?: boolean
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
}

export const Flexbox: React.FC<FlexboxProps & ElementProps> = ({
  as = 'div',
  condition = true,
  children,
  className,
  direction,
  justify = 'center',
  align = 'center',
  expand,
  wrap,
  customRef,
  ...props
}) => {
  const _className = useMemo<HTMLAttributes<HTMLElement>['className']>(
    () =>
      classNames(
        className,
        'flex',
        {
          'flex-wrap': wrap === 'wrap',
          'flex-wrap-reverse': wrap === 'wrap-reverse',
          'flex-nowrap': wrap === 'nowrap'
        },
        {
          'flex-row': direction === 'row',
          'flex-col': direction === 'col'
        },
        {
          'justify-start': justify === 'start',
          'justify-end': justify === 'end',
          'justify-center': justify === 'center',
          'justify-between': justify === 'between',
          'justify-around': justify === 'around',
          'justify-evenly': justify === 'evenly'
        },
        {
          'items-start': align === 'start',
          'items-end': align === 'end',
          'items-center': align === 'center',
          'items-baseline': align === 'baseline',
          'items-stretch': align === 'stretch'
        },
        { 'flex-1': expand }
      ),
    [className, direction, justify, align, expand, wrap]
  )

  if (!condition) return null

  return createElement(as, { className: _className, ...props, ref: customRef }, children)
}

export default Flexbox
