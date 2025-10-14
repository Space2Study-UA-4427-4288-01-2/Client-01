import '@testing-library/jest-dom'
import { vi } from 'vitest'

const mockT = vi.fn((key) => key)

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockT
  })
}))

export { mockT }
