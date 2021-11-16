import React, { createElement, useEffect, useState } from 'react'

import classNames from 'classnames'

import { isNotSet } from '@/view/utils/shared/formatChacker/formatChecker'

interface Props {
  fill?: boolean
  buttonStyle: 'primaryRed-1' | 'gray-1'
  condition?: boolean
}

const RoundButton: React.FC<Props & (EP<'button'> | EP<'a'>)> = ({
  as = 'button',
  className,
  fill,
  buttonStyle,
  children,
  condition = true,
  ...props
}) => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isPrimaryRed1 = buttonStyle === 'primaryRed-1'
  const isBlack2 = buttonStyle === 'gray-1'

  if (!mounted) return null
  if (!condition) return null

  return createElement(
    as,
    {
      className: classNames(
        'block',
        'py-2',
        'px-6',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        fill
          ? [isPrimaryRed1 && 'bg-primary-red-1', isBlack2 && 'bg-gray-1']
          : [
              'border',
              'border-solid',
              isPrimaryRed1 && ['border-primary-red-1'],
              isBlack2 && ['border-gray-1']
            ],
        'rounded-extreme',
        className
      ),
      ...props,
      type: as === 'button' && isNotSet(props.type) ? 'button' : props.type
    },
    createElement(
      'p',
      {
        className: classNames(
          fill ? 'text-white' : { 'text-primary-red-1': isPrimaryRed1, 'text-gray-1': isBlack2 },
          'text-btn'
        )
      },
      children
    )
  )
}

export default RoundButton
