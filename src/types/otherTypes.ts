import {ICollectionPoint} from './collectionPointTypes'
import {IRecyclePoint} from './recyclePointTypes'

export interface IModal {
  mode: string
  opened: boolean
}

export interface ICollectionAndRecylceConnection {
  id: number
  distance: number
  trashSize: number
  createdAt: string
  updatedAt: string
  collectionPoint: ICollectionPoint
  recyclePoint: IRecyclePoint
}
