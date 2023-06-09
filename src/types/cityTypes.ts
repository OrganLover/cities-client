import {Dispatch, SetStateAction} from 'react'
import {IModal} from './otherTypes'
import {ICollectionPoint} from './collectionPointTypes'
import {IRecyclePoint} from './recyclePointTypes'

export interface ICity {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  connections: ICityConnection[]
  collectionPoints: ICollectionPoint[]
  recyclePoints: IRecyclePoint[]
}

export interface ICityConnection {
  id: number
  distance: number
  createdAt: string
  updatedAt: string
  initiator: IInitiator
  applier: IApplier
}

interface IInitiator {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

interface IApplier {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface ICurrentCity extends ICity {
  connectionsToPost: {distance: number; applierId: number}[]
}

export interface ICitiesProps {
  cities: ICity[]
  openAddCityModal: () => void
  deleteConnection: (con: ICityConnection) => void
  openUpdateCityModal: (city: ICity) => void
  deleteCity: (city: ICity) => void
  modal: IModal
  onModalClose: () => void
  addConnection: (applierId: number) => void
  onCityAdd: () => void
  onCityUpdate: () => void
  setCurrentCity: Dispatch<Partial<ICurrentCity>>
  currentCity: ICurrentCity
}
