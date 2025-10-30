import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen, fireEvent, waitFor } from '@testing-library/react'

const { mockHandleStepData, mockFileUploader, mockDragAndDrop } = vi.hoisted(
  () => ({
    mockHandleStepData: vi.fn(),
    mockFileUploader: vi.fn(),
    mockDragAndDrop: vi.fn()
  })
)

vi.mock('~/context/step-context', () => ({
  useStepContext: () => ({ handleStepData: mockHandleStepData })
}))

vi.mock('~/components/drag-and-drop/DragAndDrop', () => ({
  default: (props) => {
    mockDragAndDrop(props)
    const { emitter, children } = props
    return (
      <div>
        <div data-testid='drag-and-drop'>{children}</div>
        <button
          data-testid='emit-drop'
          onClick={() => emitter({ files: globalThis.__testFiles || [] })}
        >
          emit-drop
        </button>
      </div>
    )
  }
}))

vi.mock('~/components/file-uploader/FileUploader', () => ({
  default: (props) => {
    mockFileUploader(props)
    const { emitter } = props
    return (
      <button
        data-testid='emit-upload'
        onClick={() => emitter({ files: globalThis.__testFiles || [] })}
      >
        emit-upload
      </button>
    )
  }
}))

import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'

class MockFileReader {
  constructor() {
    this.result = null
    this.onload = null
  }
  readAsDataURL() {
    this.result = 'data:image/png;base64,TEST'
    Promise.resolve().then(() => this.onload && this.onload({}))
  }
}

beforeAll(() => {
  globalThis.FileReader = MockFileReader
})

beforeEach(() => {
  mockHandleStepData.mockClear()
  mockFileUploader.mockClear()
  mockDragAndDrop.mockClear()
  globalThis.__testFiles = []
  render(<AddPhotoStep btnsBox={<div data-testid='btns'>Btns</div>} />)
})

describe('AddPhotoStep', () => {
  it('renders placeholder when there is no preview', () => {
    expect(
      screen.getByText('becomeTutor.photo.description')
    ).toBeInTheDocument()
    expect(
      screen.getByText('becomeTutor.photo.placeholder')
    ).toBeInTheDocument()
  })

  it('sets preview and calls handleStepData when a file is dropped', async () => {
    globalThis.__testFiles = [new File(['x'], 'a.png', { type: 'image/png' })]
    fireEvent.click(screen.getByTestId('emit-drop'))

    const img = await screen.findByAltText('Photo preview')
    expect(img).toHaveAttribute('src', 'data:image/png;base64,TEST')
    expect(mockHandleStepData).toHaveBeenCalledWith(
      'photo',
      'data:image/png;base64,TEST'
    )
  })

  it('resets preview and calls handleStepData with empty string when empty drop occurs', async () => {
    globalThis.__testFiles = [new File(['x'], 'a.png', { type: 'image/png' })]
    fireEvent.click(screen.getByTestId('emit-drop'))
    await screen.findByAltText('Photo preview')

    globalThis.__testFiles = []
    fireEvent.click(screen.getByTestId('emit-drop'))

    expect(
      await screen.findByText('becomeTutor.photo.placeholder')
    ).toBeInTheDocument()
  })

  it('uploads via FileUploader emitter, updates initialState, and sets preview', async () => {
    globalThis.__testFiles = [
      new File(['x'], 'photo.jpg', { type: 'image/jpeg' })
    ]
    fireEvent.click(screen.getByTestId('emit-upload'))

    await waitFor(() =>
      expect(mockHandleStepData).toHaveBeenCalledWith(
        'photo',
        'data:image/png;base64,TEST'
      )
    )
  })

  it('passes children into DragAndDrop (placeholder or preview)', () => {
    expect(screen.getByTestId('drag-and-drop')).toBeInTheDocument()
    expect(
      screen.getByText('becomeTutor.photo.placeholder')
    ).toBeInTheDocument()

    const lastProps = mockDragAndDrop.mock.calls.at(-1)?.[0]
    expect(lastProps).toHaveProperty('validationData')
  })
})
