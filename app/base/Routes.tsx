/* eslint react/jsx-props-no-spreading: off */
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from 'constants/routes.json'

import { CalendarPage, CourseListPage, HomePage } from 'pages'
import App from './App'

// Lazily load routes and code split with webpack
// const LazyCounterPage = React.lazy(() =>
//   import(/* webpackChunkName: "CounterPage" */ '../containers/CounterPage')
// );

// const CounterPage = (props: Record<string, any>) => (
//   <React.Suspense fallback={<h1>Loading...</h1>}>
//     <LazyCounterPage {...props} />
//   </React.Suspense>
// );

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.CALENDAR} component={CalendarPage} />
        <Route path={routes.COURSE_LIST} component={CourseListPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  )
}
