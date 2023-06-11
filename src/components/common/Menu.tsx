import {NavLink, useLocation} from 'react-router-dom'

function Menu() {
  const {pathname} = useLocation()
  console.log(pathname)
  const urlArr = ['cities', 'collection-points', 'recycle-points']

  return (
    <div style={{position: 'fixed'}}>
      {urlArr.map((url) => {
        return <div>{pathname === `/${url}` ? <b>{url}</b> : <NavLink to={`/${url}`}>{url}</NavLink>}</div>
      })}
    </div>
  )
}

export default Menu
