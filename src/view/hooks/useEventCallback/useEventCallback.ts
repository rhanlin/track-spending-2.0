import { useCallback, useRef } from 'react'

import useEnhancedEffect from '@view/hooks/useEnhancedEffect'

export default function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const ref = useRef(fn)
  useEnhancedEffect(() => {
    ref.current = fn
  })
  // @ts-expect-error hide `this`
  return useCallback((...args: Args) => (0, ref.current!)(...args), [])
}
