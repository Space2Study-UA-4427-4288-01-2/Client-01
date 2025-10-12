import { describe, it, expect, vi, beforeEach } from 'vitest'
import { countryService } from '~/services/country-service'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { countries } from '~/constants/mocks/countries'

vi.mock('~/plugins/axiosClient', () => ({
  axiosClient: {
    get: vi.fn()
  }
}))

describe('countryService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCoutries', () => {
    it('should call axiosClient.get with correct URL and params', async () => {
      const mockResponse = { data: [{ id: 1, name: 'Ukraine' }] }
      axiosClient.get.mockResolvedValueOnce(mockResponse)

      const params = { name: 'Ua' }
      const result = await countryService.getCountries(params)

      expect(axiosClient.get).toHaveBeenCalledWith(URLs.countries.get, {
        params
      })
      expect(result).toEqual(mockResponse)
    })

    it('should work without params', async () => {
      const mockResponse = { data: [] }
      axiosClient.get.mockResolvedValueOnce(mockResponse)

      const result = await countryService.getCountries()

      expect(axiosClient.get).toHaveBeenCalledWith(URLs.countries.get, {
        params: undefined
      })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getCoutriesMock', () => {
    it('should return a resolved promise with mocked countries', async () => {
      const result = await countryService.getCountriesMock()
      expect(result.data).toEqual(countries)
    })

    it('should return an object with data property', async () => {
      const result = await countryService.getCountriesMock()
      expect(result).toHaveProperty('data')
      expect(Array.isArray(result.data)).toBe(true)
    })
  })
})
