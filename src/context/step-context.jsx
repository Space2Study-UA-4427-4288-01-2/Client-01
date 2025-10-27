import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect
} from 'react'

const StepContext = createContext()

const StepProvider = ({ children, initialValues, stepLabels }) => {
  const [generalData, setGeneralData] = useState({
    data: initialValues,
    errors: {}
  })
  const [subject, setSubject] = useState([])
  const [language, setLanguage] = useState(null)
  const [photo, setPhoto] = useState([])
  const [generalLabel, subjectOrInterestsLabel, languageLabel, photoLabel] =
    stepLabels

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
      errors: {}
    })
    setLanguage(user.nativeLanguage || 'Ukrainian')
  }, [initialValues])

  const stepData = {
    [generalLabel]: generalData,
    [subjectOrInterestsLabel]: subject,
    [languageLabel]: language,
    [photoLabel]: photo
  }

  const handleStepData = useCallback(
    (stepLabel, data, errors) => {
      switch (stepLabel) {
        case generalLabel:
          setGeneralData((prev) => ({
            data: { ...prev.data, ...data },
            errors
          }))
          break
        case subjectOrInterestsLabel:
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
    [generalLabel, subjectOrInterestsLabel, languageLabel, photoLabel]
  )

  return (
    <StepContext.Provider value={{ stepData, handleStepData }}>
      {children}
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
