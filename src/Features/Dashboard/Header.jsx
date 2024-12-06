import { logout } from '../Authentication/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

  const signout = async ()=>{
   await  dispatch(logout())
   navigate('/')
  }

  return (
    <div className='bg-[#003032] text-white py-6 flex justify-between px-2 md:px-10 cursor-default'>
        <div className='font-semibold text-xl'>ManageMate </div>
        <i className="fa-solid fa-right-from-bracket text-2xl hover:text-yellow-400" onClick={signout}></i>
    </div>
  )
}

export default Header