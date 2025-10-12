import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import { TypographyVariantEnum } from '~/types'
import { useTranslation } from 'react-i18next'

import { useStepContext } from '~/context/step-context'
import { useCallback } from 'react'
import LanguageDropdown from '~/containers/language-dropdown/LanguageDropdown'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

const LanguageStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const { t } = useTranslation()

  const { language } = stepData

  const handleDropDownChange = useCallback(
    (_, value) => {
      handleStepData('language', value.name)
    },
    [handleStepData]
  )

  const formHeader = () => (
    <Typography gutterBottom variant={TypographyVariantEnum.Body1}>
      {t('becomeTutor.language.title')}
    </Typography>
  )
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <Box sx={styles.form}>
          {formHeader()}
          <LanguageDropdown
            language={language}
            onChange={handleDropDownChange}
          ></LanguageDropdown>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
