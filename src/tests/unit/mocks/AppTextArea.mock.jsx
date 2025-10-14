import { vi } from 'vitest'
import React from 'react'

const mockAppTextArea = vi.fn((props) =>
  React.createElement('textarea', {
    'data-testid': props['data-testid'],
    value: props.value,
    onChange: (e) => props.onChange && props.onChange(e)
  })
)

vi.mock('~/components/app-text-area/AppTextArea', () => ({
  default: mockAppTextArea
}))

export { mockAppTextArea }
