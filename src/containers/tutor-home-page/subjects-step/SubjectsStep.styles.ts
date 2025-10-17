import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    flexShrink: 0,
    maxWidth: '432px',
    aspectRatio: { xs: '4/3', sm: 'auto' },
    pb: { xs: '16px', sm: '52px' }
  },
  rightBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0,
    ml: { md: '40px', xs: '20px' }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }
}
