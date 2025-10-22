import { SyntheticEvent, useCallback, useState } from 'react'
import Box from '@mui/material/Box'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import { styles } from '~/containers/select-subject/SelectSubject.styles'
import { useTranslation } from 'react-i18next'
import { NameItem } from '~/types'
import { ctrlRenderingSettings } from '~/constants/components'
import { ResourceService } from '~/services/resource-service'
import { AxiosResponse } from 'axios'
import { subjectService } from '~/services/subject-service'

interface SelectSubjectProps {
  subject: string | null
  onSubjectChange: (_: SyntheticEvent, value: NameItem | null) => void
}

const SelectSubject = ({ subject, onSubjectChange }: SelectSubjectProps) => {
  const [isCategoriesFetched, setIsCategoriesFetched] = useState<boolean>(false)
  const [isSubjectFetched, setIsSubjectFetched] = useState<boolean>(false)
  const [category, setCategory] = useState<NameItem | null>(null)
  const { t } = useTranslation()

  const getCategories = useCallback(() => {
    setIsCategoriesFetched(true)
    return ResourceService.getResourcesCategoriesNamesMock()
  }, [setIsCategoriesFetched])

  const getSubjects = useCallback(() => {
    setIsSubjectFetched(true)
    return subjectService.getSubjectsNamesMock() as Promise<
      AxiosResponse<NameItem[]>
    >
  }, [setIsSubjectFetched])

  const onCategorySelected = useCallback(
    (_: SyntheticEvent, value: NameItem | null) => {
      setCategory(value)
    },
    []
  )

  return (
    <Box sx={styles.root}>
      <AsyncAutocomplete<NameItem>
        data-testid='main-subject'
        fetchCondition={!isCategoriesFetched}
        fetchOnFocus
        fullWidth
        labelField={ctrlRenderingSettings.name}
        onChange={onCategorySelected}
        service={getCategories}
        textFieldProps={{
          label: t('becomeTutor.categories.mainSubjectsLabel')
        }}
        value={category?._id ?? null}
        valueField={ctrlRenderingSettings.id}
      />

      <AsyncAutocomplete<NameItem>
        data-testid='selected-subject'
        disabled={!category}
        fetchCondition={!isSubjectFetched}
        fetchOnFocus
        fullWidth
        labelField={ctrlRenderingSettings.name}
        onChange={onSubjectChange}
        service={getSubjects}
        textFieldProps={{
          label: t('becomeTutor.categories.subjectLabel')
        }}
        value={subject}
        valueField={ctrlRenderingSettings.name}
      />
    </Box>
  )
}

export default SelectSubject
