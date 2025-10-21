import { useTranslation } from 'react-i18next'

import TitleBlock from '~/components/title-block/TitleBlock'
import icon from '~/assets/img/find-offer/subject_icon.png'
import AppButton from '~/components/app-button/AppButton'
import useBreakpoints from '~/hooks/use-breakpoints'
import { translationKey } from '~/containers/find-offer/constants'
import { useAppSelector } from '~/hooks/use-redux'
import { UserRoleEnum } from '~/types'
import { useModalContext } from '~/context/modal-context'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { openModal } = useModalContext()
  const { userRole } = useAppSelector((state) => state.appMain)

  const handleOpenModal = () => {
    // placeholder for future logic
    openModal({ component: <>Placeholder</> })
  }

  return (
    <TitleBlock img={icon} translationKey={translationKey}>
      <AppButton
        fullWidth={isMobile}
        onClick={handleOpenModal}
        sx={{ py: '14px' }}
      >
        {t(
          `${translationKey}.button.${userRole === UserRoleEnum.Tutor ? UserRoleEnum.Tutor : UserRoleEnum.Student}`
        )}
      </AppButton>
    </TitleBlock>
  )
}

export default OfferRequestBlock
