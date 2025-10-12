import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { NameItem, RequestParams } from '~/types'
import { languages } from '~/constants/mocks/languages'

export interface LanguagesParams extends RequestParams {
  name: string
}

export const languageService = {
  getLanguages: (
    params?: Partial<LanguagesParams>
  ): Promise<AxiosResponse<NameItem[]>> => {
    return axiosClient.get(URLs.cities.get, { params })
  },
  getLanguagesMock: (): Promise<AxiosResponse<NameItem[]>> => {
    return Promise.resolve({
      data: languages
    } as AxiosResponse)
  }
}
