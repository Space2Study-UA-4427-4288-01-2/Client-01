import { firstName, lastName } from '~/utils/validations/general-info-step'
import { expect } from 'vitest'

describe('General Info Step Validations', () => {
  describe('firstName validation', () => {
    it('Should return error for names shorter than 3 characters', () => {
      const result = firstName('Jo')
      expect(result).toBe('common.errorMessages.shortText')
    })

    it('Should return error for invalid characters', () => {
      const result = firstName('John123')
      expect(result).toBe('common.errorMessages.nameAlphabeticOnly')
    })
  })
  describe('lastName validation', () => {
    it('Should return error for names shorter than 3 characters', () => {
      const result = lastName('Do')
      expect(result).toBe('common.errorMessages.shortText')
    })

    it('Should return error for invalid characters', () => {
      const result = lastName('Doe123')
      expect(result).toBe('common.errorMessages.nameAlphabeticOnly')
    })
  })
})
