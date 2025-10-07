import { FormEventHandler, ChangeEventHandler, FocusEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'

import { useModalContext } from '~/context/modal-context'
import useInputVisibility from '~/hooks/use-input-visibility'
import ForgotPassword from '~/containers/guest-home-page/forgot-password/ForgotPassword'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/guest-home-page/login-form/LoginForm.styles'
import { useAppSelector } from '~/hooks/use-redux'

interface LoginFormData {
  email: string
  password: string
}

interface LoginFormErrors {
  email?: string
  password?: string
}

interface LoginFormProps {
  handleSubmit: FormEventHandler<HTMLFormElement>
  handleChange: (
    field: keyof LoginFormData
  ) => ChangeEventHandler<HTMLInputElement>
  handleBlur: (
    field: keyof LoginFormData
  ) => FocusEventHandler<HTMLInputElement>
  data: LoginFormData
  errors: LoginFormErrors
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { t } = useTranslation()
  const { authLoading } = useAppSelector((state) => state.appMain)

  const { openModal } = useModalContext()

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)

  const { password, email } = data

  const openForgotPassword = () => {
    openModal({ component: <ForgotPassword /> })
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <AppTextField
        autoFocus
        data-testid='email'
        errorMsg={t(String(errors.email || ''))}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        size='medium'
        sx={{ mb: '5px' }}
        type='email'
        value={email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(String(errors.password || ''))}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        type={showPassword ? 'text' : 'password'}
        value={password}
      />

      <Typography
        component={ButtonBase}
        onClick={openForgotPassword}
        sx={styles.forgotPass}
        variant='subtitle2'
      >
        {t('login.forgotPassword')}
      </Typography>

      <AppButton
        disabled={!password || !email}
        loading={authLoading}
        sx={styles.loginButton}
        type='submit'
      >
        {t('common.labels.login')}
      </AppButton>
    </Box>
  )
}

export default LoginForm
