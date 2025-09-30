import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AppRange from '~/components/app-range/AppRange'

describe('AppRange', () => {
  const min = 13
  const max = 78
  const handleChange = vi.fn()

  it('should renders correctly snapshot', () => {
    const snapshot = render(
      <AppRange max={max} min={min} onChange={handleChange} />
    )
    expect(snapshot.asFragment()).toMatchSnapshot()
  })

  it('should renders correctly', () => {
    render(<AppRange max={max} min={min} onChange={handleChange} />)

    const [minInput, maxInput] = screen.getAllByRole('textbox')

    expect(minInput).toHaveValue('13')
    expect(maxInput).toHaveValue('78')
  })

  describe('AppRange - slider interaction', () => {
    it('should update call onChange handler when slider is changed', async () => {
      render(<AppRange max={100} min={0} onChange={handleChange} />)

      const sliders = screen.getAllByRole('slider')

      fireEvent.change(sliders[0], { target: { value: 20 } })

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled()
      })
    })

    it('should update call onChange handler when slider is changed', async () => {
      render(<AppRange max={100} min={0} onChange={handleChange} />)

      const sliders = screen.getAllByRole('slider')

      fireEvent.change(sliders[1], { target: { value: 25 } })

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith([0, 25])
      })
    })
  })

  it('updates when input values are changed', async () => {
    render(<AppRange max={max} min={min} onChange={handleChange} />)

    const inputs = screen.getAllByRole('textbox')

    fireEvent.change(inputs[0], { target: { value: '10' } })

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled()
      expect(inputs[0]).toHaveValue('10')
    })
  })

  it('constrains values on blur', () => {
    render(<AppRange max={max} min={min} onChange={handleChange} />)

    const inputs = screen.getAllByRole('textbox')

    fireEvent.change(inputs[1], { target: { value: '999' } })
    fireEvent.blur(inputs[1])

    expect(inputs[1]).toHaveValue(String(max))
  })

  describe('AppRange - input interaction', () => {
    beforeEach(() => {
      render(<AppRange max={100} min={0} onChange={handleChange} />)
    })

    it('should render two input fields', () => {
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(2)
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

  describe('AppRange - invalid input handling', () => {
    const handleChange = vi.fn()
    it('should not call onChange when input is changed with non-numeric value', () => {
      render(<AppRange max={100} min={0} onChange={handleChange} />)

      const inputs = screen.getAllByRole('textbox')
      fireEvent.change(inputs[0], { target: { value: 'abc' } })

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('should not call onChange when input is cleared', () => {
      render(<AppRange max={100} min={0} onChange={handleChange} />)

      const inputs = screen.getAllByRole('textbox')
      fireEvent.change(inputs[0], { target: { value: '' } })

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  it('should call onChange with min number if first input is empty on blur', async () => {
    const handleChange = vi.fn()
    render(<AppRange max={100} min={0} onChange={handleChange} />)

    const inputs = screen.getAllByRole('textbox')
    const minInput = inputs[0]

    fireEvent.change(minInput, { target: { value: '' } })

    fireEvent.blur(minInput)

    await waitFor(() => {
      expect(handleChange).toHaveBeenLastCalledWith([0, 100])
    })
  })

  it('should update value to max when second input is blurred with value greater than max', async () => {
    const handleChange = vi.fn()
    render(<AppRange max={100} min={0} onChange={handleChange} />)

    const inputs = screen.getAllByRole('textbox')
    const maxInput = inputs[1]

    fireEvent.change(maxInput, { target: { value: '150' } })

    fireEvent.blur(maxInput)

    await waitFor(() => {
      expect(maxInput).toHaveValue('100')
    })
  })

  it('should not update or call onChange when input is blurred with the same value', () => {
    const handleChange = vi.fn()
    render(<AppRange max={100} min={0} onChange={handleChange} />)

    const inputs = screen.getAllByRole('textbox')
    const minInput = inputs[0]

    fireEvent.blur(minInput)

    expect(handleChange).not.toHaveBeenCalled()

    expect(minInput).toHaveValue('0')
  })
})
