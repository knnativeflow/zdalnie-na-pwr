import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Button from 'components/Button'
import { FaBookReader, FaCamera, FaPen, FaUserFriends } from 'react-icons/all'
import Space from 'components/Space'
import Text from 'components/Text'
import useModal from 'hooks/useModal'
import { Dialog } from '@material-ui/core'
import Input from 'components/Input'
import { parseSize, THEME } from 'base/theme/theme'
import { IconType } from 'react-icons'
import { useDispatch } from 'react-redux'
import { clearCoursePlatform, setCoursePlatform } from 'actions/courses'
import { ICourse, PlatformType } from 'domain/course'

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const StyledModalContainer = styled.div`
  padding: ${parseSize(1.5)};
`

const InputSectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const InputSectionWrapper = styled.div<{ color: string }>`
  background-color: ${({ color }) => `${color}10`};
  color: ${({ color }) => color};
  border-radius: ${THEME.borderRadius.md};
  padding: ${parseSize(0.5)} ${parseSize(1)} ${parseSize(1)};
  width: calc(50% - 1em);
  margin: 0.5em;
`

const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${parseSize(1)} ${parseSize(1)};
`

const InputSectionTitle = styled.div`
  display: flex;
  align-items: center;
`

type UseInputProps = [string, (e: ChangeEvent<HTMLInputElement>) => void, (value: string) => void]

const useInput = (initialState: string): UseInputProps => {
  const [state, setState] = useState(initialState)
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)

  return [state, handleOnChange, setState]
}

type Props = {
  color: string
  classesCode: string
  eventCourse: ICourse
}

const EventInfoLinksModal = ({ color, classesCode, eventCourse }: Props) => {
  const dispatch = useDispatch()
  const [isModalOpen, openModal, closeModal] = useModal()
  const { zoom, teams, ePortal } = eventCourse.platforms
  const [zoomValue, onZoomValue, setZoomValue] = useInput('')
  const [teamsValue, onTeamsValue, setTeamsValue] = useInput('')
  const [ePortalValue, onEPortalValue, setEPortalValue] = useInput('')

  useEffect(() => {
    if (!isModalOpen) return
    setZoomValue(zoom?.url ?? '')
    setTeamsValue(teams?.url ?? '')
    setEPortalValue(ePortal?.url ?? '')
  }, [isModalOpen])

  const handleSubmit = () => {
    if (zoomValue) dispatch(setCoursePlatform(classesCode, PlatformType.ZOOM, zoomValue))
    else if (zoom?.url) dispatch(clearCoursePlatform(classesCode, PlatformType.ZOOM))

    if (teamsValue) dispatch(setCoursePlatform(classesCode, PlatformType.TEAMS, teamsValue))
    else if (teams?.url) dispatch(clearCoursePlatform(classesCode, PlatformType.TEAMS))

    if (ePortalValue) dispatch(setCoursePlatform(classesCode, PlatformType.EPORTAL, ePortalValue))
    else if (ePortal?.url) dispatch(clearCoursePlatform(classesCode, PlatformType.EPORTAL))

    closeModal()
  }

  const isChanged =
    (zoom?.url ?? '') !== zoomValue || (teams?.url ?? '') !== teamsValue || (ePortal?.url ?? '') !== ePortalValue

  // TODO: ADD URL VALIDATION

  return (
    <>
      <StyledButtonContainer>
        <Text size="14px" fontWeight={700}>
          Zdalne nauczanie
        </Text>
        <Space grow />
        <Button compact even variant="primary" color={color} onClick={openModal}>
          <FaPen />
        </Button>
      </StyledButtonContainer>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <StyledModalContainer>
          <Text size={1.25} fontWeight="bold">
            Edycja linków
          </Text>
          <Space size={2} />
          <InputSectionContainer>
            <InputSection icon={FaBookReader} title="EPortal" color={THEME.colors.brand.ePortal}>
              <Input
                value={ePortalValue}
                onChange={onEPortalValue}
                textColor={THEME.colors.brand.ePortal}
                placeholder="Link do EPortalu"
              />
            </InputSection>
            <InputSection icon={FaUserFriends} title="Teams" color={THEME.colors.brand.teams}>
              <Input
                value={teamsValue}
                onChange={onTeamsValue}
                textColor={THEME.colors.brand.teams}
                placeholder="Link do Teams"
              />
            </InputSection>
            <InputSection icon={FaCamera} title="Zoom" color={THEME.colors.brand.zoom}>
              <Input
                value={zoomValue}
                onChange={onZoomValue}
                textColor={THEME.colors.brand.zoom}
                placeholder="Link do Zooma"
              />
            </InputSection>
          </InputSectionContainer>
        </StyledModalContainer>
        <StyledButtonsContainer>
          <Button onClick={closeModal}>Anuluj</Button>
          <Space horizontal size={0.5} />
          <Button disabled={!isChanged} variant="primary" onClick={handleSubmit}>
            Zapisz
          </Button>
        </StyledButtonsContainer>
      </Dialog>
    </>
  )
}

export default EventInfoLinksModal

type InputSectionProps = {
  title: string
  children: React.ReactNode
  color: string
  icon: IconType
}

const InputSection = ({ title, children, color, icon: Icon }: InputSectionProps) => (
  <InputSectionWrapper color={color}>
    <InputSectionTitle>
      <Icon />
      <Space horizontal size={0.5} />
      <Text fontWeight="bold">{title}</Text>
    </InputSectionTitle>
    <Space size={0.5} />
    {children}
  </InputSectionWrapper>
)
