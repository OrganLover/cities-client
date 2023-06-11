import {Dispatch, SetStateAction} from 'react'
import {ICollectionAndRecylceConnection, IModal} from './otherTypes'
import {ICity} from './cityTypes'
import {ICollectionPoint} from './collectionPointTypes'

export interface IRecyclePoint {
  id: number
  city: ICity | null
  name: string
  createdAt: string
  updatedAt: string
  trashRecycleSize: number
  connectionWithCollection: ICollectionAndRecylceConnection[]
  shortestWayToCPs: ICollectionPoint[]
}

export interface IRecyclePointProps {
  recyclePoints: IRecyclePoint[]
  currentRecyclePoint: IRecyclePoint
  setCurrentRecyclePoint: Dispatch<Partial<IRecyclePoint>>
  modal: IModal
  setModal: Dispatch<SetStateAction<IModal>>
  createRecyclePoint: () => void
  openUpdateModal: (recyclePoint: IRecyclePoint) => void
  updateRecyclePoint: () => void
  deleteRecyclePoint: (recyclePointId: number) => void
  onModalClose: () => void
  getShortestWayToCPs: (recyclePointId: IRecyclePoint) => void
}
