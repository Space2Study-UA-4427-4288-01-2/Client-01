export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    minWidth: '400px',
    p: { xs: '28px', sm: '40px 0', md: '40px' },
    height: '80vh'
  },
  subHeader: {
    typography: 'body2',
    color: 'primary.400',
    mt: '12px',
    mb: '12px'
  },
  header: {
    display: 'flex',
    gap: '12px',
    title: {
      typography: 'h5',
      color: 'primary.500',
      textAlign: 'left',
      mb: '6px'
    },
    desc: {
      typography: 'body2',
      color: 'primary.400',
      mb: '32px'
    }
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    overflow: 'auto'
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    typography: 'h6',
    color: 'primary.500',
    textAlign: 'left',
    header: { display: 'flex', alignItems: 'center', gap: '12px' },
    title: {
      typography: 'h6',
      color: 'primary.500'
    },
    sub: {
      p: '0 20px'
    }
  },
  button: {
    mt: '20px',
    width: { xs: '100%', sm: 'fit-content' },
    minWidth: '280px'
  }
}
