import { ButtonHTMLAttributes, forwardRef } from 'react'

import tw from 'twin.macro'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string | React.ReactNode
  ui?: 'default' | 'outline' | 'text'
  condition?: boolean
}

const BUTTON_DEFAULT_STYLE = {
  default: tw`bg-gray-2 text-white hover:bg-opacity-80`,
  outline: tw`text-gray-2 border border-solid border-gray-2 hover:bg-gray-2 hover:text-white`,
  text: tw`text-gray-2 hover:opacity-80`
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props: ButtonProps,
  ref
) => {
  const { label, type = 'button', ui = 'default', disabled, condition = true, ...restProps } = props
  if (!condition) return null

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      css={[
        tw`outline-none transition-all duration-300 px-6 py-2 rounded-md`,
        BUTTON_DEFAULT_STYLE[ui],
        disabled && tw`bg-gray-4 cursor-not-allowed`
      ]}
      {...restProps}
    >
      {label}
    </button>
  )
}

export default forwardRef(Button)
