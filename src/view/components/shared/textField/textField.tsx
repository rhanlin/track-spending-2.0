/**
 * @author Dean Chen 2021-04-30
 * TextField 從原本的 Input component 改名而來，將 type 為 text、 password 獨立出來，
 * checkbox、radio、select 則透過其他 component 處理
 * 有兩個直得討論的功能
 * 1. 使用看不見的 placeholder: 透過看不見的 placeholder 完成 label 的動畫，因為 react-hook-form 的 watch 或 useWatch，
 * 無論哪一個都會造成父層或子層隨著 change event 而渲染
 * 2. 新增 mouse down event 來處理 點選清除按鈕時造成 input blur 的問題
 */

import React, { forwardRef, InputHTMLAttributes, useRef, useState } from 'react'

import tw, { styled } from 'twin.macro'

import Collapse from '@/view/components/shared/animation/collapse'
import useForkRef from '@/view/hooks/useForkRef'
import getSvgUrl from '@/view/utils/shared/getSvgUrl'

type StyledInputProps = {
  hasPlaceholder: boolean
  isFocused: boolean
  hasStartAdornment: boolean
  hasEndAdornment: boolean
  hasError: boolean
}
// border-transparent 解決 active 時 border 出現整體高度變高的情況
const StyledInput = styled.input`
  ${tw`text-black-2 border-gray-4 w-full text-body border-2 border-solid rounded-md h-9 pl-3 py-1.5 pr-6`}

  &:disabled {
    ${tw`bg-gray-4 text-gray-1 cursor-not-allowed`}

    & ~ label {
      ${tw`cursor-not-allowed`}
    }

    & ~ div {
      ${tw`hidden`}
    }
  }

  &:not(:placeholder-shown) ~ label {
    ${tw`translate-x-0 -translate-y-full top-0 left-4 text-gray-3`}
  }

  ${({ hasPlaceholder }: StyledInputProps) => !hasPlaceholder && tw`placeholder:(text-transparent)`}

  ${({ isFocused }: StyledInputProps) => isFocused && tw`outline-none bg-white-1 border-gray-2`}
  
  ${({ hasStartAdornment }: StyledInputProps) => hasStartAdornment && tw`pl-6`}
  
  ${({ hasEndAdornment }: StyledInputProps) => hasEndAdornment && tw`pr-12`}

  ${({ hasError }: StyledInputProps) => hasError && tw`border-red-500`}
`

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  name?: string
  isFull?: boolean
  type?: 'text' | 'password'
  label?: string
  error?: string
  className?: string
  inputClassName?: string
  startAdornment?: JSX.Element
  endAdornment?: JSX.Element
  onClear?: () => void
}

const TextField: React.ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (
  props: TextFieldProps,
  ref
) => {
  const {
    id,
    label,
    placeholder,
    onClear,
    className = '',
    inputClassName = '',
    error = '',
    isFull = true,
    startAdornment,
    endAdornment,
    onBlur,
    ...restProps
  } = props
  const [focused, setFocused] = useState(false)
  const isClearing = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleRef = useForkRef(inputRef, ref)
  const isFloatLabel = placeholder || focused
  const hasError = Boolean(error)
  const hasStartAdornment = Boolean(startAdornment)
  const hasEndAdornment = Boolean(endAdornment)
  // 判斷是否有 placeholder，來決定 label 呈現方式
  const hasPlaceholder = Boolean(placeholder)
  // 因為 value 有值的時候，placeholder-shown: false，因此 label 會固定在上方，但沒傳 placeholder 的話，也會 placeholder-shown:false
  // 因此需傳入一個非空字串的虛擬 placeholder 進去
  const placeholderModified = placeholder || 'hidden placeholder'

  // mousedown、blur、click 發生順序依序為 mousedown -> blur -> click，因為 clear function 會觸發 blur
  // 因此在 mousedown 這邊先進行判斷是否進行 clear
  const handleMouseDown = (): void => {
    isClearing.current = true
  }

  const handleFocus = (): void => {
    setFocused(true)
  }

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event): void => {
    if (isClearing.current === false) {
      setFocused(false)
      // react-hook-form will handle the blur event, so that call the event in-case you use react-hook-form
      // props.onBlur?.(e)
      if (onBlur) {
        // console.log('Clear')
        onBlur(event)
      }
    }
  }

  const handleClear = (): void => {
    isClearing.current = false
    inputRef.current!.focus()
    if (onClear) {
      // console.log('Clear')
      onClear()
    }
  }

  return (
    <div css={[isFull === false && tw`inline-block`]} className={className}>
      <div tw="relative">
        {hasStartAdornment ? (
          <span tw="absolute text-gray-4 text-caption top-1/2 left-2 transform -translate-y-1/2 vertical-align[0]">
            {startAdornment}
          </span>
        ) : null}

        <StyledInput
          ref={handleRef}
          id={id}
          hasStartAdornment={hasStartAdornment}
          hasPlaceholder={hasPlaceholder}
          isFocused={focused}
          hasEndAdornment={hasEndAdornment}
          onFocus={handleFocus}
          onBlur={handleBlur}
          hasError={hasError}
          placeholder={placeholderModified}
          className={inputClassName}
          {...restProps}
        />
        {label ? (
          <label
            htmlFor={id}
            tw="absolute text-gray-2 text-body top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all select-none"
            css={[isFloatLabel && tw`translate-x-0 -translate-y-full top-0 left-4 text-gray-4`]}
          >
            {label}
          </label>
        ) : null}

        <div tw="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-4 text-caption flex items-center">
          {endAdornment || null}
          {onClear ? (
            <svg
              tw="inline w-4 h-4 text-gray-2 cursor-pointer ml-2"
              onClick={handleClear}
              onMouseDown={handleMouseDown}
            >
              <use {...getSvgUrl('x-icon')} />
            </svg>
          ) : null}
        </div>
      </div>

      <Collapse inProps={hasError} timeout={300}>
        <span tw="text-body text-red-400 ml-2">{error}</span>
      </Collapse>
    </div>
  )
}

export default forwardRef(TextField)
