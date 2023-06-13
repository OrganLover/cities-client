import {NavLink, useLocation} from 'react-router-dom'

function Menu() {
  const {pathname} = useLocation()
  const urlArr = ['cities', 'collection-points', 'recycle-points']

  return (
    <div style={{position: 'fixed'}}>
      {urlArr.map((url) => {
        return (
          <div key={url}>
            {pathname === `/${url}` ? <b>{url}</b> : <NavLink to={`/${url}`}>{url}</NavLink>}
          </div>
        )
      })}
    </div>
  )
}

export default Menu
