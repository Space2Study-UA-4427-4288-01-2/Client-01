import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  CategoryInterface,
  CategoryNameInterface,
  CategoriesParams,
  ItemsWithCount
} from '~/types'
import { categoryMocks } from '~/constants/mocks/categories'

export const categoryService = {
  getCategories: (
    params?: Partial<CategoriesParams>
  ): Promise<AxiosResponse<ItemsWithCount<CategoryInterface>>> => {
    return axiosClient.get(URLs.categories.get, { params })
  },
  getCategoriesNames: (): Promise<AxiosResponse<CategoryNameInterface[]>> => {
    const categories = categoryMocks.map(({ name, _id }) => ({ name, _id }))
    return Promise.resolve({
      data: categories
    } as AxiosResponse)
    // return axiosClient.get(URLs.categories.getNames)
  }
}
