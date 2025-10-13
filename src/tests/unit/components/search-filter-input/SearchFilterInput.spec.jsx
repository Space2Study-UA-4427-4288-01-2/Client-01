import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

describe('SearchFilterInput', () => {
  let updateFilter

  const getInput = () => screen.getByRole('textbox')
  const getByRole = (role) => screen.getByRole(role)

  beforeEach(() => {
    updateFilter = vi.fn()
    window.history.pushState({}, '', '/test-path')

    render(
      <SearchFilterInput
        textFieldProps={{ placeholder: 'Search...' }}
        updateFilter={updateFilter}
      />
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render component with input in it', () => {
    expect(getInput()).toBeInTheDocument()
  })

  it('should render input and button', () => {
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render typed text correctly', () => {
    fireEvent.change(getInput(), { target: { value: 'hello' } })
    expect(getInput().value).toBe('hello')
  })

  it('should call updateFilter function on search button click', () => {
    const button = getByRole('button')
    fireEvent.change(getInput(), { target: { value: 'search-me' } })
    fireEvent.click(button)
    expect(updateFilter).toHaveBeenCalledWith('search-me')
  })

  it('should call updateFilter function when enter is pressed', () => {
    const input = getInput()
    fireEvent.change(input, { target: { value: 'enter-key' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })
    expect(updateFilter).toHaveBeenCalledWith('enter-key')
  })

  it('should delete typed text when delete button is clicked', () => {
    fireEvent.change(getInput(), { target: { value: 'to be cleared' } })
    const clearBtn = screen.getByTestId('clearIcon')
    fireEvent.click(clearBtn)
    expect(getInput()).toHaveValue('')
    expect(updateFilter).toHaveBeenCalledWith('')
  })
})
