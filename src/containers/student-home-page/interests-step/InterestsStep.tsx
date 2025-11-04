import { FC, ReactNode, SyntheticEvent, useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/student-home-page/interests-step/InterestsStep.styles'
import img from '~/assets/img/student-home-page/interests.svg'
import { ButtonVariantEnum, NameItem, TypographyVariantEnum } from '~/types'
import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'
import SelectSubject from '~/containers/select-subject/SelectSubject'
import { useStepContext } from '~/context/step-context'

interface InterestsStepProps {
  btnsBox: ReactNode
}

const MAX_CHIPS = 2

const InterestsStep: FC<InterestsStepProps> = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()

  const stepLabel = Object.keys(stepData)[1] // 2-й крок — interests
  const interests = stepData[stepLabel] || []

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const handleAddSubject = useCallback(() => {
    if (!selectedSubject) return

    handleStepData(stepLabel, [...new Set([...interests, selectedSubject])])
    setSelectedSubject(null)
  }, [selectedSubject, interests, stepLabel, handleStepData])

  const onSubjectSelected = useCallback(
    (_: SyntheticEvent, value: NameItem | null) => {
      setSelectedSubject(value?.name ?? null)
    },
    []
  )

  const formHeader = () => (
    <Typography gutterBottom variant={TypographyVariantEnum.Body1}>
      {t(
        'student.interests.title',
        'Please choose the main subjects based on the category. You can add others later.'
      )}
    </Typography>
  )

  const imgBox = (
    <Box sx={styles.imgContainer}>
      <Box alt='student interests illustration' component='img' src={img} />
    </Box>
  )

  const addSubjectBlock = (
    <>
      <AppButton onClick={handleAddSubject} variant={ButtonVariantEnum.Tonal}>
        {t('student.interests.addBtn', 'Add one more subject')}
      </AppButton>
      <AppChipList
        defaultQuantity={MAX_CHIPS}
        items={[...stepData.interests]}
      />
    </>
  )

  return (
    <Box sx={styles.container}>
      {imgBox}

      <Box sx={styles.rightBox}>
        <Box sx={styles.form}>
          {formHeader()}

          <SelectSubject
            onSubjectChange={onSubjectSelected}
            subject={selectedSubject}
          />

          {addSubjectBlock}
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default InterestsStep
