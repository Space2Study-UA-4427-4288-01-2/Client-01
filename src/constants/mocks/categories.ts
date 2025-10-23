import { CategoryInterface, UserRoleEnum } from '~/types'

export const categoryMocks: CategoryInterface[] = [
  {
    _id: '68e660bbc46c7d63c4c9e77f',
    name: 'Mathematics',
    appearance: { icon: '/icons/math.svg', color: '#4CAF50' },
    totalOffers: { [UserRoleEnum.Student]: 42, [UserRoleEnum.Tutor]: 18 },
    createdAt: '2025-09-15T09:00:00.000Z',
    updatedAt: '2025-09-16T12:00:00.000Z'
  },
  {
    _id: '2',
    name: 'Languages',
    appearance: { icon: '/icons/language.svg', color: '#2196F3' },
    totalOffers: { [UserRoleEnum.Student]: 60, [UserRoleEnum.Tutor]: 25 },
    createdAt: '2025-09-10T08:30:00.000Z',
    updatedAt: '2025-09-11T10:45:00.000Z'
  },
  {
    _id: '3',
    name: 'Science',
    appearance: { icon: '/icons/science.svg', color: '#FF9800' },
    totalOffers: { [UserRoleEnum.Student]: 33, [UserRoleEnum.Tutor]: 14 },
    createdAt: '2025-09-05T10:00:00.000Z',
    updatedAt: '2025-09-06T09:30:00.000Z'
  },
  {
    _id: '4',
    name: 'Art',
    appearance: { icon: '/icons/art.svg', color: '#E91E63' },
    totalOffers: { [UserRoleEnum.Student]: 27, [UserRoleEnum.Tutor]: 12 },
    createdAt: '2025-09-20T11:00:00.000Z',
    updatedAt: '2025-09-21T12:30:00.000Z'
  },
  {
    _id: '5',
    name: 'Programming',
    appearance: { icon: '/icons/code.svg', color: '#9C27B0' },
    totalOffers: { [UserRoleEnum.Student]: 85, [UserRoleEnum.Tutor]: 30 },
    createdAt: '2025-08-25T15:20:00.000Z',
    updatedAt: '2025-08-26T10:40:00.000Z'
  },
  {
    _id: '6',
    name: 'Music',
    appearance: { icon: '/icons/music.svg', color: '#FFC107' },
    totalOffers: { [UserRoleEnum.Student]: 19, [UserRoleEnum.Tutor]: 7 },
    createdAt: '2025-07-11T09:50:00.000Z',
    updatedAt: '2025-07-12T08:15:00.000Z'
  },
  {
    _id: '7',
    name: 'History',
    appearance: { icon: '/icons/history.svg', color: '#795548' },
    totalOffers: { [UserRoleEnum.Student]: 26, [UserRoleEnum.Tutor]: 10 },
    createdAt: '2025-06-01T13:00:00.000Z',
    updatedAt: '2025-06-02T09:00:00.000Z'
  },
  {
    _id: '8',
    name: 'Sports',
    appearance: { icon: '/icons/sports.svg', color: '#00BCD4' },
    totalOffers: { [UserRoleEnum.Student]: 54, [UserRoleEnum.Tutor]: 21 },
    createdAt: '2025-10-05T07:00:00.000Z',
    updatedAt: '2025-10-06T10:20:00.000Z'
  },
  {
    _id: '9',
    name: 'Design',
    appearance: { icon: '/icons/design.svg', color: '#FF5722' },
    totalOffers: { [UserRoleEnum.Student]: 38, [UserRoleEnum.Tutor]: 16 },
    createdAt: '2025-08-18T12:00:00.000Z',
    updatedAt: '2025-08-19T15:15:00.000Z'
  },
  {
    _id: '10',
    name: 'Business',
    appearance: { icon: '/icons/business.svg', color: '#3F51B5' },
    totalOffers: { [UserRoleEnum.Student]: 73, [UserRoleEnum.Tutor]: 29 },
    createdAt: '2025-09-28T14:00:00.000Z',
    updatedAt: '2025-09-29T10:10:00.000Z'
  }
]
