import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

// Mock dependencies
vi.mock('~/hooks/use-debounce', () => ({
  useDebounce: (fn) => fn
}))

// Import the actual utils to mock specific functions
import * as rangeFilterUtils from '~/utils/range-filter'

vi.mock('~/utils/range-filter', () => ({
  checkNumberIsInRange: vi.fn(),
  createMarks: vi.fn(() => [])
}))

vi.mock('~/assets/img/find-offer/currency_uah.svg', () => ({
  default: 'uah-icon.svg'
}))

const defaultProps = {
  defaultValue: 50,
  title: 'Test Slider',
  max: 100,
  min: 0,
  onChange: vi.fn()
}

describe('SliderWithInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Setup default mock implementations
    vi.mocked(rangeFilterUtils.checkNumberIsInRange).mockImplementation(
      ({ inputValue, min, max }) => {
        // Convert to number first to handle string inputs
        const num =
          typeof inputValue === 'string' ? Number(inputValue) : inputValue

        if (
          inputValue === null ||
          inputValue === undefined ||
          inputValue === '' ||
          isNaN(num)
        )
          return min
        if (num < min) return min
        if (num > max) return max
        return num
      }
    )

    vi.mocked(rangeFilterUtils.createMarks).mockReturnValue([])
  })

  it('should renders correctly', () => {
    render(<SliderWithInput {...defaultProps} />)

    expect(screen.getByText('Test Slider')).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('50')

    expect(screen.getByRole('img')).toHaveAttribute('src', 'uah-icon.svg')
  })

  it('should call onChange when slider is moved', async () => {
    render(<SliderWithInput {...defaultProps} />)

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: 75 } })

    expect(defaultProps.onChange).toHaveBeenCalledWith(75)

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('75')
  })

  it('should update inputValue correctly when input value is empty', async () => {
    render(<SliderWithInput {...defaultProps} />)

    const input = screen.getByRole('textbox')
    await userEvent.clear(input)

    expect(input).toHaveValue('')

    fireEvent.blur(input)

    expect(input).toHaveValue('0')
    expect(defaultProps.onChange).toHaveBeenCalledWith(0)
  })

  it('should not update prices when input is blurred and value in input has not changed', async () => {
    // Reset mock calls count before this test
    defaultProps.onChange.mockClear()

    render(<SliderWithInput {...defaultProps} />)

    const input = screen.getByRole('textbox')

    // Trigger blur without changing value
    fireEvent.blur(input)

    expect(input).toHaveValue('50')

    // onChange should not be called on initial blur without changes
    expect(defaultProps.onChange).not.toHaveBeenCalled()
  })

  it('should update prices when input is blurred and input is greater than max value', async () => {
    render(<SliderWithInput {...defaultProps} />)

    const input = screen.getByRole('textbox')

    await userEvent.clear(input)
    await userEvent.type(input, '150')

    expect(input).toHaveValue('150')

    fireEvent.blur(input)

    expect(input).toHaveValue('100')
    expect(defaultProps.onChange).toHaveBeenCalledWith(100)
  })

  it('should handle input change with valid number', async () => {
    render(<SliderWithInput {...defaultProps} />)

    const input = screen.getByRole('textbox')

    await userEvent.clear(input)
    await userEvent.type(input, '25')

    // Check that onChange was called with the final value
    expect(defaultProps.onChange).toHaveBeenCalledWith(25)

    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuenow', '25')
  })

  it('should constrain value to min when input is below minimum', async () => {
    render(<SliderWithInput {...defaultProps} />)

    const input = screen.getByRole('textbox')

    // Use direct value setting to avoid NaN warnings from partial input
    await userEvent.clear(input)
    fireEvent.change(input, { target: { value: '-10' } })

    fireEvent.blur(input)

    expect(input).toHaveValue('0')
    expect(defaultProps.onChange).toHaveBeenCalledWith(0)
  })

  it('should handle invalid text input correctly', async () => {
    render(<SliderWithInput {...defaultProps} />)

    const input = screen.getByRole('textbox')

    // Use direct value setting instead of typing to avoid NaN warnings
    await userEvent.clear(input)
    fireEvent.change(input, { target: { value: 'abc' } })

    fireEvent.blur(input)

    expect(input).toHaveValue('0')
    expect(defaultProps.onChange).toHaveBeenCalledWith(0)
  })

  it('should handle negative number input and constrain to min', async () => {
    render(<SliderWithInput {...defaultProps} />)

    const input = screen.getByRole('textbox')

    // Clear and set negative value directly
    await userEvent.clear(input)
    fireEvent.change(input, { target: { value: '-5' } })

    // The value should be preserved until blur
    expect(input).toHaveValue('-5')

    // On blur, it should be constrained to min (0)
    fireEvent.blur(input)

    expect(input).toHaveValue('0')
    expect(defaultProps.onChange).toHaveBeenCalledWith(0)
  })

  it('should handle decimal values correctly', async () => {
    render(<SliderWithInput {...defaultProps} />)

    const input = screen.getByRole('textbox')

    // Use fireEvent.change for decimal values to avoid multiple onChange calls
    await userEvent.clear(input)
    fireEvent.change(input, { target: { value: '25.5' } })

    // Check the last call to onChange
    expect(defaultProps.onChange).toHaveBeenLastCalledWith(25.5)

    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuenow', '25.5')
  })

  it('should update slider when input value changes', async () => {
    render(<SliderWithInput {...defaultProps} />)

    const input = screen.getByRole('textbox')
    const slider = screen.getByRole('slider')

    await userEvent.clear(input)
    fireEvent.change(input, { target: { value: '80' } })

    expect(slider).toHaveAttribute('aria-valuenow', '80')
    expect(defaultProps.onChange).toHaveBeenLastCalledWith(80)
  })

  it('should handle decimal input with proper validation', async () => {
    render(<SliderWithInput {...defaultProps} />)

    const input = screen.getByRole('textbox')

    // Clear input and set decimal value
    await userEvent.clear(input)
    fireEvent.change(input, { target: { value: '75.75' } })

    // Check final value
    expect(defaultProps.onChange).toHaveBeenLastCalledWith(75.75)
    expect(input).toHaveValue('75.75')

    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuenow', '75.75')
  })
})
