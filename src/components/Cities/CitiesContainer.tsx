import {useEffect, useReducer, useState} from 'react'
import axios from '../../api/api'
import Cities from './Cities'
import {IModal} from '../../types/otherTypes'
import {ICity, ICityConnection, ICurrentCity} from '../../types/cityTypes'

function CitiesContainer() {
  const reducer = (state: ICurrentCity, newState: Partial<ICurrentCity>) => {
    return {...state, ...newState}
  }

  const currentCityInit: ICurrentCity = {
    id: 0,
    name: '',
    collectionPoints: [],
    connections: [],
    createdAt: '',
    recyclePoints: [],
    updatedAt: '',
    connectionsToPost: [],
  }

  const [currentCity, setCurrentCity] = useReducer(reducer, currentCityInit)
  const [cities, setCities] = useState<ICity[]>([])
  const [modal, setModal] = useState<IModal>({mode: '', opened: false})

  useEffect(() => {
    getCities()
  }, [])

  const getCities = async () => {
    try {
      const {data} = await axios.get('cities')
      setCities(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const openAddCityModal = () => {
    setModal({mode: 'post', opened: true})
  }

  const onCityAdd = async () => {
    if (currentCity?.name) {
      const value = window.confirm(`you sure you want to add city ${currentCity.name}`)
      if (value) {
        try {
          const {data} = await axios.post('cities', {
            name: currentCity.name,
            connections: currentCity.connectionsToPost,
          })
          cleanStateAndCloseModal()
          getCities()
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  const openUpdateCityModal = (city: ICity) => {
    setCurrentCity({
      id: city.id,
      name: city.name,
      connections: city.connections,
    })
    setModal({mode: 'patch', opened: true})
  }

  const onCityUpdate = async () => {
    const value = window.confirm('you sure you want to save changes?')
    if (value) {
      try {
        const {data} = await axios.put(`cities/${currentCity.id}`, {
          name: currentCity.name,
          connections: currentCity.connectionsToPost,
        })
        cleanStateAndCloseModal()
        getCities()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const deleteCity = async (city: ICity) => {
    const value = window.confirm(`you sure you want to delete city ${city.name}?`)
    if (value) {
      try {
        const {data} = await axios.delete(`cities/${city.id}`)
        cleanStateAndCloseModal()
        getCities()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const addConnection = (applierId: number) => {
    let distance = Number(window.prompt('please enter a distance'))
    if (distance) {
      setCurrentCity({
        connectionsToPost: [...currentCity.connectionsToPost, {applierId, distance}],
      })
    }
  }

  const deleteConnection = async (con: ICityConnection) => {
    const value = window.confirm(`you sure you want to delete connection?`)
    if (value) {
      try {
        const {data} = await axios.delete(`connections/${con.id}`)
        getCities()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const onModalClose = () => {
    cleanStateAndCloseModal()
  }

  const cleanStateAndCloseModal = () => {
    setCurrentCity(currentCityInit)
    setModal({mode: '', opened: false})
  }

  return (
    <Cities
      cities={cities}
      openAddCityModal={openAddCityModal}
      addConnection={addConnection}
      deleteCity={deleteCity}
      deleteConnection={deleteConnection}
      modal={modal}
      onCityAdd={onCityAdd}
      onCityUpdate={onCityUpdate}
      onModalClose={onModalClose}
      openUpdateCityModal={openUpdateCityModal}
      setCurrentCity={setCurrentCity}
      currentCity={currentCity}
    />
  )
}

export default CitiesContainer
