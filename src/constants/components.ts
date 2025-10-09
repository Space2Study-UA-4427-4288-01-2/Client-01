import { NameItem } from '~/types'

export const ctrlRenderingSettings: { [key: string]: keyof NameItem } = {
  labelField: 'name',
  valueField: '_id'
}
