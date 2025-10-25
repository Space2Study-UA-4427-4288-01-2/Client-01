import { Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { useTranslation } from 'react-i18next'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import DirectionLink from '~/components/direction-link/DirectionLink'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import { styles } from '~/pages/categories/Categories.styles'
import {
  CategoryInterface,
  CategoryNameInterface,
  SizeEnum,
  UserRoleEnum
} from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import useCategoriesNames from '~/hooks/use-categories-names'
import { useCallback, useMemo, useState } from 'react'
import { mapArrayByField } from '~/utils/map-array-by-field'
import useLoadMore from '~/hooks/use-load-more'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import useBreakpoints from '~/hooks/use-breakpoints'
import { itemsLoadLimit } from '~/constants'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import CardsList from '~/components/cards-list/CardsList'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import { useAppSelector } from '~/hooks/use-redux'
import { categoryService } from '~/services/category-service'

const CATEGORY_NAME = { name: 'categories' }

const Categories = () => {
  const { t } = useTranslation()
  const [match, setMatch] = useState<string>('')
  const params = useMemo(() => ({ name: match }), [match])
  const breakpoints = useBreakpoints()
  const { userRole } = useAppSelector((state) => state.appMain)

  const transform = useCallback(
    (data: CategoryNameInterface[]): string[] => mapArrayByField(data, 'name'),
    []
  )
  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getCategories = useCallback(
    (data?: Pick<CategoryInterface, 'name'>) => {
      return categoryService.getCategoriesMock(data)
    },
    []
  )

  const {
    data: categories,
    loading: categoriesLoading,
    resetData,
    loadMore
  } = useLoadMore<CategoryInterface, Pick<CategoryInterface, 'name'>>({
    service: getCategories,
    limit: cardsLimit,
    params
  })

  const {
    loading: categoriesNamesLoading,
    response: categoriesNamesItems,
    fetchData
  } = useCategoriesNames({ fetchOnMount: false })

  const cards = useMemo(() => {
    const uniqueCategories = Array.from(
      new Map(categories.map((item) => [item.name, item])).values()
    )

    return uniqueCategories.map((item) => {
      const offerCount =
        item?.totalOffers?.[
          userRole as UserRoleEnum.Student | UserRoleEnum.Tutor
        ] ?? 0

      return (
        <CardWithLink
          description={`${offerCount} ${t('categoriesPage.offers')}`}
          img={serviceIcon}
          key={item._id}
          link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
          title={item.name}
        />
      )
    })
  }, [categories, t, userRole])

  return (
    <PageWrapper>
      <OfferRequestBlock data-testid='offer-request-block' />
      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.findOffers.path}
          title={t('categoriesPage.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoriesNamesLoading}
          onFocus={() => fetchData()}
          onSearchChange={resetData}
          options={transform(categoriesNamesItems ?? [])}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>

      {!categories.length && !categoriesLoading ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', CATEGORY_NAME)}
          description={t('errorMessages.tryAgainText', CATEGORY_NAME)}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable
          loading={categoriesLoading}
          onClick={loadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Categories
