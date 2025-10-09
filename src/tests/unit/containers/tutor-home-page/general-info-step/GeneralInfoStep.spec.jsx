import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'

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

vi.mock('~/components/app-text-field/AppTextField', () => ({
  default: vi.fn((props) => (
    <input
      data-testid={props['data-testid']}
      onChange={(e) => props.onChange(e)}
      value={props.value}
    />
  ))
}))

vi.mock('~/components/app-text-area/AppTextArea', () => ({
  default: vi.fn((props) => (
    <textarea
      data-testid='app-textarea'
      onChange={(e) => props.onChange(e)}
      value={props.value}
    />
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
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderComponent = (props = {}) =>
    render(
      <GeneralInfoStep
        btnsBox={<div data-testid='btns-box'>Buttons</div>}
        {...props}
      />
    )

  it('renders correctly with all main elements', () => {
    renderComponent()

    expect(screen.getByRole('img')).toHaveAttribute('src', 'mocked-student.svg')
    expect(screen.getByTestId('user-first-name')).toBeInTheDocument()
    expect(screen.getByTestId('user-last-name')).toBeInTheDocument()
    expect(screen.getByTestId('country-dropdown')).toBeInTheDocument()
    expect(screen.getByTestId('city-dropdown')).toBeInTheDocument()
    expect(screen.getByTestId('app-textarea')).toBeInTheDocument()
    expect(screen.getByTestId('btns-box')).toBeInTheDocument()
  })

  it('updates first name field and triggers handleStepData', () => {
    renderComponent()

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
    renderComponent()

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
    renderComponent()

    const textArea = screen.getByTestId('app-textarea')
    fireEvent.change(textArea, { target: { value: 'New summary' } })

    expect(mockHandleStepData).toHaveBeenCalledWith(
      'generalInfo',
      expect.objectContaining({
        professionalSummary: 'New summary'
      })
    )
  })

  it('handles country dropdown change correctly', () => {
    renderComponent()

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
    renderComponent()

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
