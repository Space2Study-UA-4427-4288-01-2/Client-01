import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

interface SubjectsStepProps {
  btnsBox?: React.ReactNode
}

const SubjectsStep: React.FC<SubjectsStepProps> = ({ btnsBox }) => {
  return (
    <Box data-testid='subjects-step' sx={styles.container}>
      <Box sx={styles.rigthBox}>
        Subjects step
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
