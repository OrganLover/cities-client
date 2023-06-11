import {ICollectionPointProps} from '../../types/collectionPointTypes'
import {Modal} from '../common/Modal'
import Menu from '../common/Menu'

function CollectionPoints({
  collectionPoints,
  modal,
  setModal,
  currentCollectionPoint,
  setCurrentCollectionPoint,
  recyclePoints,
  connectWithRecyclePoint,
  createCollectionPoint,
  deleteCollectionPoint,
  openUpdateModal,
  onModalClose,
  updateCollectionPoint,
  disconnectWithRecyclePoint,
}: ICollectionPointProps) {
  return (
    <div>
      <Menu />
      <button onClick={() => setModal({mode: 'post', opened: true})}>Add collection point</button>
      {collectionPoints.map((item) => {
        return (
          <div key={item.id} style={{backgroundColor: 'lightgrey', marginBlock: '20px'}}>
            <div>
              <span style={{fontSize: '25px'}}>{item.name}</span>
            </div>
            <div>
              <span>
                trashCollectionSize: <b>{item.trashCollectionSize}</b>
              </span>
            </div>
            <div>
              <span>
                trashLeftSize: <b>{item.trashLeftSize}</b>
              </span>
            </div>
            <div>
              {item.connectionWithRecycle.length > 0 && <b>connections with recycle:</b>}
              {item.connectionWithRecycle.map((con) => {
                return (
                  <div>
                    <div>
                      <div>
                        <b>
                          ({con.recyclePoint.name}) - {con.distance} miles
                        </b>
                        <button onClick={() => disconnectWithRecyclePoint(con.id)}>disconnect</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <button onClick={() => openUpdateModal(item)}>update</button>
            <button onClick={() => deleteCollectionPoint(item.id)}>delete</button>
          </div>
        )
      })}
      {modal.opened && modal.mode === 'post' && (
        <Modal onModalClose={onModalClose}>
          <div>
            <span>add collection point</span>
            <div>
              <div>
                <label htmlFor='collectionPointName'>collection point name</label>
                <input
                  name='collectionPointName'
                  onChange={(e) => setCurrentCollectionPoint({name: e.target.value})}
                  value={currentCollectionPoint.name}
                />
              </div>
              <div>
                <label htmlFor='collectionPointTrashSize'>collection point trashSize</label>
                <input
                  name='collectionPointTrashSize'
                  onChange={(e) => setCurrentCollectionPoint({trashCollectionSize: Number(e.target.value)})}
                  value={currentCollectionPoint.trashCollectionSize}
                />
              </div>
              <div>
                <label htmlFor='collectionPointCityId'>collection point cityId</label>
                <input
                  name='collectionPointCityId'
                  onChange={(e) =>
                    setCurrentCollectionPoint({
                      city: {...currentCollectionPoint.city, id: Number(e.target.value)},
                    })
                  }
                  value={currentCollectionPoint.city.id}
                />
              </div>
              <div>
                {recyclePoints.map((item) => {
                  return (
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBlock: '10px'}}>
                      <div>
                        <div>
                          <b>name:</b> {item.name}
                        </div>
                        <div>
                          <b>trashRecycleSize:</b> {item.trashRecycleSize}
                        </div>
                      </div>
                      <div>
                        {currentCollectionPoint.connectionsWithRecycleToPost.some(
                          (con) => con.recyclePointId === item.id,
                        ) ? (
                          <b>
                            {`ready(distance ${
                              currentCollectionPoint.connectionsWithRecycleToPost.find(
                                (con) => con.recyclePointId === item.id,
                              )?.distance
                            })`}
                          </b>
                        ) : (
                          <button onClick={() => connectWithRecyclePoint(item.id)}>connect</button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <button onClick={createCollectionPoint}>add collection point</button>
          </div>
        </Modal>
      )}
      {modal.opened && modal.mode === 'patch' && (
        <Modal onModalClose={onModalClose}>
          <div>
            <span>update collection point</span>
            <div>
              <div>
                <label htmlFor='collectionPointName'>collection point name</label>
                <input
                  name='collectionPointName'
                  onChange={(e) => setCurrentCollectionPoint({name: e.target.value})}
                  value={currentCollectionPoint.name}
                />
              </div>
              <div>
                <label htmlFor='collectionPointTrashSize'>collection point trashSize</label>
                <input
                  name='collectionPointTrashSize'
                  onChange={(e) => setCurrentCollectionPoint({trashCollectionSize: Number(e.target.value)})}
                  value={currentCollectionPoint.trashCollectionSize}
                />
              </div>
              <div>
                {recyclePoints.map((item) => {
                  return (
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBlock: '10px'}}>
                      <div>
                        <div>
                          <b>name:</b> {item.name}
                        </div>
                        <div>
                          <b>trashRecycleSize:</b> {item.trashRecycleSize}
                        </div>
                      </div>
                      <div>
                        {currentCollectionPoint.connectionWithRecycle.some(
                          (con) => con.recyclePoint.id === item.id,
                        ) ? (
                          <div>
                            <span>connected</span>
                            <button
                              onClick={() =>
                                disconnectWithRecyclePoint(
                                  item.connectionWithCollection.find(
                                    (con) => con.collectionPoint.id === currentCollectionPoint.id,
                                  )!.id,
                                )
                              }
                            >
                              disconnect
                            </button>
                          </div>
                        ) : currentCollectionPoint.connectionsWithRecycleToPost.some(
                            (con) => con.recyclePointId === item.id,
                          ) ? (
                          <b>
                            {`ready(distance ${
                              currentCollectionPoint.connectionsWithRecycleToPost.find(
                                (con) => con.recyclePointId === item.id,
                              )?.distance
                            })`}
                          </b>
                        ) : (
                          <button onClick={() => connectWithRecyclePoint(item.id)}>connect</button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <button onClick={updateCollectionPoint}>update collection point</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default CollectionPoints
