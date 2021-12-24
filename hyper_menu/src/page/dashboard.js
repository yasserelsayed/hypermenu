import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import CustomLoader from '../custom_loader'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'


export default function Dashboard() {


  const [cookies, setCookie,removeCookie] = useCookies(['access_token'])
  const [menusData, setMenusData] = useState([]);
  const [userData, setUserData] = useState({});
  const [newMenuData, setNewMenuData] = useState({ name: "", nameError: "", description: "", descriptionError: "" });
  const [laodingStatus, setlaodingStatus] = useState(false)
  const navigate  = useNavigate()
  const objErrors = {
    name: "The menu name field is required."
  }
  function remove($id){
    setlaodingStatus(true)
    axios.delete(`menu/`+$id)
      .then(res => {
        axios.get(`menu`)
        .then(res => {
          setMenusData(res.data)
          setlaodingStatus(false)
        }).catch(error => {
          setlaodingStatus(false)
          alert(error.message)
        })
      }).catch(error => {
        setlaodingStatus(false)
        alert(error.message)
      })
  }

  function logoutUser(){
    setlaodingStatus(true)
    axios.get(`logout`)
      .then(res => {
        removeCookie("access_token");
        setlaodingStatus(false)
        navigate("../login");
      }).catch(error => {
        setlaodingStatus(false)
        alert(error.message)
      })
  }

  function submit() {
    let hasError = false
    if (newMenuData.name.length == 0) {
      newMenuData.nameError = objErrors.name;
      hasError = true;
    } else newMenuData.nameError = ""
    if (hasError)
      setNewMenuData({ ...newMenuData })
    if (!hasError) {
      setlaodingStatus(true)
      axios.post(`menu`, newMenuData)
        .then(res => {
          axios.get(`menu`)
            .then(res => {
              setMenusData(res.data)
              setlaodingStatus(false)
            }).catch(error => {
              setlaodingStatus(false)
              alert(error.message)
            })
          setNewMenuData({ name: "", nameError: "", description: "", descriptionError: "" })
        }).catch(error => {
          setlaodingStatus(false)
          let errors = error.response.data.errors;
          if (errors.hasOwnProperty("name")) newMenuData.nameError = errors.name
          else newMenuData.nameError = ""
          setMenusData({ ...newMenuData })
        })
    }
  }

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = cookies.access_token;
    setlaodingStatus(true)
    axios.get(`menu`)
      .then(res => {
        setMenusData(res.data)
        setlaodingStatus(false)
      }).catch(error => {
        setlaodingStatus(false)
        alert(error.message)
      })
    axios.get(`user`)
      .then(res => {
        setUserData(res.data)
      }).catch(error => {
        alert(error.message)
      })
  }, [])

  return (
    <div>
      <CustomLoader show={laodingStatus} />
      <header>
        <nav class="navbar  navbar-fixed-top navbar-default">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle uarr collapsed" data-toggle="collapse" data-target="#navbar-collapse-uarr">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="./index.html" title="">
                <img width="200px" src="./assets/images/icon.svg" class="navbar-logo-img" alt="" />
              </a>

            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse-uarr">
              <ul class="nav navbar-nav navbar-right">
                <li>  <a > <h5 class="text-muted">{userData.name}</h5></a></li>  
                <li>  <a href="#" onClick={e=>{e.preventDefault();logoutUser(); }} > <h6 class="text-warning">Logout</h6></a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <br />
      <br />
      <br />
      <div class="container">
        <div class="row">
          <div class="col-md-7">

            <form>
              <fieldset>
                <div class="form-group">
                  <label for="disabledTextInput">Menu name</label>
                  <input type="text" value={newMenuData.name} onChange={e => { setNewMenuData({ ...newMenuData, "name": e.currentTarget.value }) }} class="form-control" placeholder="Name" />
                  {newMenuData.nameError.length > 0 && <p class="text-danger">{newMenuData.nameError}</p>}
                </div>
                <div class="form-group">
                  <label for="disabledTextInput">Description</label>
                  <textarea  value={newMenuData.description} onChange={e => { setNewMenuData({ ...newMenuData, "description": e.currentTarget.value }) }} class="form-control" />
                </div>
                <a className="btn btn-primary" onClick={e => {
                  e.preventDefault();
                  submit();
                }
                }>Save</a>

              </fieldset>
            </form>
          </div>

          <div class="col-md-5">
            <ul class="features">
              {menusData.map(item => (
                <li>
                  <h3> &nbsp;{item.name}</h3>
                  <img src={item.qr} class="col-md-4" width="100px" height="100px" />
                  <p> {item.description} &nbsp; 
                  </p>
                  <br />
                  <a href="" onClick={e => {
                  e.preventDefault();
                  navigate("/studio/"+item.id+"/"+item.name+"/"+item.template_class)
                  }}>design</a>
                  &nbsp; | &nbsp; 
                  <a href="" onClick={e => {
                  e.preventDefault();
                    navigate("/preview/"+item.id)
                  }}>view</a>
                  &nbsp; | &nbsp;
                  <a href="" onClick={e => {
                  e.preventDefault();
                  remove(item.id);
                  }}> remove</a>
                  <br/>
                </li>
              ))}

            </ul>
          </div>


        </div>
      </div>
    </div>
  );
}
