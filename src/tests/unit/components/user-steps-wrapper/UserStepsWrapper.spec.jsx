import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import * as reducerModule from '~/redux/reducer'
import { StepProvider } from '~/context/step-context'

const mockDispatch = vi.fn()
vi.mock('~/hooks/use-redux', () => ({
  useAppDispatch: () => mockDispatch
}))

vi.mock('~/redux/reducer', () => {
  return {
    markFirstLoginComplete: vi.fn()
  }
})

vi.mock('~/components/step-wrapper/StepWrapper', () => ({
  default: vi.fn(({ children }) => (
    <div data-testid='step-wrapper'>{children}</div>
  ))
}))

vi.mock(
  '~/containers/tutor-home-page/general-info-step/GeneralInfoStep',
  () => ({
    default: vi.fn(({ isUserFetched }) => (
      <div data-testid='general-info-step'>
        {isUserFetched ? 'User fetched' : 'Loading...'}
      </div>
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
  let mockedReducer

  beforeEach(() => {
    const dummyReducer = (state = {}) => state
    store = configureStore({ reducer: { dummy: dummyReducer } })

    vi.clearAllMocks()
    mockedReducer = vi.mocked(reducerModule)
  })

  it('renders StepWrapper and GeneralInfoStep', () => {
    render(
      <Provider store={store}>
        <UserStepsWrapper userRole='tutor' />
      </Provider>
    )

    expect(screen.getByTestId('step-wrapper')).toBeInTheDocument()
    expect(screen.getByTestId('general-info-step')).toBeInTheDocument()
  })

  it('renders all steps', () => {
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

  it('dispatches markFirstLoginComplete on mount', () => {
    render(
      <Provider store={store}>
        <UserStepsWrapper userRole='tutor' />
      </Provider>
    )

    expect(mockDispatch).toHaveBeenCalled()
    expect(mockedReducer.markFirstLoginComplete).toBeDefined()
  })

  it('passes correct stepLabels for tutor role', () => {
    render(
      <Provider store={store}>
        <UserStepsWrapper userRole='tutor' />
      </Provider>
    )

    expect(StepProvider).toHaveBeenCalledWith(
      expect.objectContaining({ stepLabels: expect.any(Array) }),
      expect.anything()
    )
  })

  it('passes empty stepLabels for student role', () => {
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
