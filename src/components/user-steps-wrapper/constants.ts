import { nameField, textField } from '~/utils/validations/common'

export const initialValues = {
  firstName: '',
  lastName: '',
  country: null,
  city: null,
  professionalSummary: ''
}

export const validations = {
  firstName: nameField,
  lastName: nameField,
  professionalSummary: textField(0, 200)
}

export const getLabelsByRole = (isTutor: boolean) => {
  return `generalInfo ${isTutor ? 'subjects' : 'interests'} language photo`.split(
    ' '
  )
}

export const interestsLabel = 'interests'
