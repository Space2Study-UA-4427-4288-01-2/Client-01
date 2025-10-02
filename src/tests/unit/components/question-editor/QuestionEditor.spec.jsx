import { render, screen, fireEvent } from '@testing-library/react'
import QuestionEditor from '~/components/question-editor/QuestionEditor'

const mockOpenMenu = vi.fn()
const mockCloseMenu = vi.fn()
const mockRenderMenu = (el) => el
const onEdit = vi.fn()

vi.mock('~/hooks/use-menu', () => ({
  default: () => ({
    openMenu: mockOpenMenu,
    closeMenu: mockCloseMenu,
    renderMenu: mockRenderMenu
  })
}))

describe('Question Editor', () => {
  let component
  const data = {
    type: 'multipleChoice',
    title: 'React Questions',
    text: 'What is React',
    answers: [],
    openAnswer: '',
    category: null
  }
  const handleInputChange = vi.fn(() => vi.fn())
  const handleNonInputValueChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    component = render(
      <QuestionEditor
        data={data}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
        isQuizQuestion
        onEdit={onEdit}
      />
    )
  })

  it('should renders correctly snapshot', () => {
    expect(component?.asFragment()).toMatchSnapshot()
  })

  it('should render question input field with initial text', () => {
    const input = screen.getByLabelText('questionPage.question')
    expect(input).toHaveValue('What is React')
  })

  describe('QuestionEditor - open answer', () => {
    const openAnswerData = {
      type: 'openAnswer',
      text: 'How world works?',
      answers: [],
      openAnswer: 'Just have a fun'
    }

    beforeEach(() => {
      vi.clearAllMocks()

      component.rerender(
        <QuestionEditor
          data={openAnswerData}
          handleInputChange={handleInputChange}
          handleNonInputValueChange={handleNonInputValueChange}
        />
      )
    })

    it('should render an open answer input field', () => {
      const input = screen.getByRole('textbox', { name: 'questionPage.answer' })
      expect(input).toHaveValue('Just have a fun')
    })

    it('should call input handler on answer change', () => {
      const input = screen.getByRole('textbox', { name: 'questionPage.answer' })

      fireEvent.change(input, {
        target: { value: 'Answer' }
      })
      expect(handleInputChange).toHaveBeenCalledWith('openAnswer')
    })
  })

  describe('QuestionEditor - change type', () => {
    it('should change question type when selecting new option', () => {
      const select = screen.getByRole('combobox')

      fireEvent.mouseDown(select)

      const option = screen.getByRole('option', {
        name: 'questionPage.questionType.openAnswer'
      })
      fireEvent.click(option)

      expect(handleNonInputValueChange).toHaveBeenCalledWith(
        'type',
        'openAnswer'
      )
    })
  })

  describe('QuestionEditor - input changes', () => {
    it('should change question and answer input fields', () => {
      const questionInput = screen.getByDisplayValue('What is React')

      fireEvent.change(questionInput, {
        target: { value: 'Updated question' }
      })
      expect(handleInputChange).toHaveBeenCalledWith('text')
    })
  })

  describe('QuestionEditor - edit title and category', () => {
    let moreButton
    let menuItem

    beforeEach(() => {
      const icon = screen.getByTestId('MoreVertIcon')
      moreButton = icon.closest('button')

      fireEvent.click(moreButton)
      menuItem = screen.getByRole('menuitem', {
        name: 'myResourcesPage.questions.titleWithCategory'
      })
    })

    it('should call openMenu when clicking the More button', () => {
      fireEvent.click(moreButton)
      expect(mockOpenMenu).toHaveBeenCalled()
    })

    it('should call closeMenu and onEdit when clicking the menu item', () => {
      fireEvent.click(menuItem)
      expect(mockCloseMenu).toHaveBeenCalled()
      expect(onEdit).toHaveBeenCalled()
    })
  })
})
