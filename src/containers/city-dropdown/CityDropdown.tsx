import { SyntheticEvent, useCallback, useState } from 'react'
import Box from '@mui/material/Box'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import { styles } from '~/containers/city-dropdown/CityDropdown.styles'
import { useTranslation } from 'react-i18next'
import { NameItem } from '~/types'
import { ctrlRenderingSettings } from '~/constants/components'
import { cityService } from '~/services/city-service'

interface CityDropdown {
  city: NameItem | null
  onChange: (_: SyntheticEvent, value: NameItem | null) => void
}

const CityDropdown = ({ city, onChange: onCityChange }: CityDropdown) => {
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const { t } = useTranslation()

  const getCities = useCallback(() => {
    setIsFetched(true)
    return cityService.getCitiesMock()
  }, [setIsFetched])

  return (
    <Box sx={styles.root}>
      <AsyncAutocomplete<NameItem>
        fetchCondition={!isFetched}
        fetchOnFocus={!city}
        fullWidth
        labelField={ctrlRenderingSettings.labelField}
        onChange={onCityChange}
        service={getCities}
        textFieldProps={{
          label: t('common.labels.city')
        }}
        value={city}
        valueField={ctrlRenderingSettings.valueField}
      />
    </Box>
  )
}

export default CityDropdown
