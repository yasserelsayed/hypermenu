import React,{ useState } from 'react'
import Header from './header'
import Footer from './footer'
import CustomLoader from '../custom_loader'
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCookies } from 'react-cookie'


function emailIsValid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
export default function Login(props){
  const [formState, setFormState] = useState({email:"",emailError:"",password:"",passwordError:""});
  const [laodingStatus,setlaodingStatus] = useState(false)
  const navigate  = useNavigate()
  const objErrors = {
  email:"Valid email is required.",
  password:"The password field is required."}
  const [cookies, setCookie] = useCookies(['access_token'])
  function submit(){
  
    let hasError = false
     if(formState.email.length == 0 || !emailIsValid(formState.email.toLowerCase())){ 
       formState.emailError=objErrors.email;
       hasError = true;
     }else formState.emailError = "" 
     if(formState.password.length == 0){ formState.passwordError=objErrors.password;
      hasError = true;
     }else formState.passwordError = "" 
     if(hasError)
     setFormState({...formState})
     if(!hasError){
       setlaodingStatus(true)
      axios.post(`login`,formState)
      .then(res => {
       setlaodingStatus(false)
       setCookie('access_token', "Bearer "+res.data.token)
        axios.defaults.headers.common['Authorization'] = cookies.access_token;
        console.log(res.data.token)
        navigate("/dashboard")
      }).catch(error => {
        setlaodingStatus(false)
       let errors =  error.response.data.errors;
       if(errors.hasOwnProperty("email")) formState.emailError=errors.email 
       else formState.emailError = "" 
       if(errors.hasOwnProperty("password"))  formState.passwordError=errors.password
       else formState.passwordHasError = ""
       setFormState({...formState})
   })
  }
  }

  return(  <div>

<CustomLoader show={laodingStatus} />
<Header/>
<div class="section-container">
    <div class="container">
            <div class="row">
                <div class="col-xs-12">

                    <form>
                        <fieldset>
                        <div class="form-group">
                            <label for="disabledTextInput">Email</label>
                            <input type="text" onChange={e=>{setFormState({...formState,"email":e.currentTarget.value})}} class="form-control" placeholder="Email" />
                            {formState.emailError.length > 0 &&<p class="text-danger">{formState.emailError}</p>  } 
                          </div>
                          <div class="form-group">
                            <label for="disabledTextInput">Password</label>
                            <input type="password" onChange={e=>{setFormState({...formState,"password":e.currentTarget.value})}} class="form-control" placeholder="Password" />
                            {formState.passwordError.length > 0  &&<p class="text-danger">{formState.passwordError}</p>  } 
                          </div>
                         <a className="btn btn-primary" onClick={e=>{
                            e.preventDefault();
                             submit();
                          }
                          } >Login</a> &nbsp; &nbsp;
                         <Link  to="/register">Sign up</Link>
                        </fieldset>
                      </form>

                </div>
            </div>
    </div>
</div>
<Footer/>
    </div>
)
}

