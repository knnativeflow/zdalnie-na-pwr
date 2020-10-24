import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import universalAnalytics from 'features/universalAnalytics'
import { useLocation } from 'react-router-dom'

interface Props {
  children: JSX.Element
}

const UniversalAnalyticsListener = (props: Props) => {
  const { children } = props
  const user = useSelector((state: RootState) => state.user)
  const location = useLocation()

  useEffect(() => {
    universalAnalytics.connectUser(user.indeks)
  }, [user.indeks])

  useEffect(() => {
    universalAnalytics.visitPage(location.pathname)
  }, [location.pathname])

  return children
}

export default UniversalAnalyticsListener
