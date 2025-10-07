import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import Logo from '~/containers/logo/Logo'
import HashLink from '~/components/hash-link/HashLink'
import useBreakpoints from '~/hooks/use-breakpoints'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { styles } from '~/containers/layout/footer/user-footer/UserFooter.styles'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '~/hooks/use-redux'
import { UserRoleEnum } from '~/types'
import { blankPageAttr, mediaLinks } from '~/constants/shared'
import AllRightReserved from '~/containers/layout/footer/all-rights-reserved/AllRightsReserved'

const homeRoutesMap = {
  guest: guestRoutes.home.route,
  [UserRoleEnum.Admin]: guestRoutes.admin.route,
  [UserRoleEnum.Student]: guestRoutes.student.route,
  [UserRoleEnum.Tutor]: guestRoutes.tutor.route,
  welcomeHash: '#welcome'
}

const UserFooter = () => {
  const { pathname } = useLocation()
  const { userRole = 'guest' } = useAppSelector((state) => state.appMain)
  const { isMobile } = useBreakpoints()

  const pathNameByRole = homeRoutesMap[userRole as UserRoleEnum]
  const isUserHomeRoute = pathname === pathNameByRole

  const socialLinks = (
    <Box sx={styles.socialLinks}>
      <Link
        href={mediaLinks.facebook}
        sx={styles.socialLink}
        {...blankPageAttr}
      >
        <FacebookIcon />
      </Link>
      <Link
        href={mediaLinks.instagram}
        sx={styles.socialLink}
        {...blankPageAttr}
      >
        <InstagramIcon />
      </Link>
    </Box>
  )

  const logo = (
    <Link
      component={HashLink}
      to={isUserHomeRoute ? homeRoutesMap.welcomeHash : pathNameByRole}
    >
      <Logo light sx={styles.logo} />
    </Link>
  )

  return (
    <Container sx={styles.root}>
      {!isMobile && logo}
      {isMobile && (
        <Box sx={styles.linksWrapper}>
          {logo}
          {socialLinks}
        </Box>
      )}
      {isMobile && <Divider sx={styles.divider} />}
      <AllRightReserved />
      {!isMobile && socialLinks}
    </Container>
  )
}

export default UserFooter
