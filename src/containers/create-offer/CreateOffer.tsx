import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import LeakAddIcon from '@mui/icons-material/LeakAdd'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import counter1 from '~/assets/img/shared-images/counter1.svg'
import counter2 from '~/assets/img/shared-images/counter2.svg'
import counter3 from '~/assets/img/shared-images/counter3.svg'

const items = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Test Preparation',
  'Professional',
  'Specialized'
]

import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  NameItem
} from '~/types'

import { styles } from '~/containers/create-offer/CreateOffer.style'
import SelectSubject from '../select-subject/SelectSubject'
import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react'
import CheckboxList from '~/components/checkbox-list/CheckboxList'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import LanguageDropdown from '../language-dropdown/LanguageDropdown'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppTextField from '~/components/app-text-field/AppTextField'
import { InputAdornment } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { ctrlRenderingSettings } from '~/constants/components'
import { AxiosResponse } from 'axios'

const CreateOffer = () => {
  const { t } = useTranslation()
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [levels, setLevels] = useState<string[]>([items[0]])
  const [teachTitle, setTeachTitle] = useState<string>('')
  const [teachDescription, setTeachDescription] = useState<string>('')
  const [languages, setLanguges] = useState<string[]>([])
  const [selectedLang, setSelectedLang] = useState<string | null>(null)
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [linkedCourse] = useState<string | null>(null)

  const levelSelected = (data: string[]) => {
    setLevels(data)
  }

  const getCoures = useCallback(() => {
    setIsFetched(true)
    return Promise.resolve({
      data: [{ _id: '1', name: 'React Course' }]
    } as AxiosResponse<NameItem[]>)
  }, [setIsFetched])

  const onSubjectSeclected = useCallback(
    (_: SyntheticEvent, value: NameItem | null) => {
      setSelectedSubject(value?.name ?? null)
    },
    [setSelectedSubject]
  )

  const handleChange = useCallback((name: string) => {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event?.target?.value ?? ''
      switch (name) {
        case 'teachingTitle':
          setTeachTitle(value)
          break

        case 'teachingSecription':
          setTeachDescription(value)
          break

        default:
          break
      }
    }
  }, [])

  const onLanguageChanged = useCallback(
    (_: SyntheticEvent, value: NameItem | null) => {
      console.log(value)
      if (value?.name) {
        setSelectedLang(value?.name)
        setLanguges((prev) => Array.from(new Set([...prev, value?.name])))
      }
    },
    []
  )

  const deleteLangChip = useCallback((data: string) => {
    setLanguges((prev) => {
      const next = new Set(prev)
      next.delete(data)
      setSelectedLang(null)
      return Array.from(next)
    })
    console.log(data)
  }, [])

  const specializationBlock = (
    <Box sx={styles.block}>
      <Box sx={styles.block.header}>
        <Box component='img' src={counter1}></Box>
        <Typography sx={styles.block.title}>
          Pick Your Specialization
        </Typography>
      </Box>
      <Box sx={styles.block.sub}>
        <Typography sx={styles.subHeader}>
          Choose the category and subject that you are most qualified to tutor
          students in.
        </Typography>

        <SelectSubject
          categoryLabel='categoriesPage.title'
          onSubjectChange={onSubjectSeclected}
          subject={selectedSubject}
        ></SelectSubject>
        <Typography sx={styles.subHeader}>
          Select the appropriate preparation levels for this offer ranging from
          beginner to advanced or others.
        </Typography>

        <CheckboxList items={items} onChange={levelSelected} value={levels} />
      </Box>
    </Box>
  )

  const FAQBlock = (
    <Box sx={styles.block}>
      <Box sx={styles.block.header}>
        <Box component='img' src={counter3}></Box>
        <Typography sx={styles.block.title}>
          Frequently asked questions
        </Typography>
      </Box>
      <Box sx={styles.block.sub}>
        <Typography sx={styles.subHeader}>
          Choose the category and subject that you are most qualified to tutor
          students in.
        </Typography>

        {/* move to separate component */}
        <AppTextField
          fullWidth
          label='Insert question'
          onChange={() => null}
          value={''}
        />

        <AppTextArea
          fullWidth
          maxLength={400}
          maxRows={3}
          onChange={handleChange('teachingSecription')}
          placeholder={'Insert answer'}
          value={''}
        />

        <AppButton
          loading={false}
          sx={styles.button}
          type={ButtonTypeEnum.Submit}
          variant={ButtonVariantEnum.Tonal}
        >
          Add more questions
        </AppButton>
      </Box>
    </Box>
  )

  const teachingParamBlock = (
    <Box sx={styles.block}>
      <Box sx={styles.block.header}>
        <Box component='img' src={counter2}></Box>
        <Typography sx={styles.block.title}>Teaching Parameters</Typography>
      </Box>
      <Box sx={styles.block.sub}>
        <Typography sx={styles.subHeader}>
          Create а brief title for your offer.
        </Typography>
        <AppTextArea
          data-testid='user-info'
          fullWidth
          maxLength={25}
          maxRows={1}
          onChange={handleChange('teachingTitle')}
          placeholder='Title'
          value={teachTitle}
        />
        <Typography sx={styles.subHeader}>
          Please describe any additional information about your tutoring
          services, your teaching style, the topics you cover, and any specific
          areas of expertise you have.
        </Typography>
        <AppTextArea
          data-testid='user-info'
          fullWidth
          maxLength={1000}
          maxRows={4}
          onChange={handleChange('teachingSecription')}
          placeholder={'Description'}
          value={teachDescription}
        />
        <Typography sx={styles.subHeader}>
          Indicate the languages youre able to tutor on.
        </Typography>
        <LanguageDropdown
          language={selectedLang}
          onChange={onLanguageChanged}
        ></LanguageDropdown>
        <AppChipList
          defaultQuantity={2}
          handleChipDelete={deleteLangChip}
          items={languages}
          wrapperStyle={{ mt: '12px' }}
        />

        <Typography sx={styles.subHeader}>
          Set the offer value per lesson.
        </Typography>
        <AppTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AttachMoneyIcon />
              </InputAdornment>
            )
          }}
          label={t('common.labels.email')}
          onChange={() => null}
          type='number'
          value={12}
        />

        <Typography sx={styles.subHeader}>
          Link your created course to the offer.
        </Typography>

        <AsyncAutocomplete<NameItem>
          fetchCondition={!isFetched}
          fetchOnFocus
          fullWidth
          labelField={ctrlRenderingSettings.name}
          onChange={() => null}
          service={getCoures}
          textFieldProps={{
            label: 'Select course'
          }}
          value={linkedCourse}
          valueField={ctrlRenderingSettings.name}
        />
      </Box>
    </Box>
  )

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <LeakAddIcon sx={{ mt: '5px' }} />
        <Typography sx={styles.header.title}>Create a New Offer</Typography>
      </Box>
      <Typography sx={styles.header.desc}>
        Start building your tutoring business by creating your offer below.
        Select the options that best describe your expertise and help students
        find the perfect match for their needs.
      </Typography>
      <Box
        component={ComponentEnum.Form}
        onSubmit={() => null}
        sx={styles.formWrapper}
      >
        {specializationBlock}
        {teachingParamBlock}
        {FAQBlock}

        <Box sx={{ display: 'flex', gap: '20px', mb: '12px' }}>
          <AppButton
            loading={false}
            sx={styles.button}
            type={ButtonTypeEnum.Submit}
          >
            Create offer
          </AppButton>
          <AppButton
            loading={false}
            sx={styles.button}
            type={ButtonTypeEnum.Submit}
            variant={ButtonVariantEnum.Tonal}
          >
            Save Draft
          </AppButton>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateOffer
