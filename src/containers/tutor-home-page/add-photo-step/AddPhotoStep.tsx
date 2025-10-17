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

interface AddPhotoStepProps {
  btnsBox: ReactNode
}

const validationData = {
  maxFileSize: 1_000_000,
  maxAllFilesSize: 1_000_000,
  filesTypes: ['image/jpeg', 'image/png'],
  fileSizeError: 'becomeTutor.documents.fileSizeError',
  allFilesSizeError: 'becomeTutor.documents.allFilesSizeError',
  typeError: 'becomeTutor.documents.typeError',
  maxQuantityFiles: 1
}

const AddPhotoStep: FC<AddPhotoStepProps> = ({ btnsBox }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [listImages, setListImages] = useState<File[]>([])
  const { handleStepData } = useStepContext()
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const handleFilesOnLoad = useCallback(
    (photo: string) => {
      setPreviewUrl(photo)
      handleStepData('photo', photo)
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
        setAlert({
          severity: snackbarVariants.error,
          message: 'Failed to load file.'
        })
      }
      reader.readAsDataURL(files[0])
    } else {
      resetPhoto()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnDrop = useCallback(
    ({ files }: Emitter) => {
      handleFiles(files)
    },
    [handleFiles]
  )

  const onFileUploaded = useCallback(
    ({ files }: Emitter) => {
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
      initialError={''}
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
