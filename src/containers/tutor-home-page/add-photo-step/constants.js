import { MB } from '~/constants/shared'

export const validationData = {
  maxFileSize: 10 * MB,
  maxAllFilesSize: 10 * MB,
  filesTypes: ['image/jpeg', 'image/png'],
  fileSizeError: 'becomeTutor.photo.fileSizeError',
  typeError: 'becomeTutor.photo.typeError',
  allFilesSizeError: 'becomeTutor.photo.fileSizeError',
  maxQuantityFiles: 1
}
