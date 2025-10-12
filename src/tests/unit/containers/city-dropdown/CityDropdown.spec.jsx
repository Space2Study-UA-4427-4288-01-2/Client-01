import { mockT } from '~/tests/setup-tests'

const { mockAsyncAutocomplete } = vi.hoisted(() => ({
  mockAsyncAutocomplete: vi.fn((props) => (
    <div
      data-testid='async-autocomplete'
      onClick={() => props.onChange({}, { _id: 1, name: 'Kyiv' })}
    >
      AsyncAutocompleteMock
    </div>
  ))
}))

vi.mock('~/services/city-service', () => ({
  cityService: {
    getCitiesMock: vi.fn()
  }
}))

vi.mock('~/components/async-autocomlete/AsyncAutocomplete', () => ({
  default: mockAsyncAutocomplete
}))

import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { ctrlRenderingSettings } from '~/constants/components'

let CityDropdown
let cityService

beforeAll(async () => {
  const module = await import('~/containers/city-dropdown/CityDropdown')
  CityDropdown = module.default
  const serviceModule = await import('~/services/city-service')
  cityService = serviceModule.cityService
})

describe('CityDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderDropdown = (props = {}) =>
    render(
      <CityDropdown
        city={props.city ?? null}
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
    expect(mockT).toHaveBeenCalledWith('common.labels.city')
  })

  it('should call cityService.getCitiesMock once when service function is invoked', async () => {
    const mockResponse = { data: [{ _id: 1, name: 'Kyiv' }] }
    cityService.getCitiesMock.mockResolvedValueOnce(mockResponse)

    renderDropdown()
    const props = mockAsyncAutocomplete.mock.calls[0][0]

    await act(async () => {
      await props.service()
    })

    expect(cityService.getCitiesMock).toHaveBeenCalledTimes(1)
  })

  it('triggers onChange callback with correct arguments', () => {
    const handleChange = vi.fn()
    renderDropdown({ onChange: handleChange })

    const auto = screen.getByTestId('async-autocomplete')
    fireEvent.click(auto)

    expect(handleChange).toHaveBeenCalledWith({}, { _id: 1, name: 'Kyiv' })
  })

  it('passes correct props to AsyncAutocomplete', () => {
    renderDropdown()
    const props = mockAsyncAutocomplete.mock.calls[0][0]

    expect(props.fullWidth).toBe(true)
    expect(props.labelField).toBe(ctrlRenderingSettings.name)
    expect(props.valueField).toBe(ctrlRenderingSettings.id)
    expect(props.textFieldProps.label).toBe('common.labels.city')
  })

  it('sets fetchCondition to true initially', () => {
    renderDropdown()
    const props = mockAsyncAutocomplete.mock.calls[0][0]
    expect(props.fetchCondition).toBe(true)
  })

  it('sets fetchOnFocus=false when city is provided', () => {
    const city = '10'
    renderDropdown({ city })
    const props = mockAsyncAutocomplete.mock.calls[0][0]
    expect(props.fetchOnFocus).toBe(false)
  })

  it('sets fetchOnFocus=true when no city is provided', () => {
    renderDropdown()
    const props = mockAsyncAutocomplete.mock.calls[0][0]
    expect(props.fetchOnFocus).toBe(true)
  })
})
