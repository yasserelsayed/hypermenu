import React,{ useState } from 'react'
import Header from './header'
import Footer from './footer'
import { Link,useNavigate  } from "react-router-dom";
import axios from 'axios';
import CustomLoader from '../custom_loader'

function emailIsValid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Register (props) {
   const [laodingStatus,setlaodingStatus] = useState(false)
    const navigate  = useNavigate()
    const [formState, setFormState] = useState({name:"",nameError:"",email:"",emailError:"",password:"",passwordError:"",password_confirmation:"",password_confirmationError:""});
    const objErrors = {name:"The name field is required",
                   email:"Valid email is required.",
                   password:"The password field is required.",
                   password_confirmation: "The password confirmation does not match."}
      function submit(){
        let hasError = false
         if(formState.name.length == 0){  
           formState.nameError = objErrors.name;
           hasError = true;
         }else formState.nameError = ""
         if(formState.email.length == 0 || !emailIsValid(formState.email.toLowerCase())){ 
           formState.emailError=objErrors.email;
           hasError = true;
         }else formState.emailError = "" 
         if(formState.password.length == 0){ formState.passwordError=objErrors.password;
          hasError = true;
         }else formState.passwordError = "" 
         if(!hasError && formState.password_confirmation != formState.password){
           formState.password_confirmationError = objErrors.password_confirmation ;
           hasError = true;
          }  else formState.password_confirmationError = "" 
         if(hasError)
         setFormState({...formState})
         if(!hasError){
          setlaodingStatus(true)
        axios.post(`register`,formState)
        .then(res => {
          alert("New account registered successfully")
          navigate("/login")
        }).catch(error => {
          setlaodingStatus(false)
           let errors =  error.response.data.errors;
           if(errors.hasOwnProperty("name")) formState.nameError = errors.name 
           else formState.nameError = "" 
           if(errors.hasOwnProperty("email")) formState.emailError=errors.email 
           else formState.emailError = "" 
           if(errors.hasOwnProperty("password"))  formState.passwordError=errors.password
           else formState.passwordHasError = ""

           if(errors.hasOwnProperty("password_confirmation")) formState.password_confirmationError = formState.password_confirmation 
           else formState.password_confirmationError = "" 
           setFormState({...formState})
       })
      }
      
      }

  return(

    <div>
<CustomLoader show={laodingStatus} />
<Header/>

<div class="section-container">
    <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <form>
                        <fieldset>
                          <div class="form-group">
                            <label for="disabledTextInput">Entity Name</label>
                            <input type="text" onChange={e=>{setFormState({...formState,"name":e.currentTarget.value})}}  class="form-control" placeholder="Entity Name" />
                            {formState.nameError.length > 0 &&<p class="text-danger">{formState.nameError}</p>  }               
                          </div>
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
                          <div class="form-group">
                            <label for="disabledTextInput">Confirm Password</label>
                            <input type="password" onChange={e=>{setFormState({...formState,"password_confirmation":e.currentTarget.value})}} class="form-control" placeholder="Confirm Password" />
                            {formState.password_confirmationError.length > 0  &&<p class="text-danger">{formState.password_confirmationError}</p>  } 
                          </div>
                          <a className="btn btn-primary" onClick={e=>{
                            e.preventDefault();
                             submit();
                          }
                          } >Sign up</a> &nbsp; &nbsp;
                          <Link  to="/login"> Already have account</Link>
                        </fieldset>
                      </form>

                </div>
            </div>
    </div>
</div>

<Footer/>
    </div>
  );
}
