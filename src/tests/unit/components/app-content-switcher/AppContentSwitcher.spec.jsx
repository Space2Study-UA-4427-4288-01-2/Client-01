import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

import { TypographyVariantEnum } from '~/types'

const mockOptions = {
  left: { text: 'Left option', tooltip: 'Tooltip left' },
  right: { text: 'Right option', tooltip: 'Tooltip right' }
}
const handleChange = vi.fn()

describe('AppContentSwitcher', () => {
  it('should render with the correct props', () => {
    render(
      <AppContentSwitcher
        active
        onChange={handleChange}
        switchOptions={mockOptions}
        typographyVariant='h6'
      />
    )

    const switchElem = screen.getByRole('checkbox')
    expect(switchElem).toBeChecked()

    expect(screen.getByText('Left option')).toBeInTheDocument()

    expect(screen.getByText('Right option')).toBeInTheDocument()

    const leftTypography = screen.getByText('Left option')
    expect(leftTypography).toHaveClass('MuiTypography-h6')
  })

  it('should render left and right options', () => {
    render(
      <AppContentSwitcher
        active
        onChange={handleChange}
        switchOptions={mockOptions}
        typographyVariant={TypographyVariantEnum.H6}
      />
    )

    expect(screen.getByText('Left option')).toBeInTheDocument()
    expect(screen.getByText('Right option')).toBeInTheDocument()
  })

  it('should call the onChange function when the switch is clicked', () => {
    render(
      <AppContentSwitcher
        active={false}
        onChange={handleChange}
        switchOptions={mockOptions}
        typographyVariant={TypographyVariantEnum.H6}
      />
    )

    const switchElem = screen.getByRole('checkbox')
    fireEvent.click(switchElem)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should apply custom styles from props', () => {
    render(
      <AppContentSwitcher
        active={false}
        onChange={handleChange}
        styles={{ background: 'red' }}
        switchOptions={mockOptions}
        typographyVariant={TypographyVariantEnum.H6}
      />
    )

    const stack = screen.getByTestId('switch').closest('.MuiStack-root')
    expect(stack).toHaveStyle('background: red')
  })

  it('should render tooltips when tooltip props are passed', async () => {
    render(
      <AppContentSwitcher
        active
        onChange={handleChange}
        switchOptions={mockOptions}
        typographyVariant={TypographyVariantEnum.H6}
      />
    )

    const leftOption = screen.getByText('Left option')
    fireEvent.mouseOver(leftOption)

    expect(await screen.findByText('Tooltip left')).toBeInTheDocument()

    const rightOption = screen.getByText('Right option')
    fireEvent.mouseOver(rightOption)

    expect(await screen.findByText('Tooltip right')).toBeInTheDocument()
  })
})
