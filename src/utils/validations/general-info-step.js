import { nameField } from './common'

export const firstName = (value) => {
  {
    if (value.trim().length >= 1 && value.trim().length < 3) {
      return 'common.errorMessages.shortText'
    }
    console.log(value.trim().length)
    return nameField(value.trim())
  }
}

export const lastName = (value) => {
  {
    if (value.trim().length >= 1 && value.trim().length < 3) {
      return 'common.errorMessages.shortText'
    }
    return nameField(value.trim())
  }
}
