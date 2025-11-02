import { nameField } from './common'

const userNameValidator = (value) => {
  const trimmedValue = value.trim()
  if (trimmedValue.length >= 1 && trimmedValue.length < 3) {
    return 'common.errorMessages.shortText'
  }
  return nameField(trimmedValue)
}

export const firstName = userNameValidator
export const lastName = userNameValidator
