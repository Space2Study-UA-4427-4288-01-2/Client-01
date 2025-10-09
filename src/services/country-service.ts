import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { NameItem, RequestParams } from '~/types'
import { countries } from '~/constants/mocks/countries'

export interface CountriesParams extends RequestParams {
  name: string
}

export const countryService = {
  getCoutries: (
    params?: Partial<CountriesParams>
  ): Promise<AxiosResponse<NameItem[]>> => {
    return axiosClient.get(URLs.countries.get, { params })
  },
  getCoutriesMock: (): Promise<AxiosResponse<NameItem[]>> => {
    return Promise.resolve({
      data: countries
    } as AxiosResponse)
  }
}
