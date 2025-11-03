import { describe, it, expect, vi } from 'vitest'
import { subjectService } from '~/services/subject-service'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

vi.mock('~/plugins/axiosClient', () => ({
  axiosClient: {
    get: vi.fn()
  }
}))

describe('subjectService', () => {
  it('calls axiosClient.get with correct params for getSubjects', async () => {
    axiosClient.get.mockResolvedValueOnce({ data: { items: [], count: 0 } })

    const params = { name: 'Math' }
    const categoryId = '123'

    await subjectService.getSubjects(params, categoryId)

    expect(axiosClient.get).toHaveBeenCalledWith(URLs.subjects.get, {
      params: { ...params, categoryId }
    })
  })

  it('calls axiosClient.get with correct params for getSubjectsNames', async () => {
    axiosClient.get.mockResolvedValueOnce({ data: [] })

    const categoryId = '456'
    await subjectService.getSubjectsNames(categoryId)

    expect(axiosClient.get).toHaveBeenCalledWith(URLs.subjects.getNames, {
      params: { categoryId }
    })
  })

  it('returns mocked data from getSubjectsNamesMock', async () => {
    const response = await subjectService.getSubjectsNamesMock()

    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data[0]).toHaveProperty('name')
    expect(response.data[0]).toHaveProperty('_id')
  })
})
