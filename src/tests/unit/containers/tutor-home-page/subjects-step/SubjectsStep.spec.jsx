import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'

const { mockHandleStepData } = vi.hoisted(() => ({
  mockHandleStepData: vi.fn()
}))

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

vi.mock('~/context/step-context', () => ({
  useStepContext: () => ({
    stepData: { subjects: ['English'] },
    handleStepData: mockHandleStepData
  })
}))

vi.mock('~/assets/img/tutor-home-page/become-tutor/study-category.svg', () => ({
  default: 'mocked-category.svg'
}))

let SubjectsStep
beforeAll(async () => {
  const mod = await import(
    '~/containers/tutor-home-page/subjects-step/SubjectsStep'
  )
  SubjectsStep = mod.default
})

describe('SubjectsStep', () => {
  const renderComponent = (props = {}) =>
    render(
      <SubjectsStep
        btnsBox={<div data-testid='btns-box'>Buttons</div>}
        {...props}
      />
    )

  beforeEach(() => {
    vi.clearAllMocks()
    renderComponent()
  })

  it('renders header, image, and main layout', () => {
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'mocked-category.svg')
    expect(screen.getByText('becomeTutor.categories.title')).toBeInTheDocument()
    expect(screen.getByTestId('btns-box')).toBeInTheDocument()
  })

  it('renders SelectSubject component', () => {
    expect(screen.getByTestId('main-subject')).toBeInTheDocument()
    expect(screen.getByTestId('selected-subject')).toBeInTheDocument()
  })

  it('renders correct labels for both SelectSubject fields', () => {
    const mainField = screen.getByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )
    const subjectField = screen.getByLabelText(
      'becomeTutor.categories.subjectLabel'
    )

    expect(mainField).toBeInTheDocument()
    expect(subjectField).toBeInTheDocument()
  })

  it('renders Add button and chips list', () => {
    expect(
      screen.getByText('becomeTutor.categories.btnText')
    ).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
  })

  it('keeps subject dropdown disabled initially', () => {
    const subjectDropdown = screen.getByTestId('selected-subject')
    const input =
      subjectDropdown.querySelector('input') ||
      screen.queryByRole('combobox', { name: /subject/i })

    if (input) {
      expect(input).toBeDisabled()
    } else {
      expect(subjectDropdown).toHaveAttribute('aria-disabled', 'true')
    }
  })
})
