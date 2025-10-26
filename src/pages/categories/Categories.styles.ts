export const styles = {
  navigation: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  searchToolbar: {
    borderRadius: '70px'
  },
  titleWithDescription: {
    wrapper: {
      my: '30px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.500'
    }
  },
  icon: {
    box: {
      maxWidth: '62px',
      maxHeight: '62px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '5px',
      mr: '20px'
    },
    svg: { width: '100%', height: '100%' }
  }
}
