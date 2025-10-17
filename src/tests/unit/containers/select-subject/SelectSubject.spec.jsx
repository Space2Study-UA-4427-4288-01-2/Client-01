import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import SelectSubject from '~/containers/select-subject/SelectSubject'

vi.mock('~/services/resource-service', () => ({
  ResourceService: {
    getResourcesCategoriesNames: vi.fn(() =>
      Promise.resolve({ data: [{ _id: '1', name: 'Math' }] })
    )
  }
}))

vi.mock('~/services/subject-service', () => ({
  subjectService: {
    getSubjectsNamesMock: vi.fn(() =>
      Promise.resolve({ data: [{ _id: '2', name: 'Physics' }] })
    )
  }
}))

import { ResourceService } from '~/services/resource-service'
import { subjectService } from '~/services/subject-service'

describe('SelectSubject', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    render(<SelectSubject onChange={vi.fn()} subject={null} />)
  })

  it('renders both AsyncAutocomplete dropdowns', () => {
    expect(screen.getByTestId('main-subject')).toBeInTheDocument()
    expect(screen.getByTestId('selected-subject')).toBeInTheDocument()
  })

  it('disables subject dropdown initially', () => {
    const subjectDropdown = screen.getByTestId('selected-subject')
    const input = subjectDropdown.querySelector('input')

    expect(input).toBeDisabled()
  })

  it('renders without crashing when services reject', async () => {
    ResourceService.getResourcesCategoriesNames.mockRejectedValueOnce(
      new Error('fail')
    )
    subjectService.getSubjectsNamesMock.mockRejectedValueOnce(new Error('fail'))

    expect(screen.getByTestId('main-subject')).toBeInTheDocument()
    expect(screen.getByTestId('selected-subject')).toBeInTheDocument()
  })

  it('passes correct labels to both fields', () => {
    expect(
      screen.getByLabelText('becomeTutor.categories.mainSubjectsLabel')
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText('becomeTutor.categories.subjectLabel')
    ).toBeInTheDocument()
  })
})
