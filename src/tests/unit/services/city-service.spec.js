import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cityService } from '~/services/city-service'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { cities } from '~/constants/mocks/cities'

vi.mock('~/plugins/axiosClient', () => ({
  axiosClient: {
    get: vi.fn()
  }
}))

describe('cityService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCities', () => {
    it('should call axiosClient.get with correct URL and params', async () => {
      const mockResponse = { data: [{ id: 1, name: 'Kyiv' }] }
      axiosClient.get.mockResolvedValueOnce(mockResponse)

      const params = { name: 'Ky' }
      const result = await cityService.getCities(params)

      expect(axiosClient.get).toHaveBeenCalledWith(URLs.cities.get, { params })
      expect(result).toEqual(mockResponse)
    })

    it('should work without params', async () => {
      const mockResponse = { data: [] }
      axiosClient.get.mockResolvedValueOnce(mockResponse)

      const result = await cityService.getCities()

      expect(axiosClient.get).toHaveBeenCalledWith(URLs.cities.get, {
        params: undefined
      })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getCitiesMock', () => {
    it('should return a resolved promise with mocked cities', async () => {
      const result = await cityService.getCitiesMock()
      expect(result.data).toEqual(cities)
    })

    it('should return an object with a data array', async () => {
      const result = await cityService.getCitiesMock()
      expect(result).toHaveProperty('data')
      expect(Array.isArray(result.data)).toBe(true)
    })
  })
})
