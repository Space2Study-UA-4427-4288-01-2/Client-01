import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { StepProvider } from '~/context/step-context'

const mockDispatch = vi.fn()
const mockMarkFirstLoginComplete = vi.fn()

vi.mock('~/hooks/use-redux', () => ({
  useAppDispatch: () => mockDispatch
}))

vi.mock('~/redux/reducer', () => ({
  markFirstLoginComplete: vi.fn()
}))

vi.mock('~/components/step-wrapper/StepWrapper', () => ({
  default: vi.fn(({ children }) => (
    <div data-testid='step-wrapper'>{children}</div>
  ))
}))

vi.mock(
  '~/containers/tutor-home-page/general-info-step/GeneralInfoStep',
  () => ({
    default: vi.fn(() => (
      <div data-testid='general-info-step'>General Info Step</div>
    ))
  })
)

vi.mock('~/containers/tutor-home-page/subjects-step/SubjectsStep', () => ({
  default: vi.fn(() => <div data-testid='subjects-step'>Subjects Step</div>)
}))

vi.mock('~/containers/tutor-home-page/language-step/LanguageStep', () => ({
  default: vi.fn(() => <div data-testid='language-step'>Language Step</div>)
}))

vi.mock('~/containers/tutor-home-page/add-photo-step/AddPhotoStep', () => ({
  default: vi.fn(() => <div data-testid='add-photo-step'>Add Photo Step</div>)
}))

vi.mock('~/context/step-context', () => ({
  StepProvider: vi.fn(({ children }) => (
    <div data-testid='step-provider'>{children}</div>
  ))
}))

describe('UserStepsWrapper', () => {
  let store

  beforeEach(() => {
    const dummyReducer = (state = {}) => state
    store = configureStore({ reducer: { dummy: dummyReducer } })
    vi.clearAllMocks()
  })

  it('should render StepWrapper and GeneralInfoStep', () => {
    render(
      <Provider store={store}>
        <UserStepsWrapper userRole='tutor' />
      </Provider>
    )

    expect(screen.getByTestId('step-wrapper')).toBeInTheDocument()
    expect(screen.getByTestId('general-info-step')).toBeInTheDocument()
  })

  it('should render all steps', () => {
    render(
      <Provider store={store}>
        <UserStepsWrapper userRole='tutor' />
      </Provider>
    )

    expect(screen.getByTestId('general-info-step')).toBeInTheDocument()
    expect(screen.getByTestId('subjects-step')).toBeInTheDocument()
    expect(screen.getByTestId('language-step')).toBeInTheDocument()
    expect(screen.getByTestId('add-photo-step')).toBeInTheDocument()
  })

  it('should dispatch markFirstLoginComplete on mount', () => {
    render(
      <Provider store={store}>
        <UserStepsWrapper userRole='tutor' />
      </Provider>
    )

    expect(mockDispatch).toHaveBeenCalledWith(mockMarkFirstLoginComplete())
  })

  it('should pass correct stepLabels for tutor role', () => {
    const tutorStepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4']

    vi.mock('~/components/user-steps-wrapper/constants', () => ({
      tutorStepLabels,
      initialValues: {},
      student: 'student'
    }))

    render(
      <Provider store={store}>
        <UserStepsWrapper userRole='tutor' />
      </Provider>
    )

    expect(StepProvider).toHaveBeenCalledWith(
      expect.objectContaining({ stepLabels: tutorStepLabels }),
      expect.anything()
    )
  })

  it('should pass empty stepLabels for student role', () => {
    vi.mock('~/components/user-steps-wrapper/constants', () => ({
      tutorStepLabels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
      initialValues: {},
      student: 'student'
    }))

    render(
      <Provider store={store}>
        <UserStepsWrapper userRole='student' />
      </Provider>
    )

    expect(StepProvider).toHaveBeenCalledWith(
      expect.objectContaining({ stepLabels: '' }),
      expect.anything()
    )
  })
})
