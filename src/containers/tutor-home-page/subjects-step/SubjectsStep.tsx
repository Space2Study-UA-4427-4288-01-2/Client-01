import { FC, ReactNode, SyntheticEvent, useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { ButtonVariantEnum, NameItem, TypographyVariantEnum } from '~/types'
import AppButton from '~/components/app-button/AppButton'
import SelectSubject from '~/containers/select-subject/SelectSubject'
import AppChipList from '~/components/app-chips-list/AppChipList'
import { useStepContext } from '~/context/step-context'

interface SubjectsStepProps {
  btnsBox: ReactNode
}
const MAX_CHIPS = 2

const SubjectsStep: FC<SubjectsStepProps> = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const formHeader = () => (
    <Typography gutterBottom variant={TypographyVariantEnum.Body1}>
      {t('becomeTutor.categories.title')}
    </Typography>
  )

  const handleAddSubject = useCallback(() => {
    if (selectedSubject) {
      handleStepData('subjects', [
        ...new Set([...stepData.subjects, selectedSubject])
      ])
      setSelectedSubject(null)
    }
  }, [selectedSubject, setSelectedSubject, handleStepData, stepData])

  const onSubjectSeclected = useCallback(
    (_: SyntheticEvent, value: NameItem | null) => {
      setSelectedSubject(value?.name ?? null)
    },
    [setSelectedSubject]
  )

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box alt='study category and subject' component='img' src={img} />
      </Box>
      <Box sx={styles.rightBox}>
        <Box sx={styles.form}>
          {formHeader()}

          <SelectSubject
            onChange={onSubjectSeclected}
            subject={selectedSubject}
          ></SelectSubject>

          <AppButton
            onClick={handleAddSubject}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('becomeTutor.categories.btnText')}
          </AppButton>

          <AppChipList
            defaultQuantity={MAX_CHIPS}
            items={[...stepData.subjects]}
          />
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
