import { Box } from '@mui/material'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
interface SubjectsStepProps {
  btnsBox?: React.ReactNode
}

const AddPhotoStep: React.FC<SubjectsStepProps> = ({ btnsBox }) => {
  return (
    <Box data-testid='add-photo-step' sx={style.root}>
      AddPhoto step
      {btnsBox}
    </Box>
  )
}

export default AddPhotoStep
