import {ICollectionAndRecylceConnection} from './otherTypes'

export interface IRecyclePoint {
  id: number
  cityId: number
  name: string
  createdAt: string
  updatedAt: string
  trashRecycleSize: number
  connectionWithCollection: ICollectionAndRecylceConnection[]
}
