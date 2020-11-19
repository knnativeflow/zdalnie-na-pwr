import { useState } from 'react'

import { IEvent } from 'domain/event'

type CompositeKey = Pick<IEvent, 'code' | 'start'> | undefined

const findEventByCompositeKey = (key: CompositeKey) => ({ code, start }: IEvent) =>
  key && code === key?.code && start === key?.start

const useEventCompositeKey = () => {
  const [compositeKey, setCompositeKey] = useState<CompositeKey>()

  return {
    compositeKey,
    setCompositeKey,
    findEventByCompositeKey: findEventByCompositeKey(compositeKey),
  }
}

export default useEventCompositeKey
