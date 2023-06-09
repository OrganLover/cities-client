import {Modal} from '../common/Modal'
import {ICitiesProps, ICityConnection} from '../../types/cityTypes'

function Cities({
  cities,
  modal,
  currentCity,
  openAddCityModal,
  deleteConnection,
  openUpdateCityModal,
  deleteCity,
  onModalClose,
  setCurrentCity,
  addConnection,
  onCityAdd,
  onCityUpdate,
}: ICitiesProps) {
  return (
    <div>
      <button onClick={openAddCityModal}>Add city</button>
      <div>
        {cities.map((city) => {
          return (
            <div key={city.id} style={{backgroundColor: 'lightgrey'}}>
              <span>{city.name}</span>
              <div>
                {city.connections.length !== 0 && <b>connected cities: </b>}
                {city.connections.map((con) => {
                  return (
                    <div key={con.id} style={{backgroundColor: '#999'}}>
                      <div>
                        {city.id === con.initiator.id ? con.applier.name : con.initiator.name} -{' '}
                        {con.distance}miles
                        <button onClick={() => deleteConnection(con)}>delete connection</button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button onClick={() => openUpdateCityModal(city)}>change values</button>
              <button onClick={() => deleteCity(city)}>delete city</button>
              <br />
            </div>
          )
        })}
      </div>
      {modal.opened && modal.mode === 'post' && (
        <Modal onModalClose={onModalClose}>
          <div style={{fontSize: '20px'}}>
            <div>Add city</div>
            <div>
              <label htmlFor='input'>input city name</label>
              <input
                name='input'
                onChange={(e) => {
                  setCurrentCity({name: e.target.value})
                }}
                value={currentCity.name}
              />
              <div>
                {cities.map((city) => {
                  return (
                    <div key={city.id} style={{display: 'flex', justifyContent: 'space-between'}}>
                      <span>{city.name}</span>
                      <button onClick={() => addConnection(city.id)}>connect</button>
                    </div>
                  )
                })}
              </div>
              <div>
                <button onClick={onCityAdd}>add city</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {modal.opened && modal.mode === 'patch' && (
        <Modal onModalClose={onModalClose}>
          <div style={{fontSize: '20px'}}>
            <div>Edit city values</div>
            <div>
              <label htmlFor='input'>input city name</label>
              <input
                name='input'
                onChange={(e) => {
                  setCurrentCity({name: e.target.value})
                }}
                value={currentCity.name}
              />
              <div>
                {cities.map((city) => {
                  return (
                    currentCity.id !== city.id && (
                      <div key={city.id} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>{city.name}</span>
                        {city.connections.some(
                          (con) => con.applier.id === currentCity.id || con.initiator.id === currentCity.id,
                        ) ? (
                          <b>connected</b>
                        ) : (
                          <button onClick={() => addConnection(city.id)}>connect</button>
                        )}
                      </div>
                    )
                  )
                })}
              </div>
              <div>
                <button onClick={onCityUpdate}>save changes</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Cities
