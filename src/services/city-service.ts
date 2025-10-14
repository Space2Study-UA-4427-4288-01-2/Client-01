import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { NameItem, RequestParams } from '~/types'
import { cities } from '~/constants/mocks/cities'

export interface CitiesParams extends RequestParams {
  name: string
}

export const cityService = {
  getCities: (
    params?: Partial<CitiesParams>
  ): Promise<AxiosResponse<NameItem[]>> => {
    return axiosClient.get(URLs.cities.get, { params })
  },
  getCitiesMock: (): Promise<AxiosResponse<NameItem[]>> => {
    return Promise.resolve({
      data: cities
    } as AxiosResponse)
  }
}
