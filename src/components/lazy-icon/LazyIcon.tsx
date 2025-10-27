import { lazy, Suspense, useMemo } from 'react'
import { CircularProgress, Box, SxProps, Theme } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'
import { IconName } from '~/types'

const icons: Record<IconName, () => Promise<{ default: SvgIconComponent }>> = {
  Language: () => import('@mui/icons-material/Language'),
  Photo: () => import('@mui/icons-material/Photo'),
  HelpOutline: () => import('@mui/icons-material/HelpOutline'),
  Grid3x3: () => import('@mui/icons-material/Grid3x3')
}

interface LazyDynamicIconProps {
  name: string
  size?: number
  color?: string
  sx?: SxProps<Theme>
}

export const LazyDynamicIcon = ({
  name,
  size = 48,
  color,
  sx
}: LazyDynamicIconProps) => {
  const IconComponent = useMemo(() => {
    const loader = icons[name as IconName] ?? icons.HelpOutline
    return lazy(loader)
  }, [name])

  return (
    <Suspense fallback={<CircularProgress size={20} />}>
      <Box
        component={IconComponent}
        sx={{
          fontSize: size,
          color,
          transition: 'all 0.3s ease',
          ...sx
        }}
      />
    </Suspense>
  )
}
