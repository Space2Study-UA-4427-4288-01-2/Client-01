import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { mockAppTextField } from '~/tests/unit/mocks/AppTextField.mock'
import { mockAppTextArea } from '~/tests/unit/mocks/AppTextArea.mock'

const mockOnValidationChange = vi.fn()

const { mockHandleStepData } = vi.hoisted(() => ({
  mockHandleStepData: vi.fn()
}))

vi.mock('~/context/step-context', () => ({
  useStepContext: () => ({
    stepData: {
      generalInfo: {
        data: {
          firstName: 'John',
          lastName: 'Doe',
          country: { _id: '1', name: 'Ukraine' },
          city: { _id: '2', name: 'Kyiv' },
          professionalSummary: 'Experienced tutor'
        }
      }
    },
    handleStepData: mockHandleStepData
  })
}))

vi.mock('~/containers/country-dropdown/CountryDropdown', () => ({
  default: vi.fn(({ onChange }) => (
    <div
      data-testid='country-dropdown'
      onClick={() => onChange({}, { _id: '10', name: 'Poland' })}
    >
      CountryDropdownMock
    </div>
  ))
}))

vi.mock('~/containers/city-dropdown/CityDropdown', () => ({
  default: vi.fn(({ onChange }) => (
    <div
      data-testid='city-dropdown'
      onClick={() => onChange({}, { _id: '20', name: 'Warsaw' })}
    >
      CityDropdownMock
    </div>
  ))
}))

vi.mock('~/assets/img/shared-images/student.svg', () => ({
  default: 'mocked-student.svg'
}))

let GeneralInfoStep
beforeAll(async () => {
  const mod = await import(
    '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
  )
  GeneralInfoStep = mod.default
})

describe('GeneralInfoStep', () => {
  const renderComponent = (props = {}) =>
    render(
      <GeneralInfoStep
        btnsBox={<div data-testid='btns-box'>Buttons</div>}
        onValidationChange={mockOnValidationChange}
        {...props}
      />
    )
  beforeEach(() => {
    vi.clearAllMocks()
    renderComponent()
  })

  describe('GeneralInfoStep — initial render', () => {
    it('renders image with mocked src', () => {
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'mocked-student.svg'
      )
    })

    it('renders two AppTextField instances', () => {
      expect(mockAppTextField).toHaveBeenCalledTimes(2)
    })

    it('renders first name input', () => {
      expect(screen.getByTestId('user-first-name')).toBeInTheDocument()
    })

    it('renders last name input', () => {
      expect(screen.getByTestId('user-last-name')).toBeInTheDocument()
    })

    it('renders country dropdown', () => {
      expect(screen.getByTestId('country-dropdown')).toBeInTheDocument()
    })

    it('renders city dropdown', () => {
      expect(screen.getByTestId('city-dropdown')).toBeInTheDocument()
    })

    it('renders professional summary textarea', () => {
      expect(mockAppTextArea).toHaveBeenCalledTimes(1)
      expect(screen.getByTestId('user-info')).toBeInTheDocument()
    })
  })

  it('updates first name field and triggers handleStepData', () => {
    const input = screen.getByTestId('user-first-name')
    fireEvent.change(input, { target: { value: 'Jane' } })

    expect(mockHandleStepData).toHaveBeenCalledWith(
      'generalInfo',
      expect.objectContaining({
        firstName: 'Jane'
      })
    )
  })

  it('updates last name field and triggers handleStepData', () => {
    const input = screen.getByTestId('user-last-name')
    fireEvent.change(input, { target: { value: 'Smith' } })

    expect(mockHandleStepData).toHaveBeenCalledWith(
      'generalInfo',
      expect.objectContaining({
        lastName: 'Smith'
      })
    )
  })

  it('updates professional summary and triggers handleStepData', () => {
    const textArea = screen.getByTestId('user-info')
    fireEvent.change(textArea, { target: { value: 'New summary' } })

    expect(mockHandleStepData).toHaveBeenCalledWith(
      'generalInfo',
      expect.objectContaining({
        professionalSummary: 'New summary'
      })
    )
  })

  it('handles country dropdown change correctly', () => {
    const countryDropdown = screen.getByTestId('country-dropdown')
    fireEvent.click(countryDropdown)

    expect(mockHandleStepData).toHaveBeenCalledWith(
      'generalInfo',
      expect.objectContaining({
        country: '10'
      })
    )
  })

  it('handles city dropdown change correctly', () => {
    const cityDropdown = screen.getByTestId('city-dropdown')
    fireEvent.click(cityDropdown)

    expect(mockHandleStepData).toHaveBeenCalledWith(
      'generalInfo',
      expect.objectContaining({
        city: '20'
      })
    )
  })
})
