import {Dispatch, SetStateAction} from 'react'
import {ICollectionAndRecylceConnection, IModal} from './otherTypes'
import {IRecyclePoint} from './recyclePointTypes'

export interface ICollectionPoint {
  id: number
  cityId: number
  name: string
  createdAt: string
  updatedAt: string
  trashCollectionSize: number
  trashLeftSize: number
  connectionWithRecycle: ICollectionAndRecylceConnection[]
}

export interface ICollectionPointProps {
  collectionPoints: ICollectionPoint[]
  modal: IModal
  setModal: Dispatch<SetStateAction<IModal>>
  currentCollectionPoint: ICurrentCollectionPoint
  setCurrentCollectionPoint: Dispatch<Partial<ICurrentCollectionPoint>>
  recyclePoints: IRecyclePoint[]
  connectWithRecyclePoint: (recyclePointId: number) => void
}

export interface ICurrentCollectionPoint extends ICollectionPoint {
  connectionsWithRecycleToPost: {
    distance: number
    trashSize: number
    recyclePointId: number
  }[]
}
