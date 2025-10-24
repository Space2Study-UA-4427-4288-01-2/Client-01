import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect
} from 'react'

import { useTranslation } from 'react-i18next'
import { firstName, lastName } from '~/utils/validations/general-info-step'

const StepContext = createContext()

const StepProvider = ({ children, initialValues, stepLabels }) => {
  const { t } = useTranslation()
  const [generalData, setGeneralData] = useState({
    data: initialValues,
    errors: {}
  })
  const [subject, setSubject] = useState([])
  const [language, setLanguage] = useState(null)
  const [photo, setPhoto] = useState([])
  const [generalLabel, subjectLabel, languageLabel, photoLabel] = stepLabels

  useEffect(() => {
    const user = initialValues
    if (!user) return

    setGeneralData({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.address?.city,
        country: user.address?.country,
        professionalSummary: user.professionalSummary
      },
      errors: {
        firstName: t(firstName(user.firstName)),
        lastName: t(lastName(user.lastName))
      }
    })
    setLanguage(user.nativeLanguage || 'Ukrainian')
  }, [initialValues, t])

  const stepData = {
    [generalLabel]: generalData,
    [subjectLabel]: subject,
    [languageLabel]: language,
    [photoLabel]: photo
  }

  const handleStepData = useCallback(
    (stepLabel, data, errors) => {
      switch (stepLabel) {
        case generalLabel:
          setGeneralData((prev) => ({
            data: { ...prev.data, ...data },
            errors: { ...prev.errors, ...errors }
          }))
          break
        case subjectLabel:
          setSubject(data)
          break
        case languageLabel:
          setLanguage(data)
          break
        case photoLabel:
          setPhoto(data)
          break
        default:
          return
      }
    },
    [generalLabel, subjectLabel, languageLabel, photoLabel]
  )

  return (
    <StepContext.Provider value={{ stepData, handleStepData }}>
      {children}
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
