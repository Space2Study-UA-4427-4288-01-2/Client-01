import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { ItemsWithCount, SubjectInterface, SubjectNameInterface } from '~/types'

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
    const query = { ...params, categoryId }
    return axiosClient.get(URLs.subjects.get, { params: query })
  },

  getSubjectsNames: (
    categoryId: string | null
  ): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    return axiosClient.get(URLs.subjects.getNames, { params: { categoryId } })
  },
  getSubjectsNamesMock: (): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    return Promise.resolve({
      data: subjectsMock
    } as AxiosResponse)
  }
}
