import {useState} from 'react'
import { useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { sortUsers , searchUsers } from './usersSlice';

function SearchAndSort() {
    
    const[searchParams,setSearchParams] = useSearchParams();
    const [searchquery , setSearchquery] = useState('')  
    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event ) => {
        console.log(event.target.value)
        if(event.target.value === 'id'){
        dispatch(sortUsers({sortBy : event.target.value}))
        }else{
            dispatch(sortUsers({sortBy : 'first_name' , order : event.target.value}))
         }
         setSelectedValue(event.target.value)
      };

      function handleSearchChange(event) {
        const query = event.target.value; // Get the current input value
        setSearchquery(query); // Update the state
        dispatch(searchUsers(query)); // Dispatch the action using the updated value
      }
      

  return (
    <div className='flex flex-col md:flex-row gap-x-4 gap-y-4'>
    <div className=' h-8 bg-white shadow-md w-52 md:w-64'>
        <input className=' px-2 h-full outline-none w-48 md:w-56  ' placeholder='search' value={searchquery}  onChange={handleSearchChange}/>
        <i className="fa-solid fa-magnifying-glass "></i>
    </div>
    <select className='outline-none bg-[#fdcb69] rounded-lg px-4 text-[#003032] shadow-lg w-[150px] py-2 md:py-0' value={selectedValue} onChange={handleChange}>
    <option value="id" >
    Sort by id
  </option>
   <option value="A-Z" className='bg-[#fdcb69] '>A-Z</option>
         <option value="Z-A" >Z-A</option>
    </select>
        </div>    
)
}

export default SearchAndSort