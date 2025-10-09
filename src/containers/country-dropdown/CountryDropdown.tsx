import { SyntheticEvent, useCallback, useState } from 'react'
import Box from '@mui/material/Box'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import { styles } from '~/containers/country-dropdown/CountryDropdown.styles'
import { useTranslation } from 'react-i18next'
import { NameItem } from '~/types'
import { ctrlRenderingSettings } from '~/constants/components'
import { countryService } from '~/services/country-service'

interface CountryDropdown {
  country: NameItem | null
  onChange: (_: SyntheticEvent, value: NameItem | null) => void
}

const CountryDropdown = ({
  country,
  onChange: onCountryChange
}: CountryDropdown) => {
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const { t } = useTranslation()

  const getCountries = useCallback(() => {
    setIsFetched(true)
    return countryService.getCoutriesMock()
  }, [setIsFetched])

  return (
    <Box sx={styles.root}>
      <AsyncAutocomplete<NameItem>
        fetchCondition={!isFetched}
        fetchOnFocus={!country}
        fullWidth
        labelField={ctrlRenderingSettings.labelField}
        onChange={onCountryChange}
        service={getCountries}
        textFieldProps={{
          label: t('common.labels.country')
        }}
        value={country}
        valueField={ctrlRenderingSettings.valueField}
      />
    </Box>
  )
}

export default CountryDropdown
