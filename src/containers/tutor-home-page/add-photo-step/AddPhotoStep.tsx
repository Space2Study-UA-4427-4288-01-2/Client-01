import { FC, ReactNode, useCallback, useState } from 'react'
import { Box, Typography } from '@mui/material'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import { Emitter, TypographyVariantEnum } from '~/types'
import { useTranslation } from 'react-i18next'
import FileUploader from '~/components/file-uploader/FileUploader'
import { useStepContext } from '~/context/step-context'

interface AddPhotoStepProps {
  btnsBox: ReactNode
}

const validationData = {
  maxFileSize: 10_000_000,
  maxAllFilesSize: 50_000_000,
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

  const handleFiles = useCallback((files: File[]) => {
    if (files?.length) {
      const reader = new FileReader()

      reader.onload = () => {
        const photo = reader?.result as string
        setPreviewUrl(String(photo))
        handleStepData('photo', photo)
      }

      reader.readAsDataURL(files[0])
    } else {
      setPreviewUrl('')
      handleStepData('photo', '')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnDrop = useCallback(
    ({ files }: { files: File[] }) => {
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

  const formHeader = (
    <Typography gutterBottom variant={TypographyVariantEnum.Body1}>
      {t('becomeTutor.categories.title')}
    </Typography>
  )

  const dndContent = previewUrl ? (
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

  return (
    <Box sx={style.root}>
      <Box sx={style.imgContainer}>
        <DragAndDrop
          emitter={handleOnDrop}
          style={style.dnd}
          validationData={validationData}
        >
          {dndContent}
        </DragAndDrop>
      </Box>

      <Box sx={style.rigthBox}>
        <Box>
          {formHeader}
          <FileUploader
            buttonText={t('becomeTutor.photo.button')}
            emitter={onFileUploaded}
            initialError={''}
            initialState={listImages}
            isImages
            sx={style.fileUploader}
            validationData={validationData}
          />
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
