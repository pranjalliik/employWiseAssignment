import  {useState , useEffect , Fragment} from 'react'
import { useMediaQuery } from 'react-responsive';
import { useSearchParams } from "react-router-dom";
import { getUsers , resetusers , resetUpdate , resetDel} from './usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import SearchAndSort from './SearchAndSort';
import { Model } from '../Model';
import './../../App.css'
import EditUser from './EditUser';
import DelUser from './DelUser';

function UserList() {
    const [query, setQuery] = useState('');
    const[searchParams,setSearchParams] = useSearchParams();
    let pageno = searchParams.get('page');
    const[editModel , setEditModel] = useState(false)
    const[delModel , setDelModel] = useState(false)
    const [currUser , setCurrUser] = useState('')
    const dispatch = useDispatch()
   const {status , users , filteredUsers } = useSelector((state)=>state.users)
   const totalPages = 2
    useEffect(()=>{

        if(pageno){

            if(Number(pageno)>totalPages){
               searchParams.set('page', '2' );
               setSearchParams(searchParams);
            }else if(Number(pageno) < 1){
                searchParams.set('page', 1 );
                setSearchParams(searchParams);
            }else{
                dispatch(getUsers({pageno}))
            }
        }else{
            dispatch(getUsers({pageno : 1}))
        }
    },[pageno])

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 968px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 967px)' });

    function nextPage(pagenum){
        
        if(pagenum> totalPages || pagenum <= 0){
          return;
        }else{
            dispatch(resetusers())

            searchParams.set('page', pagenum );
            setSearchParams(searchParams);

        }
    }

 function filterUser(){
  return  users.filter(user =>
        filteredUsers.some(filteredUser => filteredUser.id === user.id)
      );

 }

const openEditModel = (user)=>{
    setCurrUser(user)
    dispatch(resetUpdate())
    setEditModel(true)
}

const opendelModel = (user)=>{
    setCurrUser(user)

    dispatch(resetDel())

    setDelModel(true)
}

  return (
    <Fragment>
    <div className='bg-[#f4f5f7] pb-10 '>
        <div className='flex flex-col md:flex-row justify-around p-2 pt-10 gap-y-8 items-center '>
            <div className='font-bold text-3xl'>User Management</div> 
            <SearchAndSort/>
                    
             </div>
             {
                status === 'loading' ?
                <div className='flex justify-center mt-10'>
                <ThreeDots
      
      color="#000000" // Change color of loader
      height={10} // Set height of loader
      width={100} // Set width of loader
              />  </div> : 
                status === 'success' ?
            <Fragment>
          { isDesktopOrLaptop&&
             <div className='flex justify-center  mt-16 '>
                <table className='shadow-lg  w-full md:w-3/4 mx-3 bg-white    rounded-lg '>
                    <tbody className=''>
                        <tr className='border border border-gray-300 border-rounded-lg'>
                        <th className='text-left p-3'>Id</th>
                            <th className='text-left p-3'>Name</th>
                            <th className=' text-left p-3'>Email</th>
                            <th className='text-left p-3'>Edit</th>
                            <th className='text-left p-3 '>Delete</th>
                        </tr>
                     {  filterUser().map((user)=>(
                             <tr className='border border border-gray-300 border-rounded-lg' key={users.id}>
                             <td className='p-2'>{user.id}</td>
                             <td className='p-2'><div className='flex items-center gap-x-3'><img src={user.avatar} className='h-16 w-16 rounded-full' /> <span>{user.first_name +' ' }{user.last_name}</span></div>  </td>
                             <td className='p-2'>{user.email}</td>
                             <td className='p-2'><span className='bg-[#e4ebf4] p-2 rounded-lg mr-4 'onClick={()=>openEditModel(user)} ><i className="fa-solid fa-pen-to-square"></i></span></td>
                             <td className='p-2'> <span className='p-2 rounded-lg bg-[#f8e9e7]' onClick={()=>opendelModel(user)}><i className="fa-solid fa-trash"></i></span></td>
                         </tr>
                     )) 
          }
                       
                    </tbody>
                </table>   
             </div>
                }

                { isMobile&&
             <div className=' flex flex-col  md:w-3/4  gap-y-5 mt-10 '>

            {  filterUser().map((user)=>(
                        <div className='shadow-lg p-3 bg-white rounded-lg mx-3' key={user.id}>
                          <div className='flex justify-between gap-x-6 md:gap-x-10'>
                            <div>
                                <img src={user.avatar} className='h-24 w-24 rounded-full'/>
                              <h1 className='font-semibold text-xl mt-2'>{user.first_name +' ' }{user.last_name}</h1> 
                            </div>
                            <div className='flex h-10 ' ><span className='bg-[#e4ebf4] p-2 rounded-lg mr-4 ' onClick={()=>openEditModel(user)}><i className="fa-solid fa-pen-to-square"></i></span>
                            <span className='p-2 rounded-lg bg-[#f8e9e7]' onClick={()=>opendelModel(user)}><i className="fa-solid fa-trash"></i></span></div>
                        </div>
                        <h2 className='mt-1 text-gray-600 break-all'>{user.email}</h2>
                        </div>
                ))}      
             </div>
               }

               <div className='flex justify-center gap-x-2 mt-6 cursor-default'>
               <div className={`rounded-full h-10 w-10 text-center pt-2 shadow-lg bg-[#003032] text-white text-lg font-semmibold  ${pageno == 1 && 'cursor-not-allowed'}`}  onClick={()=>nextPage((pageno? Number(pageno)  : 1) - 1)}>{'<'}</div>
               {  (pageno? Number(pageno)  : 1)  >1 &&  <div className=' rounded-full h-10 w-10 text-center pt-2 shadow-lg bg-white  text-lg font-semmibold' onClick={()=>nextPage((pageno? Number(pageno)  : 1) + -1)}>{(pageno? Number(pageno)  : 1) - 1 }</div>      }

                <div className=' rounded-full h-10 w-10 text-center pt-2 shadow-lg bg-[#003032] text-white text-lg font-semmibold'>{(pageno? Number(pageno)  : 1) }</div>
            {  (pageno? Number(pageno)  : 1) + 1 <= totalPages &&  <div className=' rounded-full h-10 w-10 text-center pt-2 shadow-lg bg-white text-lg font-semmibold' onClick={()=>nextPage((pageno? Number(pageno)  : 1) + 1)}>{(pageno? Number(pageno)  : 1) + 1 }</div>      }
            {   (pageno? Number(pageno)  : 1) + 2 <= totalPages &&  <div className=' rounded-full h-10 w-10 text-center pt-2 shadow-lg bg-white text-lg font-semmibold' onClick={()=>nextPage((pageno? Number(pageno)  : 1) + 2 )}>{(pageno? Number(pageno)  : 1) + 2 } </div>   }
            {   totalPages - (pageno? Number(pageno)  : 1)  >= 4 &&  <div className=' rounded-full h-10 w-10 text-center pt-2 shadow-lg bg-white text-lg font-semmibold' >...</div>   }   
            {   (pageno? Number(pageno)  : 1) + 2 < totalPages &&  <div className=' rounded-full h-10 w-10 text-center pt-2 shadow-lg bg-white text-lg font-semmibold ' onClick={()=>nextPage(totalPages)}>{totalPages}</div>   }   

                <div className={` rounded-full h-10 w-10 text-center pt-2 shadow-lg bg-[#003032] text-white text-lg font-semmibold ${pageno == totalPages && 'cursor-not-allowed'}`} onClick={()=>nextPage((pageno? Number(pageno)  : 1) + 1)}>{'>'}</div>


               </div>
               </Fragment>
               :
               <div className='flex justify-center mt-10'>Cannot display users</div>
            }
 
    </div>
    {editModel && (
  <>
    {/* Backdrop (blurred area outside the modal) */}
    <div className="backdrop" onClick={() => setEditModel(false)}></div>

    {/* Modal */}
    <Model modelState={setEditModel} >
     <EditUser user={currUser} />
    </Model>
  </>
)}

{delModel && (
  <>
    {/* Backdrop (blurred area outside the modal) */}
    <div className="backdrop" onClick={() => setDelModel(false)}></div>

    {/* Modal */}
    <Model modelState={setDelModel} >
     <DelUser  user={currUser} />
    </Model>
  </>
)}

    </Fragment>
  )
}

export default UserList