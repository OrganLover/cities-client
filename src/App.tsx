import './App.css'
import {Routes, Route} from 'react-router-dom'
import CitiesContainer from './components/Cities/CitiesContainer'
import RecyclePointsContainer from './components/RecyclePoints/RecyclePointsContainer'
import CollectionPointsContainer from './components/CollectionPoints/CollectionPointsContainer'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<CitiesContainer />} />
        <Route path='cities' element={<CitiesContainer />} />
        <Route path='recycle-points' element={<RecyclePointsContainer />} />
        <Route path='collection-points' element={<CollectionPointsContainer />} />
      </Routes>
    </div>
  )
}

export default App
