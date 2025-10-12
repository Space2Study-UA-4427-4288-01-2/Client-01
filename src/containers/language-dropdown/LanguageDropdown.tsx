import { SyntheticEvent, useCallback, useState } from 'react'
import Box from '@mui/material/Box'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import { styles } from '~/containers/language-dropdown/LanguageDropdown.styles'
import { useTranslation } from 'react-i18next'
import { NameItem } from '~/types'
import { ctrlRenderingSettings } from '~/constants/components'
import { languageService } from '~/services/language-service'

interface LanguageDropdown {
  language: string | null
  onChange: (_: SyntheticEvent, value: NameItem | null) => void
}

const LanguageDropdown = ({
  language,
  onChange: onLanguageChange
}: LanguageDropdown) => {
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const { t } = useTranslation()

  const getLanguages = useCallback(() => {
    setIsFetched(true)
    return languageService.getLanguagesMock()
  }, [setIsFetched])

  return (
    <Box sx={styles.root}>
      <AsyncAutocomplete<NameItem>
        fetchCondition={!isFetched}
        fetchOnFocus={!language}
        fullWidth
        labelField={ctrlRenderingSettings.name}
        onChange={onLanguageChange}
        service={getLanguages}
        textFieldProps={{
          label: t('becomeTutor.language.autocompleteLabel')
        }}
        value={language}
        valueField={ctrlRenderingSettings.name}
      />
    </Box>
  )
}

export default LanguageDropdown
