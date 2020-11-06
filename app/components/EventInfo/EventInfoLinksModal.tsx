import React, { ChangeEvent, useState } from 'react'
import styled from '@emotion/styled'
import Button from 'components/Button'
import { FaBookReader, FaCamera, FaPen, FaUserFriends } from 'react-icons/all'
import Space from 'components/Space'
import Text from 'components/Text'
import useModal from 'hooks/useModal'
import { Dialog, Grid } from '@material-ui/core'
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

const StyledModalWrapper = styled.div`
  padding: ${parseSize(2)};
`

const InputSectionWrapper = styled.div<{ color: string }>`
  background-color: ${({ color }) => `${color}10`};
  color: ${({ color }) => color};
  border-radius: ${THEME.borderRadius.md};
  flex-grow: 1;
  padding: ${parseSize(0.5)} ${parseSize(1)} ${parseSize(1)};
`

const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${parseSize(1)} ${parseSize(1)};
`

const InputSectionTitle = styled.div`
  display: flex;
  align-items: center;
`

const useInput = (initialState: string): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [state, setState] = useState(initialState)
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)

  return [state, handleOnChange]
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
  const [zoomValue, setZoomValue] = useInput(zoom?.url ?? '')
  const [teamsValue, setTeamsValue] = useInput(teams?.url ?? '')
  const [ePortalValue, setEPortalValue] = useInput(ePortal?.url ?? '')

  const handleSubmit = () => {
    if (zoomValue) dispatch(setCoursePlatform(classesCode, PlatformType.ZOOM, zoomValue))
    else if (zoom?.url) dispatch(clearCoursePlatform(classesCode, PlatformType.ZOOM))

    if (teamsValue) dispatch(setCoursePlatform(classesCode, PlatformType.TEAMS, teamsValue))
    else if (teams?.url) dispatch(clearCoursePlatform(classesCode, PlatformType.TEAMS))

    if (ePortalValue) dispatch(setCoursePlatform(classesCode, PlatformType.EPORTAL, ePortalValue))
    else if (teams?.url) dispatch(clearCoursePlatform(classesCode, PlatformType.TEAMS))

    closeModal()
  }

  const isChanged = zoom?.url !== zoomValue || teams?.url !== teamsValue || ePortal?.url !== ePortalValue

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
        <StyledModalWrapper>
          <Text size={1.5} fontWeight="bold">
            Edycja linków
          </Text>
          <Space size={2} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputSection icon={FaCamera} title="Zoom" color={THEME.colors.brand.zoom}>
                <Input
                  value={zoomValue}
                  onChange={setZoomValue}
                  textColor={THEME.colors.brand.zoom}
                  placeholder="Link do Zooma"
                />
              </InputSection>
            </Grid>
            <Grid item xs={6}>
              <InputSection icon={FaUserFriends} title="Teams" color={THEME.colors.brand.teams}>
                <Input
                  value={teamsValue}
                  onChange={setTeamsValue}
                  textColor={THEME.colors.brand.teams}
                  placeholder="Link do Teams"
                />
              </InputSection>
            </Grid>
            <Grid item xs={6}>
              <InputSection icon={FaBookReader} title="EPortal" color={THEME.colors.brand.ePortal}>
                <Input
                  value={ePortalValue}
                  onChange={setEPortalValue}
                  textColor={THEME.colors.brand.ePortal}
                  placeholder="Link do EPortalu"
                />
              </InputSection>
            </Grid>
          </Grid>
        </StyledModalWrapper>
        <StyledButtonsWrapper>
          <Button onClick={closeModal}>Anuluj</Button>
          <Space horizontal size={0.5} />
          <Button
            disabled={!isChanged}
            variant="primary"
            color={THEME.colors.palette.purple.main}
            onClick={handleSubmit}
          >
            Zapisz
          </Button>
        </StyledButtonsWrapper>
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
