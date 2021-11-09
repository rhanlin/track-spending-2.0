import { CallbackFunctionVariadic } from '@view/types/shared/function'

interface TransitionProps {
  appear?: boolean
  onEnter?: CallbackFunctionVariadic
  onEntering?: CallbackFunctionVariadic
  onEntered?: CallbackFunctionVariadic
  onExit?: CallbackFunctionVariadic
  onExiting?: CallbackFunctionVariadic
  onExited?: CallbackFunctionVariadic
  timeout?: number
}

export type { TransitionProps }
