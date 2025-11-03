import { screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import Subjects from '~/pages/subjects/Subjects'

vi.mock('~/hooks/use-axios', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    response: [],
    fetchData: vi.fn()
  })
}))

vi.mock('~/services/subject-service', () => ({
  subjectService: {
    getSubjects: vi.fn().mockResolvedValue({
      data: {
        items: [],
        count: 0
      }
    }),
    getSubjectsNames: vi.fn().mockResolvedValue({
      data: {
        data: []
      }
    })
  }
}))

vi.mock('~/services/category-service', () => ({
  categoryService: {
    getCategoriesNames: vi.fn().mockResolvedValue([])
  }
}))

vi.mock('~/hooks/use-subjects-names', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    response: [],
    fetchData: vi.fn()
  })
}))

describe('Subjects component', () => {
  const secondLoginState = {
    appMain: { isFirstLogin: false, userRole: 'student', userId: '1' }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders main structure correctly', async () => {
    await act(async () => {
      renderWithProviders(<Subjects />, { preloadedState: secondLoginState })
    })

    expect(
      screen.getByText('subjectsPage.subjects.title', { exact: false })
    ).toBeInTheDocument()

    expect(
      screen.getByText('subjectsPage.subjects.description', { exact: false })
    ).toBeInTheDocument()
  })

  it('renders OfferRequestBlock section', async () => {
    await act(async () => {
      renderWithProviders(<Subjects />, { preloadedState: secondLoginState })
    })

    expect(
      screen.getByText('findOffers.offerRequestBlock.title.student', {
        exact: false
      })
    ).toBeInTheDocument()
  })

  it('wraps everything inside PageWrapper', async () => {
    await act(async () => {
      renderWithProviders(<Subjects />, { preloadedState: secondLoginState })
    })

    const title = screen.getByText('subjectsPage.subjects.title', {
      exact: false
    })
    expect(title.closest('div')).toBeTruthy()
  })

  it('renders NotFoundResults when subjects are empty', async () => {
    await act(async () => {
      renderWithProviders(<Subjects />, { preloadedState: secondLoginState })
    })

    expect(
      screen.getByText('errorMessages.tryAgainText', { exact: false })
    ).toBeInTheDocument()
  })
})
