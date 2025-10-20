import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { sm: '210px', md: '0px' },
    ...fadeAnimation
  },
  img: {
    width: '100%',
    borderRadius: '20px',
    mt: { xs: '20px', md: '0px' }
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '440px',
    width: '100%',
    flex: 1,
    pb: { xs: '16px', sm: '26px', md: '52px' }
  },
  previewBox: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    p: '12px'
  },
  dnd: {
    root: {
      height: '100%',
      width: '100%'
    },
    uploadBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '440px',
      width: '100%',
      aspectRatio: '1',
      border: '2px dashed',
      borderColor: 'primary.200',
      borderRadius: '20px',
      mt: { xs: '20px', md: '0px' }
    },
    activeDrag: {
      backgroundColor: '#eef7ff'
    }
  },
  rigthBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '432px',
    m: { md: 0, xs: '0 auto' },
    pt: 0,
    pb: { xs: '30px', sm: '0' }
  },
  description: {
    mb: '20px'
  },
  fileUploader: {
    button: {
      textAlign: 'center'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      border: '1px solid',
      borderColor: 'primary.200',
      borderRadius: '5px',
      maxWidth: '270px',
      overflow: 'auto'
    }
  }
}
