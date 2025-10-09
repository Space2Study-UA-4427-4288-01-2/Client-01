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
  it('should render correctly snapshot', () => {
    const snapshot = render(
      <AppContentSwitcher
        active
        onChange={handleChange}
        switchOptions={mockOptions}
        typographyVariant='h6'
      />
    )
    expect(snapshot.asFragment()).toMatchSnapshot()
  })

  describe('AppContentSwitcher - rendering with props', () => {
    beforeEach(() => {
      render(
        <AppContentSwitcher
          active
          onChange={handleChange}
          switchOptions={mockOptions}
          typographyVariant='h6'
        />
      )
    })

    it('should render the switch as checked when active=true', () => {
      const switchElem = screen.getByRole('checkbox')
      expect(switchElem).toBeChecked()
    })

    it('should render left option text', () => {
      expect(screen.getByText('Left option')).toBeInTheDocument()
    })

    it('should render right option text', () => {
      expect(screen.getByText('Right option')).toBeInTheDocument()
    })

    it('should apply the correct typography variant to left option', () => {
      const leftTypography = screen.getByText('Left option')
      expect(leftTypography).toHaveClass('MuiTypography-h6')
    })
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

  describe('AppContentSwitcher - tooltips', () => {
    beforeEach(() => {
      render(
        <AppContentSwitcher
          active
          onChange={handleChange}
          switchOptions={mockOptions}
          typographyVariant={TypographyVariantEnum.H6}
        />
      )
    })

    it('should show left option tooltip on hover', async () => {
      const leftOption = screen.getByText('Left option')
      fireEvent.mouseOver(leftOption)

      expect(await screen.findByText('Tooltip left')).toBeInTheDocument()
    })

    it('should show right option tooltip on hover', async () => {
      const rightOption = screen.getByText('Right option')
      fireEvent.mouseOver(rightOption)

      expect(await screen.findByText('Tooltip right')).toBeInTheDocument()
    })
  })
})
