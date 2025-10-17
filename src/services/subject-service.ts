import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { ItemsWithCount, SubjectInterface, SubjectNameInterface } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

const subjectsMock = [
  {
    name: 'Music',
    _id: '1'
  },
  {
    name: 'History',
    _id: '2'
  },
  {
    name: 'Math',
    _id: '3'
  },
  {
    name: 'Chemistry',
    _id: '4'
  }
]

export const subjectService = {
  getSubjects: (
    params?: Pick<SubjectInterface, 'name'>,
    categoryId?: string
  ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.get}`, { params })
  },
  getSubjectsNames: (
    categoryId: string | null
  ): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.getNames}`)
  },
  getSubjectsNamesMock: (): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    return Promise.resolve({
      data: subjectsMock
    } as AxiosResponse)
  }
}
