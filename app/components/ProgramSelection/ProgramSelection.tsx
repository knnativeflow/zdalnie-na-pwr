import { EducationProgram } from 'features/jsos/JsosExtractor'
import React, { useState } from 'react'
import Space from 'components/Space'
import Button from 'components/Button'
import { CircularProgress, FormControlLabel, Radio } from '@material-ui/core'
import ErrorMsg from 'components/ErrorMsg'

export type ProgramSelectionProps = {
  onSubmit: (selected: EducationProgram) => Promise<void>
  options: Array<EducationProgram>
  color: {
    light: string
    main: string
    dark: string
  }
}

const ProgramSelection = ({ onSubmit, options, color }: ProgramSelectionProps) => {
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState<EducationProgram | null>(null)

  const handleSelectionChange = (selected: EducationProgram) => {
    setSelected(selected)
  }

  const handleSubmit = async () => {
    if (selected) {
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

  return (
    <div>
      {options.map((option) => (
        <FormControlLabel
          onChange={() => handleSelectionChange(option)}
          checked={selected?.id === option.id}
          control={<Radio />}
          label={option.name}
          key={option.id}
        />
      ))}
      <Space size={1} />
      <Button
        glow
        color={color.main}
        variant="primary"
        onClick={handleSubmit}
        fullWidth
        disabled={isLoading || !selected}
      >
        {isLoading ? <CircularProgress size="1em" color="inherit" /> : 'Zapisz i pobierz kursy'}
      </Button>
      <Space size={0.5} />
      {!!apiError && <ErrorMsg>{apiError}</ErrorMsg>}
    </div>
  )
}

export default ProgramSelection
