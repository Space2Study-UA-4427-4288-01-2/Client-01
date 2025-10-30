import { Offer, UserResponse, UserRoleEnum } from '~/types'

export interface NameItem {
  _id: string
  name: string
}

export interface ItemsWithCount<T> {
  count: number
  items: T[]
}
export interface CommonEntityFields {
  _id: string
  createdAt: string
  updatedAt: string
}

export interface CategoryAppearance {
  icon: string
  color: string
}

export interface DataByRole<T> {
  [UserRoleEnum.Student]: T
  [UserRoleEnum.Tutor]: T
}

export interface CategoryInterface extends NameItem {
  appearance: CategoryAppearance
  totalOffers: DataByRole<number>
  createdAt: string
  updatedAt: string
}

export interface CategoryNameInterface extends NameItem {}

export interface SubjectInterface extends NameItem {
  category: string
  totalOffers: DataByRole<number>
  createdAt: string
  updatedAt: string
}

export interface SubjectNameInterface extends NameItem {}

export interface ReviewInterface {
  offer: Offer
  author: UserResponse
  comment: string
  rating: number
  createdAt: string
}

export interface Faq {
  _id?: string
  question: string
  answer: string
}
export interface OutletContext {
  pageRef: React.RefObject<HTMLDivElement> | null
}

export interface Breakpoints {
  isDesktop: boolean
  isLaptopAndAbove: boolean
  isLaptop: boolean
  isTablet: boolean
  isMobile: boolean
}
export interface RouteItem {
  route: string
  path: string
}

export interface AddDocuments {
  maxFileSize: number
  maxAllFilesSize: number
  filesTypes: string[]
  fileSizeError: string
  allFilesSizeError: string
  typeError: string
  maxQuantityFiles: number
}

export interface Emitter {
  files: File[]
  error?: string
}
