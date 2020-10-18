import React, { useEffect, useState } from 'react'

import UploadICalendarFileModal from 'components/UploadICalendarFileModal'

import styles from './HomePage.scss'

const HomePage = () => {
  const [courses, setCourses] = useState<ICourse[]>([])

  const handleUploadICalendar = (courses: ICourse[]) => setCourses(courses)

  useEffect(() => {
    console.log('courses', courses)
  }, [courses])

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Zajęcia</h1>
      </div>
      {/*<UploadICalendarFileModal open={!courses.length} onSubmit={handleUploadICalendar} onClose={() => {}} />*/}
    </div>
  )
}

export default HomePage
