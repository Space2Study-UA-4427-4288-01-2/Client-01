import { useEffect } from 'react'
import Box from '@mui/material/Box'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = (isUserFetched, setIsUserFetched, btnsBox) => {
  useEffect(() => {
    if (!isUserFetched) {
      setTimeout(() => setIsUserFetched(true), 1000)
    }
  }, [isUserFetched, setIsUserFetched])

  return (
    <Box data-testid='general-info-step' sx={styles.container}>
      GeneralInfo step
      {isUserFetched ? 'User data fetched' : 'Loading user data...'}
      {btnsBox}
    </Box>
  )
}

export default GeneralInfoStep
