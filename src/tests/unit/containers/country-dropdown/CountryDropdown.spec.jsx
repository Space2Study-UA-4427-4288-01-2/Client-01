import { mockT } from '~/tests/setup-tests'

const { mockAsyncAutocomplete } = vi.hoisted(() => ({
  mockAsyncAutocomplete: vi.fn((props) => (
    <div
      data-testid='async-autocomplete'
      onClick={() => props.onChange({}, { _id: '1', name: 'Ukraine' })}
    >
      AsyncAutocompleteMock
    </div>
  ))
}))

vi.mock('~/services/country-service', () => ({
  countryService: {
    getCountriesMock: vi.fn()
  }
}))

vi.mock('~/components/async-autocomlete/AsyncAutocomplete', () => ({
  default: mockAsyncAutocomplete
}))

import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ctrlRenderingSettings } from '~/constants/components'

let CountryDropdown
let countryService

beforeAll(async () => {
  const module = await import('~/containers/country-dropdown/CountryDropdown')
  CountryDropdown = module.default
  const serviceModule = await import('~/services/country-service')
  countryService = serviceModule.countryService
})

describe('CountryDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderDropdown = (props = {}) =>
    render(
      <CountryDropdown
        country={props.country ?? null}
        onChange={props.onChange ?? vi.fn()}
      />
    )

  it('should render snapshot correctly', () => {
    const snapshot = renderDropdown()
    expect(snapshot.asFragment()).toMatchSnapshot()
  })

  it('renders AsyncAutocomplete component', () => {
    renderDropdown()
    expect(screen.getByTestId('async-autocomplete')).toBeInTheDocument()
    expect(mockAsyncAutocomplete).toHaveBeenCalledTimes(1)
  })

  it('calls translation function with correct key', () => {
    renderDropdown()
    expect(mockT).toHaveBeenCalledWith('common.labels.country')
  })

  it('should call service once when service function is invoked', async () => {
    const mockResponse = { data: [{ _id: '1', name: 'Ukraine' }] }
    countryService.getCountriesMock.mockResolvedValueOnce(mockResponse)

    renderDropdown()
    const props = mockAsyncAutocomplete.mock.calls[0][0]

    await act(async () => {
      await props.service()
    })

    expect(countryService.getCountriesMock).toHaveBeenCalledTimes(1)
  })

  it('triggers onChange callback with correct arguments', () => {
    const handleChange = vi.fn()
    renderDropdown({ onChange: handleChange })

    const auto = screen.getByTestId('async-autocomplete')
    fireEvent.click(auto)

    expect(handleChange).toHaveBeenCalledWith({}, { _id: '1', name: 'Ukraine' })
  })

  describe('AsyncAutocomplete props', () => {
    let props

    beforeEach(() => {
      vi.clearAllMocks()
      renderDropdown()
      props = mockAsyncAutocomplete.mock.calls[0][0]
    })

    it('passes fullWidth true', () => {
      expect(props.fullWidth).toBe(true)
    })

    it('passes correct labelField', () => {
      expect(props.labelField).toBe(ctrlRenderingSettings.name)
    })

    it('passes correct valueField', () => {
      expect(props.valueField).toBe(ctrlRenderingSettings.id)
    })

    it('passes correct textFieldProps.label', () => {
      expect(props.textFieldProps.label).toBe('common.labels.country')
    })
  })

  it('sets fetchCondition to true initially', () => {
    renderDropdown()
    const props = mockAsyncAutocomplete.mock.calls[0][0]
    expect(props.fetchCondition).toBe(true)
  })

  it('sets fetchOnFocus=false when country is provided', () => {
    const country = '5'
    renderDropdown({ country })
    const props = mockAsyncAutocomplete.mock.calls[0][0]
    expect(props.fetchOnFocus).toBe(false)
  })

  it('sets fetchOnFocus=true when no country provided', () => {
    renderDropdown()
    const props = mockAsyncAutocomplete.mock.calls[0][0]
    expect(props.fetchOnFocus).toBe(true)
  })
})
