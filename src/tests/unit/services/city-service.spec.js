import { URLs } from '~/constants/request'
import { mockAxiosClient } from '~tests/test-utils'
import { cityService } from '~/services/city-service'
import { cities } from '~/constants/mocks/cities'

describe('cityService tests', () => {
  it('should make a GET request to the correct URL with params', async () => {
    const options = { name: 'Ky' }

    mockAxiosClient.onGet(URLs.cities.get, { params: options }).reply(200, [])

    await cityService.getCities(options)

    expect(mockAxiosClient.history.get[0].url).toBe(URLs.cities.get)
    expect(mockAxiosClient.history.get[0].params).toEqual(options)
  })

  it('should make a GET request to the correct URL without params', async () => {
    mockAxiosClient.onGet(URLs.cities.get).reply(200, [])

    await cityService.getCities()

    expect(mockAxiosClient.history.get[0].url).toBe(URLs.cities.get)
  })

  it('should return an array of cities', async () => {
    const responseData = [
      { id: 1, name: 'Kyiv' },
      { id: 2, name: 'Lviv' }
    ]

    mockAxiosClient.onGet(URLs.cities.get).reply(200, responseData)

    const response = await cityService.getCities()

    expect(response.status).toBe(200)
    expect(response.data).toEqual(responseData)
  })

  it('should return mocked cities from getCitiesMock()', async () => {
    const response = await cityService.getCitiesMock()

    expect(response.data).toEqual(cities)
    expect(Array.isArray(response.data)).toBe(true)
  })

  it('should handle an empty mock list gracefully', async () => {
    const backup = [...cities]
    cities.length = 0

    const response = await cityService.getCitiesMock()
    expect(response.data).toEqual([])

    cities.push(...backup)
  })
})
