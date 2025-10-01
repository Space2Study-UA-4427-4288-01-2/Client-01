import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

const mockOpenMenu = vi.fn()
const mockCloseMenu = vi.fn()
const mockRenderMenu = vi.fn((children) => (
  <ul
    onKeyDown={(e) => e.key === 'Escape' && mockCloseMenu()}
    role='menu'
    tabIndex={-1}
  >
    {children}
  </ul>
))

vi.mock('~/hooks/use-menu', () => ({
  default: () => ({
    openMenu: mockOpenMenu,
    renderMenu: mockRenderMenu,
    closeMenu: mockCloseMenu
  })
}))

const actionFunc = vi.fn().mockResolvedValue(undefined)
const refetchData = vi.fn()

describe('EnhancedTableRow', () => {
  const baseItem = { _id: '1', name: 'Some name', value: '13' }
  const columns = [
    { field: 'name', label: 'Name' },
    { field: 'value', label: 'Value' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should renders correctly snapshot', () => {
    const snapshot = render(
      <table>
        <tbody>
          <EnhancedTableRow
            columns={columns}
            item={baseItem}
            selectedRows={[]}
          />
        </tbody>
      </table>
    )
    expect(snapshot.asFragment()).toMatchSnapshot()
  })

  describe('EnhancedTableRow - action menu', () => {
    it('should render action menu when menu icon is clicked', () => {
      render(
        <table>
          <tbody>
            <EnhancedTableRow
              columns={columns}
              item={baseItem}
              rowActions={[{ label: 'Delete', func: vi.fn() }]}
              selectedRows={[]}
            />
          </tbody>
        </table>
      )

      fireEvent.click(screen.getByTestId('menu-icon'))

      expect(
        screen.getByRole('menuitem', { name: /Delete/i })
      ).toBeInTheDocument()
    })
  })

  describe('EnhancedTableRow - checkbox behavior', () => {
    it('should call handleSelectClick when checkbox is clicked', () => {
      const mockIsSelected = vi.fn(() => false)
      const mockHandleSelectClick = vi.fn()

      render(
        <table>
          <tbody>
            <EnhancedTableRow
              columns={columns}
              isSelection
              item={baseItem}
              select={{
                isSelected: mockIsSelected,
                handleSelectClick: mockHandleSelectClick
              }}
              selectedRows={[]}
            />
          </tbody>
        </table>
      )

      const checkbox = screen.getByRole('checkbox')

      fireEvent.click(checkbox)

      expect(mockHandleSelectClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('EnhancedTableRow - onAction', () => {
    beforeEach(() => {
      render(
        <table>
          <tbody>
            <EnhancedTableRow
              columns={columns}
              item={baseItem}
              refetchData={refetchData}
              rowActions={[{ label: 'Delete', func: actionFunc }]}
              selectedRows={[]}
            />
          </tbody>
        </table>
      )
      vi.clearAllMocks()
    })

    it('should call onAction function when clicking on the menu item', async () => {
      const deleteItem = screen.getByText('Delete')
      fireEvent.click(deleteItem)

      await waitFor(() => {
        expect(actionFunc).toHaveBeenCalledWith('1')
      })
    })

    it('should close menu when "Escape" is pressed', async () => {
      fireEvent.click(screen.getByTestId('menu-icon'))
      expect(mockOpenMenu).toHaveBeenCalled()

      const menu = screen.getByRole('menu')

      fireEvent.keyDown(menu, {
        key: 'Escape',
        code: 'Escape'
      })

      await waitFor(() => {
        expect(mockCloseMenu).toHaveBeenCalled()
      })
    })
  })
})
