import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { beforeEach, describe, expect } from 'vitest'
import { vi } from 'vitest'

// vi.mock('react-i18next', () => ({
//   useTranslation: () => ({ t: (key) => key })
// }))

// vi.mock('~/hooks/use-breakpoints', () => () => ({ isMobile: false }))

const options = ['Apple', 'Banana', 'Cherry']

describe('SearchAutocomplete', () => {
  let setSearchMock
  let onSearchChangeMock

  beforeEach(() => {
    setSearchMock = vi.fn()
    onSearchChangeMock = vi.fn()

    render(
      <SearchAutocomplete
        onSearchChange={onSearchChangeMock}
        options={options}
        search=''
        setSearch={setSearchMock}
        textFieldProps={{ placeholder: 'Search fruits...' }}
      />
    )
  })

  it('matches snapshot', () => {
    const { container } = render(
      <SearchAutocomplete
        onSearchChange={onSearchChangeMock}
        options={options}
        search=''
        setSearch={setSearchMock}
        textFieldProps={{ placeholder: 'Search fruits...' }}
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('renders autocomplete with search input', () => {
    const input = screen.getByPlaceholderText(/search fruits/i)
    expect(input).toBeInTheDocument()
  })

  it('updates search input on typing', async () => {
    const input = screen.getByPlaceholderText(/search fruits/i)
    await userEvent.type(input, 'App')
    expect(input).toHaveValue('App')
  })

  it('filters options on typing', async () => {
    const input = screen.getByPlaceholderText(/search fruits/i)
    await userEvent.type(input, 'Ba')
    const option = await screen.findByText('Banana')
    expect(option).toBeInTheDocument()
  })

  it('selects an option on click', async () => {
    const input = screen.getByPlaceholderText(/search fruits/i)
    await userEvent.type(input, 'Ch')
    const option = await screen.findByText('Cherry')
    await userEvent.click(option)
    expect(input).toHaveValue('Cherry')
  })

  it('clears search input on clear icon click', async () => {
    const clearButton = screen.getByTestId('ClearIcon').closest('button')
    await userEvent.click(clearButton)
    expect(setSearchMock).toHaveBeenCalledWith('')
  })

  it('triggers search on search button click', async () => {
    const input = screen.getByPlaceholderText(/search fruits/i)
    await userEvent.type(input, 'Banana')
    const searchButton = screen.getByRole('button', { name: /search/i })
    await userEvent.click(searchButton)
    expect(setSearchMock).toHaveBeenCalledWith('Banana')
  })
})
