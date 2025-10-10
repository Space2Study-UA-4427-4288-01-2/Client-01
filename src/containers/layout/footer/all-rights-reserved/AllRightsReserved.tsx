import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import { styles } from '~/containers/layout/footer/all-rights-reserved/AllRightsReserved.styles'

const AllRightReserved = () => {
  const { t } = useTranslation()
  const currentYear = useMemo(() => new Date().getFullYear(), [])
  return (
    <Typography sx={styles.copyRight}>
      {t('footer.allRightsReserved', { year: currentYear })}
    </Typography>
  )
}

export default AllRightReserved
