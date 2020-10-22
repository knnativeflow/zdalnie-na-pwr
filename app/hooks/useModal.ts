import { useState } from 'react'

interface UseModalReturnValues<T> {
  isModal: boolean
  modalParams?: T
  openModal: (params?: T) => void
  closeModal: () => void
}

interface UseModalState<T> {
  isOpen: boolean
  params?: T
}

const useModal = <T>(defaultValue?: T): UseModalReturnValues<T> => {
  const [{ isOpen, params }, setState] = useState<UseModalState<T>>({
    isOpen: false,
    params: defaultValue,
  })

  const openModal = (params?: T) =>
    setState({
      isOpen: true,
      params,
    })

  const closeModal = () =>
    setState(({ params }) => ({
      isOpen: false,
      params,
    }))

  return {
    isModal: isOpen,
    modalParams: params,
    openModal,
    closeModal,
  }
}

export default useModal
