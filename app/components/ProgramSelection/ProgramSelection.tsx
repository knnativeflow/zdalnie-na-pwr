import { EducationProgram } from 'features/jsos/JsosExtractor'
import React, { useState } from 'react'
import Space from '../Space'
import Button from '../Button'
import { CircularProgress, FormControlLabel, Radio } from '@material-ui/core'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

export type ProgramSelectionProps = {
  onSubmit: (selected: EducationProgram) => Promise<void>,
  options: Array<EducationProgram>
  color: {
    light: string
    main: string
    dark: string
  }
}

//TODO: extract it
const showAnim = keyframes`
  0% { height: 0; opacity: 0; }
  100% { height: 14px; opacity: 1; }
`

const ErrorMsg = styled.p`
  margin: 0;
  text-align: center;
  font-size: 14px;
  color: #ff487f;
  animation: ${showAnim} 0.1s ease-in-out;
`

const ProgramSelection = ({onSubmit, options, color}: ProgramSelectionProps) => {
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState<EducationProgram | null>(null)

  const handleSelectionChange = (selected: EducationProgram) => {
    setSelected(selected)
  }

  const handleSubmit = async () => {
    if(selected) {
      try {
        setIsLoading(true)
        await onSubmit(selected)
      } catch (error) {
        console.error('ProgramSelections.tsx', 'handleSubmit', error?.message, error)
        setApiError(error.message)
        setIsLoading(false)
      }
    }
  }

  return(
    <div>
      {
        options.map((option) => (
          <FormControlLabel
            onChange={() => handleSelectionChange(option)}
            checked={selected?.id === option.id}
            control={<Radio />}
            label={option.name}
          />
        ))
      }
      <Space size={1} />
      <Button glow color={color.main} variant="primary" onClick={handleSubmit} fullWidth disabled={isLoading || !selected}>
        {isLoading ? <CircularProgress size="1em" color="inherit" /> : 'Zapisz i pobierz kursy'}
      </Button>
      <Space size={0.5} />
      {!!apiError && <ErrorMsg>{apiError}</ErrorMsg>}
    </div>
  )
}

export default ProgramSelection
