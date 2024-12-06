import  { useState } from "react";
import "./AuthForm.css";
import { useDispatch , useSelector} from "react-redux";
import { signin , resetstate } from "./userSlice";
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";

const AuthForm = () => {

 const {loginstatus , loginerror} = useSelector((state)=> state.user)
const dispatch = useDispatch()


 const [credentials, setCredentials] = useState({
    email : 'eve.holt@reqres.in',
    password: 'cityslicka',
    
  });
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(credentials)
    dispatch(signin({email : credentials.email , password : credentials.password}))

  }

if(loginstatus === 'success'){
    dispatch(resetstate())
    navigate("/dashboard");
}


  return (
    <>
    <div className="container-1">
     <div className="forms-container-1">
       <div className="signin-signup">
         <form action="#" method="post" className="sign-in-form">
           <h2 className="title">Sign in</h2>
           <div className="input-field">
             <i className="fas fa-user"></i>
             <input
               type="text"
               name="email"
               placeholder="Email"    
               value={credentials.email}
               onChange={handleChange}    
             />
           </div>
           <div className="input-field">
             <i className="fas fa-lock"></i>
             <input
               type="password"
               name="password"
               placeholder="Password"
               value={credentials.password}
                 onChange={handleChange}
             />
           </div>
           <button type="button" className="btn1 solid"  onClick={handleSubmit}>
             Login
           </button>

          { loginstatus && <ThreeDots
      
      color="#000000" // Change color of loader
      height={10} // Set height of loader
      width={100} // Set width of loader
    /> }
    { loginerror === 'loading' &&
    <div>{loginerror}</div>
        }    </form>

         
       </div>
     </div>

     <div className="panels-container-1">
       <div className="panel left-panel">
         <div className="content">
           <h3>Welcome to ManageMate User Management</h3>
           <p>
          
           </p>
         </div>
       </div>
     </div>
   </div>
   </>
 )
};
export default AuthForm;