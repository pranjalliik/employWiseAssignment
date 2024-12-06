import  {useState} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { ThreeDots } from 'react-loader-spinner'
import { updateUser } from './usersSlice'
function EditUser({user}) {

    const[fname , setFname] = useState(user.first_name)
    const[lname , setLname] = useState(user.last_name)
    const[email,setEmail] = useState(user.email)
     

    const dispatch = useDispatch()
    const{updateStatus , updateError} = useSelector((state)=>state.users)


    function handleUpdate(){
        
        if(fname == user.first_name && lname == user.last_name){
            return;
        }
   let body ={}
        if(fname != user.first_name){
            body.first_name = fname
        }
        if(lname != user.last_name){
            body.last_name = lname 
        }
        
        dispatch(updateUser({id : user.id , body}))

         }


  return (
    <div className='bg-gray-200 pb-8 cursor-default'>
        <div className='bg-[#003032] py-6 relative '>
        <img src={user.avatar} className='h-24 w-24 rounded-full absolute left-8 top-1 border border-white border-4'/>
        </div>

        <div className='pt-16 flex flex-col mx-3 gap-y-4'>
            <div className='flex justify-between flex-col gap-y-3'>
                <div className='text-lg font-semibold'>Name</div>
                <div className='flex flex-col gap-y-2'><input className='rounded-lg shadow-lg px-2 h-8 outline-none' placeholder='firstname' value={fname} onChange={(e)=>setFname(e.target.value)} /><input className='rounded-lg h-8 px-2 shadow-lg outline-none' placeholder='lastname' value={lname} onChange={(e)=>setLname(e.target.value)}/></div>
            </div>

            <div className='flex justify-between flex-col gap-y-3'>
                <div className='text-lg font-semibold'>Email</div>
             <input className='rounded-lg shadow-lg px-2 h-8 outline-none' placeholder='email' value={email}  readOnly="readonly"/>
            </div>

            <div className='w-40 text-center rounded-lg py-2 bg-black text-white' onClick={handleUpdate}>Update</div>


            { updateStatus == 'loading' && <ThreeDots
      
      color="#000000" // Change color of loader
      height={10} // Set height of loader
      width={100} // Set width of loader
    /> }
     {updateError &&<div className='text-gray-600' >Cannot update user at the moment</div>}
     {updateStatus == 'success' && <div className='text-gray-600' >User Updated Sucessfully</div> }
        </div>
    </div>
  )
}

export default EditUser