import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'

const { mockHandleStepData } = vi.hoisted(() => ({
  mockHandleStepData: vi.fn()
}))

vi.mock('~/services/resource-service', () => ({
  ResourceService: {
    getResourcesCategoriesNames: vi.fn(() =>
      Promise.resolve({ data: [{ _id: '1', name: 'Science' }] })
    )
  }
}))

vi.mock('~/services/subject-service', () => ({
  subjectService: {
    getSubjectsNamesMock: vi.fn(() =>
      Promise.resolve({ data: [{ _id: '2', name: 'Biology' }] })
    )
  }
}))

const mockStepData = {
  generalInfo: {},
  interests: ['Math']
}

vi.mock('~/context/step-context', () => ({
  useStepContext: () => ({
    stepData: mockStepData,
    handleStepData: mockHandleStepData
  })
}))

vi.mock('~/assets/img/student-home-page/interests.svg', () => ({
  default: 'mocked-interests.svg'
}))

vi.mock('~/containers/select-subject/SelectSubject', () => ({
  default: ({ onSubjectChange }) => (
    <div
      data-testid='select-subject'
      onClick={() => onSubjectChange({}, { name: 'Biology' })}
    >
      Mocked SelectSubject
    </div>
  )
}))

let InterestsStep
beforeAll(async () => {
  const mod = await import(
    '~/containers/student-home-page/interests-step/InterestsStep'
  )
  InterestsStep = mod.default
})

describe('InterestsStep', () => {
  const renderComponent = (props = {}) =>
    render(
      <InterestsStep
        btnsBox={<div data-testid='btns-box'>Buttons</div>}
        {...props}
      />
    )

  beforeEach(() => {
    vi.clearAllMocks()
    renderComponent()
  })

  it('renders image, header text, and main layout', () => {
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'mocked-interests.svg')
    expect(screen.getByText(/student\.interests\.title/i)).toBeInTheDocument()
    expect(screen.getByTestId('btns-box')).toBeInTheDocument()
  })

  it('renders SelectSubject and Add button', () => {
    expect(screen.getByTestId('select-subject')).toBeInTheDocument()
    expect(screen.getByText(/student\.interests\.addBtn/i)).toBeInTheDocument()
  })

  it('renders AppChipList with interests', () => {
    expect(screen.getByText('Math')).toBeInTheDocument()
  })

  it('adds new interest when button clicked after selection', () => {
    fireEvent.click(screen.getByTestId('select-subject'))
    fireEvent.click(screen.getByText(/student\.interests\.addBtn/i))

    expect(mockHandleStepData).toHaveBeenCalledWith(
      'interests',
      expect.arrayContaining(['Math', 'Biology'])
    )
  })
})
