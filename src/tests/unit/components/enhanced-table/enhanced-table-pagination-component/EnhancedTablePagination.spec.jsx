import { render, screen, fireEvent } from '@testing-library/react'
import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'
import { beforeEach, describe, expect } from 'vitest'
import { vi } from 'vitest'

describe('EnhancedTablePagination', () => {
  let paginationMock
  beforeEach(() => {
    paginationMock = {
      page: 1,
      pageInput: 1,
      rowsPerPage: 5,
      pageCount: 4,
      itemsCount: 20,
      handleChangePage: vi.fn(),
      handleChangeRowsPerPage: vi.fn(),
      handleChangePageInput: vi.fn(),
      handlePageSubmit: vi.fn()
    }
    render(<EnhancedTablePagination pagination={paginationMock} />)
  })

  describe('when rendering first page', () => {
    it('should display correct rows range', () => {
      expect(
        screen.getByText(
          (content) => content.includes('1-5') && content.includes('20')
        )
      ).toBeInTheDocument()
    })

    it('should disable previous button', () => {
      const prevButton = screen.getByRole('button', { name: /previous/i })
      expect(prevButton).toBeDisabled()
    })
  })

  it('should change page from 1 to 2', () => {
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)

    expect(paginationMock.handleChangePage).toHaveBeenCalledWith(
      expect.any(Object),
      2
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <EnhancedTablePagination pagination={paginationMock} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
