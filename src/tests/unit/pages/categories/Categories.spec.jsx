import { screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Categories from '~/pages/categories/Categories'
import { renderWithProviders } from '~tests/test-utils'

describe('Categories component', () => {
  const secondLoginState = {
    appMain: { isFirstLogin: false, userRole: 'tutor', userId: '1' }
  }
  beforeEach(async () => {
    vi.clearAllMocks()
  })

  it('renders main structure correctly', async () => {
    await act(async () => {
      renderWithProviders(<Categories />, { preloadedState: secondLoginState })
    })
    expect(screen.getByText('categoriesPage.title')).toBeInTheDocument()
    expect(screen.getByText('categoriesPage.description')).toBeInTheDocument()
  })

  it('renders OfferRequestBlock section for tutor', async () => {
    await act(async () => {
      renderWithProviders(<Categories />, { preloadedState: secondLoginState })
    })
    expect(
      screen.getByText('findOffers.offerRequestBlock.title.tutor')
    ).toBeInTheDocument()
  })

  it('wraps everything inside PageWrapper', async () => {
    await act(async () => {
      renderWithProviders(<Categories />, { preloadedState: secondLoginState })
    })

    expect(screen.getByText('categoriesPage.title').closest('div')).toBeTruthy()
  })
})
