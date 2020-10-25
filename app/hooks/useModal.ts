import { useState } from 'react'

type UseModalReturnValues<T> = [boolean, (params?: T) => void, () => void, T?]

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

  return [isOpen, openModal, closeModal, params]
}

export default useModal
