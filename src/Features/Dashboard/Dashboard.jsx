import  {Fragment} from 'react'
import Header from './Header'
import UserList from './UserList'
function Dashboard() {
  return (
    <Fragment><Header/>
    <UserList/>
    </Fragment>
  )
}

export default Dashboard