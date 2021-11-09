import { useState } from 'react'
import 'twin.macro'

import { useAppSelector } from '@states/hook'

import useEnhancedEffect from '@view/hooks/useEnhancedEffect'

import Modal from '@view/components/shared/modal'
import Toast from '@view/components/shared/toast'

const ToastContainer = () => {
  const { toasts } = useAppSelector(state => state.toast)
  const [modalOpen, setModalOpen] = useState(false)

  useEnhancedEffect(() => {
    setModalOpen(toasts.some(toast => toast.show))
  }, [toasts])

  return (
    <Modal
      open={modalOpen}
      backdropProps={{
        invisible: true,
        hidden: true
      }}
    >
      {toasts.map((toast, index) => (
        <Toast
          {...toast}
          key={toast.id}
          style={{ bottom: 40 + (toasts.length - index - 1) * 58 }}
        />
      ))}
    </Modal>
  )
}

export default ToastContainer
