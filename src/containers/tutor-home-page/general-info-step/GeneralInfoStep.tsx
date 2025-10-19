import {
  ChangeEvent,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect
} from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import img from '~/assets/img/shared-images/student.svg'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import CityDropdown from '~/containers/city-dropdown/CityDropdown'
import CountryDropdown from '~/containers/country-dropdown/CountryDropdown'
import { useStepContext } from '~/context/step-context'
import { NameItem } from '~/types'
import { firstName, lastName } from '~/utils/validations/general-info-step'

interface GeneralInfoStepProps {
  btnsBox: ReactNode
  onValidationChange: (isValid: boolean) => void
}

interface StepGeneralInfoData {
  firstName: string
  lastName: string
  country: string | null
  city: string | null
  professionalSummary: string
}

const GeneralInfoStep = ({
  btnsBox,
  onValidationChange
}: GeneralInfoStepProps) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()

  const {
    generalInfo: { data: step }
  } = stepData as { generalInfo: { data: StepGeneralInfoData } }

  useEffect(() => {
    const isFormValid = !firstName(step.firstName) && !lastName(step.lastName)
    onValidationChange(isFormValid)
  }, [step.firstName, step.lastName, onValidationChange])

  const setGeneralInfo = useCallback(
    (info: Partial<StepGeneralInfoData>) => {
      handleStepData('generalInfo', {
        ...info
      })
    },
    [handleStepData]
  )

  const handleDropDownChange = useCallback(
    (key: keyof StepGeneralInfoData) => {
      return (_: SyntheticEvent, value: NameItem | null) => {
        setGeneralInfo({
          ...stepData.generalInfo.data,
          [key]: value?._id ?? null
        })
      }
    },
    [setGeneralInfo, stepData]
  )

  const handleChange = useCallback(
    (name: keyof StepGeneralInfoData) => {
      return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event?.target?.value ?? ''
        setGeneralInfo({
          ...stepData.generalInfo.data,
          [name]: value
        })
      }
    },
    [setGeneralInfo, stepData]
  )

  const formFirstLine = () => (
    <>
      <AppTextField
        autoComplete='off'
        autoFocus
        data-testid='user-first-name'
        errorMsg={t(firstName(step.firstName) || '')}
        fullWidth
        label={t('common.labels.firstName')}
        onChange={handleChange('firstName')}
        required
        size='medium'
        type='text'
        value={step.firstName}
      />
      <AppTextField
        autoComplete='off'
        data-testid='user-last-name'
        errorMsg={t(lastName(step.lastName) || '')}
        fullWidth
        label={t('common.labels.lastName')}
        onChange={handleChange('lastName')}
        required
        size='medium'
        type='text'
        value={step.lastName}
      />
    </>
  )

  const formSecondLine = () => (
    <>
      <CountryDropdown
        country={step.country}
        onChange={handleDropDownChange('country')}
      />

      <CityDropdown city={step.city} onChange={handleDropDownChange('city')} />
    </>
  )

  const infoTextArea = () => (
    <AppTextArea
      data-testid='user-info'
      fullWidth
      maxLength={100}
      onChange={handleChange('professionalSummary')}
      placeholder={t('becomeTutor.generalInfo.textFieldLabel')}
      sx={styles.textArea}
      value={step.professionalSummary}
    />
  )

  const formHeader = () => (
    <Typography gutterBottom variant='body1'>
      {t('becomeTutor.generalInfo.title')}
    </Typography>
  )

  const hintText = () => (
    <Typography gutterBottom variant='caption'>
      {t('becomeTutor.generalInfo.helperText')}
    </Typography>
  )

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} />
      </Box>

      <Box sx={styles.rightBox}>
        <Box sx={styles.formBox}>
          {formHeader()}
          <Box sx={styles.formLine}>{formFirstLine()}</Box>
          <Box sx={styles.formLine}>{formSecondLine()}</Box>
          {infoTextArea()}
          {hintText()}
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
