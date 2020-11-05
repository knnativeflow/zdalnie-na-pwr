import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { THEME } from 'base/theme/theme'
import Button from 'components/Button'
import { useDispatch } from 'react-redux'
import { setCourseNote } from 'actions/courses'
import { FaSave, FaUndoAlt } from 'react-icons/all'
import Space from 'components/Space'
import Text from 'components/Text'

type Props = {
  savedText: string
  classesCode: string
  color: string
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

const EventInfoNote = ({ savedText, classesCode, color }: Props) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState<string>(savedText)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleSaveText = () => {
    dispatch(setCourseNote(classesCode, content))
  }

  const handleCancelText = () => {
    setContent(savedText)
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
        <Space grow />
        <Button compact even color={color} disabled={savedText === content} onClick={handleCancelText}>
          <FaUndoAlt />
        </Button>
        <Space size={0.25} horizontal />
        <Button compact even variant="primary" color={color} disabled={savedText === content} onClick={handleSaveText}>
          <FaSave />
        </Button>
      </StyledButtonContainer>
      <StyledTextarea onChange={handleChange} value={content} />
    </>
  )
}

export default EventInfoNote
