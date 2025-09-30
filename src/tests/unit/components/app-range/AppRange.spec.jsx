import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AppRange from '~/components/app-range/AppRange'

describe('AppRange', () => {
  const min = 0
  const max = 100
  const handleChange = vi.fn()

  beforeEach(() => {
    render(<AppRange max={max} min={min} onChange={handleChange} />)
  })

  it('should renders correctly snapshot', () => {
    const snapshot = render(
      <AppRange max={max} min={min} onChange={handleChange} />
    )
    expect(snapshot.asFragment()).toMatchSnapshot()
  })

  it('should renders correctly', () => {
    const [minInput, maxInput] = screen.getAllByRole('textbox')

    expect(minInput).toHaveValue('0')
    expect(maxInput).toHaveValue('100')
  })

  describe('AppRange - slider interaction', () => {
    it('should update call onChange handler when min slider is changed', async () => {
      const sliders = screen.getAllByRole('slider')

      fireEvent.change(sliders[0], { target: { value: 20 } })

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled()
      })
    })

    it('should update call onChange handler when max slider is changed', async () => {
      const sliders = screen.getAllByRole('slider')

      fireEvent.change(sliders[1], { target: { value: 25 } })

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith([0, 25])
      })
    })
  })

  describe('AppRange - input interaction', () => {
    it('should render two input fields', () => {
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(2)
    })

    it('updates when input values are changed', async () => {
      const inputs = screen.getAllByRole('textbox')

      fireEvent.change(inputs[0], { target: { value: '10' } })

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled()
        expect(inputs[0]).toHaveValue('10')
      })
    })

    it('should call onChange when first input is changed', async () => {
      const inputs = screen.getAllByRole('textbox')
      fireEvent.change(inputs[0], { target: { value: '10' } })

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled()
      })
    })

    it('should call onChange when second input is changed', async () => {
      const inputs = screen.getAllByRole('textbox')
      fireEvent.change(inputs[1], { target: { value: '90' } })

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled()
      })
    })

    it('should pass the correct final range to onChange after both inputs are changed', async () => {
      const inputs = screen.getAllByRole('textbox')
      fireEvent.change(inputs[0], { target: { value: '10' } })
      fireEvent.change(inputs[1], { target: { value: '90' } })

      await waitFor(() => {
        expect(handleChange).toHaveBeenLastCalledWith([10, 90])
      })
    })
  })

  describe('AppRange - invalid and blur input handling', () => {
    const handleChange = vi.fn()

    beforeEach(() => {
      render(<AppRange max={max} min={min} onChange={handleChange} />)
    })

    it('should not call onChange when input is changed with non-numeric value', () => {
      const inputs = screen.getAllByRole('textbox')
      fireEvent.change(inputs[0], { target: { value: 'abc' } })

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('constrains values on blur', () => {
      const inputs = screen.getAllByRole('textbox')

      fireEvent.change(inputs[1], { target: { value: '999' } })
      fireEvent.blur(inputs[1])

      expect(inputs[1]).toHaveValue('100')
    })

    it('should not call onChange when input is cleared', () => {
      const inputs = screen.getAllByRole('textbox')
      fireEvent.change(inputs[0], { target: { value: '' } })

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('should not update or call onChange when input is blurred with the same value', () => {
      const inputs = screen.getAllByRole('textbox')
      const minInput = inputs[0]

      fireEvent.blur(minInput)

      expect(handleChange).not.toHaveBeenCalled()

      expect(minInput).toHaveValue('0')
    })

    it('should update value to max when second input is blurred with value greater than max', async () => {
      const inputs = screen.getAllByRole('textbox')
      const maxInput = inputs[1]

      fireEvent.change(maxInput, { target: { value: '150' } })

      fireEvent.blur(maxInput)

      await waitFor(() => {
        expect(maxInput).toHaveValue('100')
      })
    })
  })
})
