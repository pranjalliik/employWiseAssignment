import {Fragment} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { ThreeDots } from 'react-loader-spinner'
import { delUser } from './usersSlice'


function DelUser({user}) {

 const dispatch = useDispatch()
 const{delStatus , delError} = useSelector((state)=>state.users)

  function handleDel(){
    if(delStatus == 'success'){
      return;
    }
    dispatch(delUser({id : user.id}))
  }
  return(
    <div className=' mb-10 pl-2'>
         {delStatus == 'success' ? <div className='text-gray-600' >User Deleted Sucessfully</div>
         :
         <Fragment>
    <div className=' text-lg font-semibold text-center '>Are you sure you want to delete user?</div>
      <div className='flex flex-col gap-x-1 items-center'>
      <img src={user.avatar} className='h-24 w-24 rounded-full  border border-white border-4'/>
        <div className=' '> 
          <h1 className='text-center'>{user.first_name}</h1>
          <h2 className=' break-all'>{user.email}</h2>
        </div>
        <button className={`w-40 mt-4 mb-2 py-2 bg-[#003032] text-white hover:bg-black  rounded-lg ${delStatus == 'success' && 'cursor-not-allowed'}`} onClick={handleDel}>Delete</button>
        { delStatus == 'loading' && <ThreeDots
      
      color="#000000" // Change color of loader
      height={10} // Set height of loader
      width={100} // Set width of loader
    /> }
     {delError&&<div className='text-gray-600' >Cannot delete user at the moment</div>}
  
      </div>
      </Fragment>
}
    </div>
  )
}

export default DelUser