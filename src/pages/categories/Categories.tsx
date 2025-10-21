import { useTranslation } from 'react-i18next'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <OfferRequestBlock data-testid='offer-request-block' />
      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />
    </PageWrapper>
  )
}

export default Categories
