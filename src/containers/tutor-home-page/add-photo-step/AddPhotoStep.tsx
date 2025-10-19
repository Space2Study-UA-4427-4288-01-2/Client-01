import { FC, ReactNode, useCallback, useState } from 'react'
import { Box, Typography } from '@mui/material'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import { Emitter, TypographyVariantEnum } from '~/types'
import { useTranslation } from 'react-i18next'
import FileUploader from '~/components/file-uploader/FileUploader'
import { useStepContext } from '~/context/step-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { snackbarVariants } from '~/constants'
import { validationData } from './constants'

interface AddPhotoStepProps {
  btnsBox: ReactNode
}

const AddPhotoStep: FC<AddPhotoStepProps> = ({ btnsBox }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string>('')
  const [listImages, setListImages] = useState<File[]>([])
  const { handleStepData } = useStepContext()
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const showErrorNotification = useCallback(() => {
    setAlert({
      severity: snackbarVariants.error,
      message: 'Failed to load file.'
    })
  }, [setAlert])

  const handleFilesOnLoad = useCallback(
    (photo: string) => {
      setPreviewUrl(photo)
      handleStepData('photo', photo)
      setUploadError('')
    },
    [handleStepData]
  )

  const resetPhoto = useCallback(() => {
    setPreviewUrl(null)
    handleStepData('photo', '')
  }, [handleStepData])

  const handleFiles = useCallback((files: File[]) => {
    if (files?.length) {
      const reader = new FileReader()

      reader.onload = () => {
        handleFilesOnLoad(reader?.result as string)
      }

      reader.onerror = () => {
        resetPhoto()
        showErrorNotification()
      }
      reader.readAsDataURL(files[0])
    } else {
      resetPhoto()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnDrop = useCallback(
    ({ files, error }: Emitter) => {
      if (error) {
        showErrorNotification()
        return
      }
      handleFiles(files)
    },
    [handleFiles, showErrorNotification]
  )

  const onFileUploaded = useCallback(
    ({ files, error }: Emitter) => {
      if (error) {
        setUploadError(error)
        return
      }
      setListImages(() => [...files])
      handleFiles(files)
    },
    [handleFiles]
  )

  // jsx elements
  const formHeader = (
    <Typography gutterBottom variant={TypographyVariantEnum.Body1}>
      {t('becomeTutor.photo.description')}
    </Typography>
  )

  const dndPlaceholderContent = previewUrl ? (
    <Box
      alt='Photo preview'
      component='img'
      src={previewUrl}
      sx={style.previewBox}
    />
  ) : (
    <Typography gutterBottom variant={TypographyVariantEnum.Body1}>
      {t('becomeTutor.photo.placeholder')}
    </Typography>
  )

  const dndPhoto = (
    <DragAndDrop
      emitter={handleOnDrop}
      style={style.dnd}
      validationData={validationData}
    >
      {dndPlaceholderContent}
    </DragAndDrop>
  )

  const fileUploaderControl = (
    <FileUploader
      buttonText={t('becomeTutor.photo.button')}
      emitter={onFileUploaded}
      initialError={uploadError}
      initialState={listImages}
      isImages
      sx={style.fileUploader}
      validationData={validationData}
    />
  )

  return (
    <Box sx={style.root}>
      <Box sx={style.imgContainer}>{dndPhoto}</Box>

      <Box sx={style.rigthBox}>
        <Box>
          {formHeader}
          {fileUploaderControl}
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
