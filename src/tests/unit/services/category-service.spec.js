import { describe, it, expect, vi, beforeEach } from 'vitest'

import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { categoryService } from '~/services/category-service'

vi.mock('~/plugins/axiosClient', () => ({
  axiosClient: {
    get: vi.fn()
  }
}))

describe('categoryService', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('getCategories returns normalized data with items and count', async () => {
    const mockData = [
      { id: 1, name: 'Math' },
      { id: 2, name: 'Physics' }
    ]
    const mockResponse = {
      data: mockData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    }

    axiosClient.get.mockResolvedValueOnce(mockResponse)

    const result = await categoryService.getCategories({ name: 'Ma' })

    expect(axiosClient.get).toHaveBeenCalledWith(URLs.categories.get, {
      params: { name: 'Ma' }
    })

    expect(result.data.items).toEqual(mockData)
    expect(result.data.count).toBe(2)
  })

  it('getCategoriesNames calls correct endpoint and returns data', async () => {
    const mockNames = [{ id: 1, name: 'Math' }]
    axiosClient.get.mockResolvedValueOnce({ data: mockNames })

    const result = await categoryService.getCategoriesNames()

    expect(axiosClient.get).toHaveBeenCalledWith(URLs.categories.getNames)
    expect(result.data).toEqual(mockNames)
  })
})
