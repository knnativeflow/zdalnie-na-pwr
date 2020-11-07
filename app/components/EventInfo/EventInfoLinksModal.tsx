import React from 'react'
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
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { platformsValidationSchema } from 'pages/ConfigurationPage/validationsSchemas'

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

type Props = {
  classesCode: string
  eventCourse: ICourse
}

type SubmitProps = {
  zoom: string
  teams: string
  ePortal: string
}

const EventInfoLinksModal = ({ classesCode, eventCourse }: Props) => {
  const dispatch = useDispatch()
  const [isModalOpen, openModal, closeModal] = useModal()
  const { zoom, teams, ePortal } = eventCourse.platforms

  const { handleSubmit: handleSubmitReactFrom, errors, register, watch } = useForm({
    resolver: yupResolver(platformsValidationSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const { zoom: zoomValue, teams: teamsValue, ePortal: ePortalValue } = watch()

  const handleSubmit = async ({ zoom: zoomValue, teams: teamsValue, ePortal: ePortalValue }: SubmitProps) => {
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

  return (
    <>
      <StyledButtonContainer>
        <Text size="14px" fontWeight={700}>
          Zdalne nauczanie
        </Text>
        <Space grow />
        <Button compact even onClick={openModal}>
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
            <InputSection icon={FaBookReader} title="ePortal" color={THEME.colors.brand.ePortal}>
              <Input
                name="ePortal"
                error={errors.ePortal?.message}
                defaultValue={ePortal?.url ?? ''}
                ref={register}
                textColor={THEME.colors.brand.ePortal}
                placeholder="Link do ePortalu"
              />
            </InputSection>
            <InputSection icon={FaUserFriends} title="Teams" color={THEME.colors.brand.teams}>
              <Input
                name="teams"
                error={errors.teams?.message}
                defaultValue={teams?.url ?? ''}
                ref={register}
                textColor={THEME.colors.brand.teams}
                placeholder="Link do Teams"
              />
            </InputSection>
            <InputSection icon={FaCamera} title="Zoom" color={THEME.colors.brand.zoom}>
              <Input
                name="zoom"
                error={errors.zoom?.message}
                defaultValue={zoom?.url ?? ''}
                ref={register}
                textColor={THEME.colors.brand.zoom}
                placeholder="Link do Zooma"
              />
            </InputSection>
          </InputSectionContainer>
        </StyledModalContainer>
        <StyledButtonsContainer>
          <Button color={THEME.colors.palette.blue.dark} onClick={closeModal}>
            Anuluj
          </Button>
          <Space horizontal size={0.5} />
          <Button
            color={THEME.colors.palette.blue.dark}
            disabled={!isChanged}
            variant="primary"
            onClick={handleSubmitReactFrom(handleSubmit)}
          >
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
