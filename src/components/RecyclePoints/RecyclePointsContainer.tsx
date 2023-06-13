import {useEffect, useReducer, useState} from 'react'
import RecyclePoints from './RecyclePoints'
import {IRecyclePoint} from '../../types/recyclePointTypes'
import axios from '../../api/api'
import {IModal} from '../../types/otherTypes'
import {ICity} from '../../types/cityTypes'

function RecyclePointsContainer() {
  const reducer = (prevState: IRecyclePoint, newState: Partial<IRecyclePoint>) => {
    return {...prevState, ...newState}
  }

  const initState: IRecyclePoint = {
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
    trashRecycleSize: 0,
    connectionWithCollection: [],
    shortestWayToCPs: [],
  }

  const [currentRecyclePoint, setCurrentRecyclePoint] = useReducer(reducer, initState)
  const [recyclePoints, setRecyclePoints] = useState<IRecyclePoint[]>([])
  const [cities, setCities] = useState<ICity[]>([])
  const [modal, setModal] = useState<IModal>({mode: '', opened: false})

  useEffect(() => {
    getRecyclePoints()
    getCities()
  }, [])

  const getRecyclePoints = async () => {
    try {
      const {data} = await axios.get('recycle-points')
      setRecyclePoints(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getCities = async () => {
    try {
      const {data} = await axios.get('cities')
      setCities(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const createRecyclePoint = async () => {
    try {
      const {data} = await axios.post('recycle-points', {
        name: currentRecyclePoint.name,
        cityId: currentRecyclePoint.city.id,
      })
      cleanStateAndCloseModal()
      getRecyclePoints()
    } catch (err) {
      console.log(err)
    }
  }

  const cleanStateAndCloseModal = () => {
    setCurrentRecyclePoint(initState)
    setModal({mode: '', opened: false})
  }

  const openUpdateModal = (recyclePoint: IRecyclePoint) => {
    setCurrentRecyclePoint({
      id: recyclePoint.id,
      name: recyclePoint.name,
      connectionWithCollection: recyclePoint.connectionWithCollection,
    })
    setModal({mode: 'patch', opened: true})
  }

  const updateRecyclePoint = async () => {
    try {
      const {data} = await axios.put(`recycle-points/${currentRecyclePoint.id}`, {
        name: currentRecyclePoint.name,
      })
      cleanStateAndCloseModal()
      getRecyclePoints()
    } catch (err) {
      console.log(err)
    }
  }

  const deleteRecyclePoint = async (recyclePointId: number) => {
    const value = window.confirm('you sure you want to delete recycle point?')
    if (value) {
      try {
        const {data} = await axios.delete(`recycle-points/${recyclePointId}`)
        getRecyclePoints()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const onModalClose = () => {
    cleanStateAndCloseModal()
  }

  const getShortestWayToCPs = async (recyclePoint: IRecyclePoint) => {
    try {
      const {data} = await axios.get(`recycle-points/shortest-way/${recyclePoint.id}`)
      setCurrentRecyclePoint({
        id: recyclePoint.id,
        connectionWithCollection: recyclePoint.connectionWithCollection,
        shortestWayToCPs: data,
      })
      setModal({mode: 'shortestWay', opened: true})
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <RecyclePoints
      recyclePoints={recyclePoints}
      currentRecyclePoint={currentRecyclePoint}
      setCurrentRecyclePoint={setCurrentRecyclePoint}
      modal={modal}
      setModal={setModal}
      createRecyclePoint={createRecyclePoint}
      openUpdateModal={openUpdateModal}
      updateRecyclePoint={updateRecyclePoint}
      deleteRecyclePoint={deleteRecyclePoint}
      onModalClose={onModalClose}
      getShortestWayToCPs={getShortestWayToCPs}
      cities={cities}
    />
  )
}

export default RecyclePointsContainer
