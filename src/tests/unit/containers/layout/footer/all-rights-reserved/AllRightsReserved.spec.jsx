import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import AllRightReserved from '~/containers/layout/footer/all-rights-reserved/AllRightsReserved'

const tMock = vi.fn((key, opts) => `${key}-${opts?.year ?? ''}`)
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: tMock })
}))

describe('AllRightReserved component', () => {
  const RealDate = Date

  beforeAll(() => {
    vi.spyOn(global, 'Date').mockImplementation(
      () => new RealDate('2025-03-01T00:00:00Z')
    )
  })

  afterAll(() => {
    global.Date = RealDate
    vi.clearAllMocks()
  })

  it('should render translation text with current year', () => {
    render(<AllRightReserved />)
    expect(
      screen.getByText(`footer.allRightsReserved-2025`)
    ).toBeInTheDocument()
  })

  it('should memoize the year value and not recompute on re-render', () => {
    vi.clearAllMocks()
    const { rerender } = render(<AllRightReserved />)

    expect(tMock).toHaveBeenCalledTimes(1)
    const firstCallArg = tMock.mock.calls[0][1]?.year

    vi.spyOn(global, 'Date').mockImplementation(
      () => new RealDate('2024-03-01T00:00:00Z')
    )
    rerender(<AllRightReserved />)

    expect(tMock).toHaveBeenCalledTimes(2)
    const secondCallArg = tMock.mock.calls[1][1]?.year

    expect(secondCallArg).toBe(firstCallArg)
  })
})
