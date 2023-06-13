import {useEffect, useReducer, useState} from 'react'
import CollectionPoints from './CollectionPoints'
import axios from '../../api/api'
import {ICollectionPoint, ICurrentCollectionPoint} from '../../types/collectionPointTypes'
import {IModal} from '../../types/otherTypes'
import {IRecyclePoint} from '../../types/recyclePointTypes'
import {ICity} from '../../types/cityTypes'

function CollectionPointsContainer() {
  const reducer = (prevState: ICurrentCollectionPoint, newState: Partial<ICurrentCollectionPoint>) => {
    return {...prevState, ...newState}
  }

  const initState: ICurrentCollectionPoint = {
    id: 0,
    city: {
      id: 0,
      name: '',
      createdAt: '',
      updatedAt: '',
    },
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
  const [cities, setCities] = useState<ICity[]>([])
  const [modal, setModal] = useState<IModal>({mode: '', opened: false})

  useEffect(() => {
    getCollectionPoints()
    getRecyclePoints()
    getCities()
  }, [])

  const getCollectionPoints = async () => {
    const {data} = await axios.get('collection-points')
    setCollectionPoints(data)
  }

  const getRecyclePoints = async () => {
    const {data} = await axios.get('recycle-points')
    setRecyclePoints(data)
  }

  const getCities = async () => {
    try {
      const {data} = await axios.get('cities')
      setCities(data)
    } catch (err) {
      console.log(err)
    }
  }

  const createCollectionPoint = async () => {
    if (currentCollectionPoint.name) {
      try {
        const {data} = await axios.post('collection-points', {
          name: currentCollectionPoint.name,
          trashCollectionSize: currentCollectionPoint.trashCollectionSize,
          cityId: currentCollectionPoint.city.id,
          connectionWithRecycle: currentCollectionPoint.connectionsWithRecycleToPost,
        })
        cleanStateAndCloseModal()
        getCollectionPoints()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const connectWithRecyclePoint = (recyclePointId: number) => {
    const distance = Number(window.prompt('enter a distance'))
    const trashSize = Number(window.prompt('enter a trashSize in percent'))
    if (distance && trashSize) {
      setCurrentCollectionPoint({
        connectionsWithRecycleToPost: [
          ...currentCollectionPoint.connectionsWithRecycleToPost,
          {trashSize, distance, recyclePointId},
        ],
      })
    }
  }

  const openUpdateModal = (collectionPoint: ICollectionPoint) => {
    setCurrentCollectionPoint({
      id: collectionPoint.id,
      city: collectionPoint.city,
      name: collectionPoint.name,
      trashCollectionSize: collectionPoint.trashCollectionSize,
      trashLeftSize: collectionPoint.trashLeftSize,
      connectionWithRecycle: collectionPoint.connectionWithRecycle,
    })
    setModal({mode: 'patch', opened: true})
  }

  const cleanStateAndCloseModal = () => {
    setCurrentCollectionPoint(initState)
    setModal({mode: '', opened: false})
  }

  const deleteCollectionPoint = async (collectionPointId: number) => {
    const value = window.confirm('you sure you want to delete collection point?')
    if (value) {
      try {
        const {data} = await axios.delete(`collection-points/${collectionPointId}`)
        getCollectionPoints()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const onModalClose = () => {
    cleanStateAndCloseModal()
  }

  const updateCollectionPoint = async () => {
    const value = window.confirm('you sure you want to save changes?')
    if (value) {
      try {
        const {data} = await axios.put(`collection-points/${currentCollectionPoint.id}`, {
          name: currentCollectionPoint.name,
          trashCollectionSize: currentCollectionPoint.trashCollectionSize,
          cityId: currentCollectionPoint.city.id,
          connectionWithRecycle: currentCollectionPoint.connectionsWithRecycleToPost,
        })
        cleanStateAndCloseModal()
        getCollectionPoints()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const disconnectWithRecyclePoint = async (connectionId: number) => {
    const value = window.confirm('you sure you want to disconnect with recycle point?')
    if (value) {
      try {
        const {data} = await axios.delete(`collection-recycle-connection/${connectionId}`)
        getCollectionPoints()
      } catch (err) {
        console.log(err)
      }
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
      createCollectionPoint={createCollectionPoint}
      deleteCollectionPoint={deleteCollectionPoint}
      openUpdateModal={openUpdateModal}
      onModalClose={onModalClose}
      updateCollectionPoint={updateCollectionPoint}
      disconnectWithRecyclePoint={disconnectWithRecyclePoint}
      cities={cities}
    />
  )
}

export default CollectionPointsContainer
