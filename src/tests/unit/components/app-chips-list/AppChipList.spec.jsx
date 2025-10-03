import { render, screen, fireEvent } from '@testing-library/react'
import AppChipList from '~/components/app-chips-list/AppChipList'
import { useState } from 'react'

const getItemList = (count) =>
  Array.from({ length: count }, (_, i) => `Chip-${i + 1}`)

const HostComp = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems)

  const handleChipDelete = (item) => {
    setItems((prev) => prev.filter((i) => i !== item))
  }

  return (
    <AppChipList
      defaultQuantity={2}
      handleChipDelete={handleChipDelete}
      items={items}
    />
  )
}

const items = ['One', 'Two', 'Three']

describe('AppChipList', () => {
  it('should render snapshot correctly', () => {
    const snapshot = render(<AppChipList defaultQuantity={3} items={items} />)
    expect(snapshot.asFragment()).toMatchSnapshot()
  })

  describe('AppChipList - rendering chips', () => {
    beforeEach(() => {
      render(<AppChipList defaultQuantity={3} items={items} />)
    })

    it('should render all chip texts', () => {
      items.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument()
      })
    })

    it('should render the correct number of chips', () => {
      const chips = screen.getAllByTestId('chip')
      expect(chips).toHaveLength(items.length)
    })
  })

  it('it should show chip with +3', () => {
    render(
      <AppChipList defaultQuantity={2} items={[...items, 'Four', 'five']} />
    )

    const showMore = screen.getByTestId('amount-of-chips')
    expect(showMore).toHaveTextContent('+3')
  })

  describe('AppChipList - limited rendering with "show more"', () => {
    const items = getItemList(10)

    beforeEach(() => {
      render(<AppChipList defaultQuantity={7} items={items} />)
    })

    it('should render only 7 visible chips', () => {
      const visibleChips = screen.getAllByTestId('chip')
      expect(visibleChips).toHaveLength(7)
    })

    it('should render the "show more" chip with the correct count', () => {
      const showMoreChip = screen.getByTestId('amount-of-chips')
      expect(showMoreChip).toHaveTextContent('+3')
    })
  })

  it('should show only 10 chips', () => {
    const items = getItemList(11)

    render(<AppChipList defaultQuantity={10} items={items} />)

    const visibleChips = screen.getAllByTestId('chip')
    expect(visibleChips).toHaveLength(10)
  })

  it('should call delete handler after close button clicked', () => {
    const handleChipDelete = vi.fn()

    render(
      <AppChipList
        defaultQuantity={2}
        handleChipDelete={handleChipDelete}
        items={['One', 'Two']}
      />
    )

    const deleteButton = screen.getAllByTestId('close-btn')[0]
    fireEvent.click(deleteButton)

    expect(handleChipDelete).toHaveBeenCalledWith('One')
  })

  describe('AppChipList - deleting chips', () => {
    beforeEach(() => {
      render(<HostComp initialItems={['One', 'Two']} />)
    })

    it('should remove the first chip when delete is clicked', () => {
      const deleteButton = screen.getAllByTestId('close-btn')[0]
      fireEvent.click(deleteButton)

      const chips = screen.getAllByTestId('chip')
      expect(chips).toHaveLength(1)
    })

    it('should remove the correct chip and keep the other one', () => {
      const deleteButton = screen.getAllByTestId('close-btn')[0]
      fireEvent.click(deleteButton)

      expect(screen.getByText('Two')).toBeInTheDocument()
    })
  })
})
