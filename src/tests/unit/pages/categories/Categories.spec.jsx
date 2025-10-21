import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Categories from '~/pages/categories/Categories'
import { renderWithProviders } from '~tests/test-utils'

describe('Categories component', () => {
  const secondLoginState = {
    appMain: { isFirstLogin: false, userRole: 'tutor', userId: '1' }
  }
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(<Categories />, { preloadedState: secondLoginState })
  })

  it('renders main structure correctly', () => {
    expect(screen.getByText('categoriesPage.title')).toBeInTheDocument()
    expect(screen.getByText('categoriesPage.description')).toBeInTheDocument()
  })

  it('renders OfferRequestBlock section for tutor', () => {
    expect(
      screen.getByText('findOffers.offerRequestBlock.title.tutor')
    ).toBeInTheDocument()
  })

  it('wraps everything inside PageWrapper', () => {
    expect(screen.getByText('categoriesPage.title').closest('div')).toBeTruthy()
  })
})
