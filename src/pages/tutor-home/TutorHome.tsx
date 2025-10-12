import { useCallback, useEffect } from 'react'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import FindBlock from '~/components/find-block/FindBlock'

import { styles } from '~/pages/tutor-home/TutorHome.styles'
import { translationKey } from '~/components/find-block/find-student-constants'
import { UserRole } from '~/types'
import useConfirm from '~/hooks/use-confirm'
import { t } from 'i18next'

const confirmConfig = {
  message: 'questions.unsavedChanges',
  title: 'titles.confirmTitle',
  confirmButton: t('common.yes'),
  cancelButton: t('common.no'),
  check: true
}

const TutorHome = () => {
  const { openModal, closeModal } = useModalContext()
  const { checkConfirmation } = useConfirm()
  const { isFirstLogin, userRole, userId } = useAppSelector(
    (state) => state.appMain
  )

  const handleCloseWithConfirm = useCallback(async () => {
    const confirmed = checkConfirmation(confirmConfig)
    if (await confirmed) {
      closeModal()
    }
  }, [checkConfirmation, closeModal])

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: (
          <UserStepsWrapper userId={userId} userRole={userRole as UserRole} />
        ),
        paperProps: {
          sx: styles.modal
        },
        onClose: handleCloseWithConfirm
      })
    }
  }, [openModal, isFirstLogin, userRole, userId, handleCloseWithConfirm])

  return (
    <PageWrapper data-testid='tutorHome'>
      <FindBlock translationKey={translationKey} />
    </PageWrapper>
  )
}

export default TutorHome
