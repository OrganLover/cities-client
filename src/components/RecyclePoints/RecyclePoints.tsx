import {IRecyclePointProps} from '../../types/recyclePointTypes'
import {Modal} from '../common/Modal'
import Menu from '../common/Menu'

function RecyclePoints({
  recyclePoints,
  currentRecyclePoint,
  setCurrentRecyclePoint,
  modal,
  setModal,
  createRecyclePoint,
  openUpdateModal,
  updateRecyclePoint,
  deleteRecyclePoint,
  onModalClose,
  getShortestWayToCPs,
  cities,
}: IRecyclePointProps) {
  return (
    <div>
      <Menu />
      <button onClick={() => setModal({mode: 'post', opened: true})}>Add Recycle point</button>
      {recyclePoints.map((item) => {
        return (
          <div key={item.id} style={{backgroundColor: 'lightgrey', marginBlock: '20px'}}>
            <div>
              <span style={{fontSize: '25px'}}>{item.name}</span>
            </div>
            <div>
              <span>
                trashRecycleSize: <b>{item.trashRecycleSize}</b>
              </span>
            </div>
            <div>
              <span>
                city: <b>{item.city?.name}</b>
              </span>
            </div>
            <div>
              {item.connectionWithCollection.length > 0 && <span>connections with collection points:</span>}
              {item.connectionWithCollection.map((con) => {
                return (
                  <div key={con.id}>
                    <div>
                      <div>
                        <b>
                          ({con.collectionPoint.name}) - {con.distance} miles
                        </b>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div>
              <button onClick={() => getShortestWayToCPs(item)}>get shortest way to CPs</button>
            </div>
            <button onClick={() => openUpdateModal(item)}>update</button>
            <button onClick={() => deleteRecyclePoint(item.id)}>delete</button>
          </div>
        )
      })}
      {modal.opened && modal.mode === 'post' && (
        <Modal onModalClose={onModalClose}>
          <div>
            <span>add recycle point</span>
            <div>
              <div>
                <label htmlFor='recyclePointName'>recycle point name</label>
                <input
                  name='recyclePointName'
                  onChange={(e) => setCurrentRecyclePoint({name: e.target.value})}
                  value={currentRecyclePoint.name}
                />
              </div>
              <div>
                <label htmlFor='recyclePointCity'>recycle point city</label>
                <select
                  onChange={(e) =>
                    setCurrentRecyclePoint({
                      city: {...currentRecyclePoint.city, id: Number(e.target.value)},
                    })
                  }
                  name='recyclePointCity'
                  id='city-select'
                >
                  <option value=''>--choose city--</option>
                  {cities.map((city) => {
                    return (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
            <button onClick={createRecyclePoint}>add recycle point</button>
          </div>
        </Modal>
      )}
      {modal.opened && modal.mode === 'patch' && (
        <Modal onModalClose={onModalClose}>
          <div>
            <span>update recycle point</span>
            <div>
              <label htmlFor='recyclePointName'>recycle point name</label>
              <input
                name='recyclePointName'
                onChange={(e) => setCurrentRecyclePoint({name: e.target.value})}
                value={currentRecyclePoint.name}
              />
            </div>
            <div>
              {currentRecyclePoint.connectionWithCollection.length > 0 && (
                <b>connections with collection points:</b>
              )}
              {currentRecyclePoint.connectionWithCollection.map((item) => {
                return (
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBlock: '10px'}}>
                    <div>
                      <div>
                        <b>name:</b> {item.collectionPoint.name}
                      </div>
                      <div>
                        <b>trashCollectionSize:</b> {item.collectionPoint.trashCollectionSize}
                      </div>
                      <div>
                        <b>trashLeftSize:</b> {item.collectionPoint.trashLeftSize}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <button onClick={updateRecyclePoint}>update recycle point</button>
          </div>
        </Modal>
      )}
      {modal.opened && modal.mode === 'shortestWay' && (
        <Modal onModalClose={() => setModal({mode: '', opened: false})}>
          <ol>
            {currentRecyclePoint.shortestWayToCPs.map((item) => {
              return (
                <li style={{backgroundColor: 'lightgrey', marginBlock: '10px'}}>
                  <span style={{fontSize: '20px'}}>{item.name}</span>
                  <div>
                    trashCollectionSize: <b>{item.trashCollectionSize}</b>
                  </div>
                  <div>
                    trashLeftSize: <b>{item.trashLeftSize}</b>
                  </div>
                  <div>
                    distance:{' '}
                    <b>
                      {
                        currentRecyclePoint.connectionWithCollection.find(
                          (con) => con.collectionPoint.id === item.id,
                        )?.distance
                      }
                    </b>
                  </div>
                </li>
              )
            })}
          </ol>
        </Modal>
      )}
    </div>
  )
}

export default RecyclePoints
