import { FC, useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '~/hooks/use-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

import { StepProvider } from '~/context/step-context'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import InterestsStep from '~/containers/student-home-page/interests-step/InterestsStep'

import {
  getLabelsByRole,
  initialValues
} from '~/components/user-steps-wrapper/constants'
import { UserResponse, UserRole } from '~/types'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'

interface UserStepsWrapperProps {
  userRole: UserRole
  userId: string
}

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole, userId }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const service = useCallback(
    () => userService.getUserById(userId, userRole),
    [userId, userRole]
  )

  const { response } = useAxios<UserResponse | null>({
    service,
    defaultResponse: null,
    fetchOnMount: true
  })

  const childrenArr = [
    <GeneralInfoStep
      isUserFetched={isUserFetched}
      key='1'
      setIsUserFetched={setIsUserFetched}
    />,
    userRole === 'student' ? (
      <InterestsStep key='2' />
    ) : (
      <SubjectsStep key='2' />
    ),
    <LanguageStep key='3' />,
    <AddPhotoStep key='4' />
  ]

  const stepLabels = getLabelsByRole(userRole === 'tutor')

  return (
    <StepProvider
      initialValues={{ ...initialValues, ...response }}
      stepLabels={stepLabels}
    >
      <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
