import { lazy, Suspense } from 'react'
import { CircularProgress, Box, SxProps, Theme } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'

type IconName = 'Language' | 'Photo' | 'HelpOutline' | 'Grid3x3'

const icons: Record<
  IconName | string,
  () => Promise<{ default: SvgIconComponent }>
> = {
  Language: () => import('@mui/icons-material/Language'),
  Photo: () => import('@mui/icons-material/Photo'),
  HelpOutline: () => import('@mui/icons-material/HelpOutline'),
  Grid3x3: () => import('@mui/icons-material/Grid3x3')
}

interface LazyDynamicIconProps {
  name: IconName | string
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
  const loader = icons[name ?? 'HelpOutline']
  const IconComponent = lazy(loader)

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
