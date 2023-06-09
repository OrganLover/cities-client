import {useEffect, useReducer, useState} from 'react'
import CollectionPoints from './CollectionPoints'
import axios from '../../api/api'
import {ICollectionPoint, ICurrentCollectionPoint} from '../../types/collectionPointTypes'
import {IModal} from '../../types/otherTypes'
import {IRecyclePoint} from '../../types/recyclePointTypes'

function CollectionPointsContainer() {
  const reducer = (prevState: ICurrentCollectionPoint, newState: Partial<ICurrentCollectionPoint>) => {
    return {...prevState, ...newState}
  }

  const initState: ICurrentCollectionPoint = {
    id: 0,
    cityId: 0,
    name: '',
    createdAt: '',
    updatedAt: '',
    trashCollectionSize: 0,
    trashLeftSize: 0,
    connectionWithRecycle: [],
    connectionsWithRecycleToPost: [],
  }

  const [currentCollectionPoint, setCurrentCollectionPoint] = useReducer(reducer, initState)
  const [collectionPoints, setCollectionPoints] = useState<ICollectionPoint[]>([])
  const [recyclePoints, setRecyclePoints] = useState<IRecyclePoint[]>([])
  const [modal, setModal] = useState<IModal>({mode: '', opened: false})

  useEffect(() => {
    getCollectionPoints()
    getRecyclePoints()
  })

  const getCollectionPoints = async () => {
    const {data} = await axios.get('collection-points')
    setCollectionPoints(data)
  }

  const getRecyclePoints = async () => {
    const {data} = await axios.get('recycle-points')
    setRecyclePoints(data)
  }

  const createCollectionPoint = async () => {
    const {data} = await axios.post('collection-points', {
      name: currentCollectionPoint.name,
      trashCollectionSize: 0,
      cityId: 0,
      connectionWithRecycle: [],
    })
  }

  const connectWithRecyclePoint = (recyclePointId: number) => {
    const distance = Number(window.prompt('enter a distance'))
    const trashSize = Number(window.prompt('enter a trashSize'))
    if (distance && trashSize) {
      setCurrentCollectionPoint({
        connectionsWithRecycleToPost: [
          ...currentCollectionPoint.connectionsWithRecycleToPost,
          {trashSize, distance, recyclePointId},
        ],
      })
    }
  }

  return (
    <CollectionPoints
      collectionPoints={collectionPoints}
      modal={modal}
      setModal={setModal}
      currentCollectionPoint={currentCollectionPoint}
      setCurrentCollectionPoint={setCurrentCollectionPoint}
      recyclePoints={recyclePoints}
      connectWithRecyclePoint={connectWithRecyclePoint}
    />
  )
}

export default CollectionPointsContainer
