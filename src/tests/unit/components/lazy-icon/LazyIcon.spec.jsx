import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import { LazyIcon } from '~/components/lazy-icon/LazyIcon'

const renderWithTheme = (ui) => {
  const theme = createTheme()
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('LazyIcon component', () => {
  it('shows CircularProgress while loading', () => {
    renderWithTheme(<LazyIcon name='Language' />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders icon after lazy loading (the element with test-id is the SVG)', async () => {
    renderWithTheme(<LazyIcon name='Language' />)

    const svgEl = await screen.findByTestId('icon-box')

    expect(svgEl).toBeInTheDocument()
    expect(svgEl.tagName.toLowerCase()).toBe('svg')
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('applies size and color via sx', async () => {
    renderWithTheme(<LazyIcon color='#000' name='Language' size={36} />)

    const svgEl = await screen.findByTestId('icon-box')
    const styles = getComputedStyle(svgEl)

    expect(styles.fontSize).toBe('36px')
    expect(styles.color).toBe('rgb(0, 0, 0)')
  })
})
