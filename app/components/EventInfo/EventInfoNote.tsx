import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { THEME } from 'base/theme/theme'
import { useDispatch } from 'react-redux'
import { setCourseNote } from 'actions/courses'
import { FaSave } from 'react-icons/all'
import Space from 'components/Space'
import Text from 'components/Text'
import { CircularProgress } from '@material-ui/core'
import { keyframes } from '@emotion/core'

type Props = {
  savedText: string
  classesCode: string
}

const StyledTextarea = styled.textarea`
  resize: vertical;
  width: 100%;
  border-radius: ${THEME.borderRadius.sm};
  padding: 1em;
  border: none;
  background-color: #e1e8ef;
  min-height: 100px;
  max-height: 300px;

  &:focus {
    box-shadow: 0 0 0 2px #727e8a inset;
    outline: none;
  }
`

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const fadeOut = keyframes`
  0% {
    opacity: 0;
  }
  5% {
    opacity: 0.75;
  }
  20% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
  }
`

const DisappearingSaveIcon = styled(FaSave)`
  animation: ${fadeOut} 3s linear both;
`

const EventInfoNote = ({ savedText, classesCode }: Props) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState(savedText)
  const [isLoading, setLoading] = useState(false)
  const [isSaved, setSaved] = useState(false)
  const inputTimeout = useRef<NodeJS.Timeout>()
  const loadingTimeout = useRef<NodeJS.Timeout>()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target

    setLoading(false)
    setContent(value)
    if (inputTimeout.current) clearTimeout(inputTimeout.current)
    if (loadingTimeout.current) clearTimeout(loadingTimeout.current)

    inputTimeout.current = setTimeout(() => {
      setLoading(false)
      setSaved(true)
      dispatch(setCourseNote(classesCode, value))
    }, 1500)

    loadingTimeout.current = setTimeout(() => {
      setLoading(true)
      setSaved(false)
    }, 500)
  }

  useEffect(() => {
    setContent(savedText)
  }, [savedText])

  return (
    <>
      <StyledButtonContainer>
        <Text size="14px" fontWeight={700}>
          Notatki
        </Text>
        <Space horizontal size={0.25} />
        {isLoading && <CircularProgress size="0.8em" color="inherit" />}
        {isSaved && <DisappearingSaveIcon size="0.8em" />}
      </StyledButtonContainer>
      <StyledTextarea onChange={handleChange} value={content} />
    </>
  )
}

export default EventInfoNote
