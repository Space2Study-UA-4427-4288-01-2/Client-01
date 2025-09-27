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

describe('AppChipList (integration)', () => {
  const defaultItems = ['One', 'Two', 'Three', 'Four']

  it('should show chips', () => {
    const items = ['One', 'Two', 'Three']

    render(<AppChipList defaultQuantity={3} items={items} />)

    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })

    const chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(items.length)
  })

  it('it should show chip with +3', () => {
    render(
      <AppChipList defaultQuantity={2} items={[...defaultItems, 'five']} />
    )

    const showMore = screen.getByTestId('amount-of-chips')
    expect(showMore).toHaveTextContent('+3')
  })

  it('should show only 7 chips', () => {
    const items = getItemList(10)

    render(<AppChipList defaultQuantity={7} items={items} />)

    const visibleChips = screen.getAllByTestId('chip')
    expect(visibleChips).toHaveLength(7)

    const showMoreChip = screen.getByTestId('amount-of-chips')
    expect(showMoreChip).toHaveTextContent('+3')
  })

  it('should show only 10 chips', () => {
    const items = getItemList(11)

    render(<AppChipList defaultQuantity={10} items={items} />)

    const visibleChips = screen.getAllByTestId('chip')
    expect(visibleChips).toHaveLength(10)

    const showMoreChip = screen.getByTestId('amount-of-chips')
    expect(showMoreChip).toHaveTextContent('+1')
  })

  // which is better? this one or the next
  it('should delete 1 chip', () => {
    let items = ['One', 'Two']
    const handleChipDelete = vi.fn()

    render(
      <AppChipList
        defaultQuantity={2}
        handleChipDelete={handleChipDelete}
        items={items}
      />
    )

    let chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(2)

    const deleteButton = screen.getAllByTestId('close-btn')[0]
    fireEvent.click(deleteButton)

    expect(handleChipDelete).toHaveBeenCalledWith('One')
  })

  it('should delete 1 chip from the list', () => {
    render(<HostComp initialItems={['One', 'Two']} />)

    expect(screen.getAllByTestId('chip')).toHaveLength(2)

    const deleteButton = screen.getAllByTestId('close-btn')[0]
    fireEvent.click(deleteButton)

    const chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(1)
    expect(screen.queryByText('One')).not.toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })
})
