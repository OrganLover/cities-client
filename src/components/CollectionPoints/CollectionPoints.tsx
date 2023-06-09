import {ICollectionPointProps} from '../../types/collectionPointTypes'
import {Modal} from '../common/Modal'

function CollectionPoints({
  collectionPoints,
  modal,
  setModal,
  currentCollectionPoint,
  setCurrentCollectionPoint,
  recyclePoints,
  connectWithRecyclePoint,
}: ICollectionPointProps) {
  return (
    <div>
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
              <span>connections with recycle:</span>
              {item.connectionWithRecycle.map((con) => {
                return (
                  <div>
                    <div>
                      <div>
                        <b>
                          ({con.recyclePoint.name}) - {con.distance} miles
                        </b>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <button onClick={() => setModal({mode: 'patch', opened: true})}>update</button>
            <button>delete</button>
          </div>
        )
      })}
      {modal.opened && modal.mode === 'post' && (
        <Modal onModalClose={() => setModal({mode: '', opened: false})}>
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
                  onChange={(e) => setCurrentCollectionPoint({cityId: Number(e.target.value)})}
                  value={currentCollectionPoint.cityId}
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
                        <button onClick={() => connectWithRecyclePoint}>connect</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <button>add collection point</button>
          </div>
        </Modal>
      )}
      {modal.opened && modal.mode === 'patch' && (
        <Modal onModalClose={() => setModal({mode: '', opened: false})}>
          <div>
            <span>update collection point</span>
            <div>
              <label htmlFor='collectionPointName'>collection point name</label>
              <input
                name='collectionPointName'
                onChange={(e) => setCurrentCollectionPoint({name: e.target.value})}
                value={currentCollectionPoint.name}
              />
            </div>
            <button>update collection point</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default CollectionPoints
