import { afterEach, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import SearchInput from '~/components/search-input/SearchInput'
import { renderWithProviders } from '~tests/test-utils'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'

describe('SearchInput', () => {
  const mockSetSearch = vi.fn()

  const defaultProps = {
    search: '',
    setSearch: mockSetSearch
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  const renderComponent = (props = {}) =>
    renderWithProviders(<SearchInput {...defaultProps} {...props} />)

  it('should render text correctly', () => {
    const searchValue = 'test search'
    renderComponent({ search: searchValue })
    const input = screen.getByDisplayValue(searchValue)
    expect(input).toBeInTheDocument()
  })

  it('should render component with input in it', () => {
    renderComponent({ search: 'test' })
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should call setSearch when search icon is clicked', () => {
    renderComponent()
    const searchIcon = screen.getByTestId('search-icon')
    fireEvent.click(searchIcon)
    expect(mockSetSearch).toHaveBeenCalledWith('')
  })

  it('should call setSearch with empty string when delete icon is clicked', () => {
    renderComponent({ search: 'test' })
    const deleteIcon = screen.getByTestId('delete-icon')
    fireEvent.click(deleteIcon)
    expect(mockSetSearch).toHaveBeenCalledWith('')
  })

  it('should call setSearch when enter is pressed', async () => {
    renderComponent()
    const input = screen.getByRole('textbox')
    input.focus()
    await userEvent.keyboard('{Enter}')
    expect(mockSetSearch).toHaveBeenCalledWith('')
  })

  it('should have hidden class if search is empty', () => {
    renderComponent({ search: '' })
    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('hidden')
  })

  it('should have visible class if search is not empty', () => {
    renderComponent({ search: 'test search' })
    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('visible')
  })

  it('should update searchInput when typing', () => {
    renderComponent()
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new search' } })
    expect(input).toHaveValue('new search')
  })

  it('should call setSearch with current input value when enter is pressed after typing', async () => {
    renderComponent()
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'typed search')
    await userEvent.keyboard('{Enter}')
    expect(mockSetSearch).toHaveBeenCalledWith('typed search')
  })

  it('should call setSearch with current input value when enter is pressed after typing', () => {
    renderComponent()
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'typed search' } })
    fireEvent.keyPress(input, { key: 'Enter', charCode: 13 })
    expect(mockSetSearch).toHaveBeenCalledWith('typed search')
  })
})
