import { vi } from 'vitest'
import React from 'react'

const mockAppTextField = vi.fn((props) =>
  React.createElement('input', {
    'data-testid': props['data-testid'],
    value: props.value,
    onChange: (e) => props.onChange && props.onChange(e)
  })
)

vi.mock('~/components/app-text-field/AppTextField', () => ({
  default: mockAppTextField
}))

export { mockAppTextField }
