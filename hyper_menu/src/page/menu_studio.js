import React, { useState, useEffect,useReducer } from 'react'
import CustomLoader from '../custom_loader'
import axios from 'axios';
import {useParams} from "react-router-dom";
import { useCookies } from 'react-cookie'
import StudioSections from './studiosections'
import MenuPreview from './menupreview'
import Editor from './editor'
import {reducer,setReducerStateUpdated,getReducerStateUpdated } from  '../reducers/studio_reducer'


export default function MenuStudio() {
 const [state, dispatch] = useReducer(reducer, []);
 const [cookies, setCookie] = useCookies(['access_token'])
 const [laodingStatus, setlaodingStatus] = useState(false)
 const [activeNodeIndex, setActiveNodeIndex] = useState(0)
 var [activePageIndex, setActivePageIndex] = useState(0)
 const [pagesList, setPagesList] = useState([])
 const [themesList, setThemesList] = useState([])
 const [selectedThemeClass, setSelectedThemeClass] = useState("")
 const {menuId,menuName,templateClass} = useParams()
 var   pageTitle = ""



 function removeMenuPage(){
  if(!pagesList) return;
   if(pagesList.length <= 1){
      alert("This operation not allowed if total pages less that 2 pages")
      return
   }
   setlaodingStatus(true)
   var $id = pagesList[activePageIndex].id;
   activePageIndex = 0;
  axios.delete('page/'+$id)
  .then(res => {
    getMenuPages()
  }).catch(error => {
    setlaodingStatus(false)
    alert(error.message)
  })
}

function swapNodes($up,node){
  if(!state) return
  var indx = state.indexOf(node)
  if(($up && indx==0) || (!$up && indx==state.length-1)) return
  var current = state[indx] 
   if($up){
    state[indx] = state[indx-1]  
    state[indx-1] = current  
    setActiveNodeIndex(indx-1)          
    }else{
      state[indx] = state[indx+1]  
      state[indx+1] = current  
      setActiveNodeIndex(indx+1)   
    }
}

function updateMenuPage(){
  var $name = pageTitle
  if(!$name)
  $name = pagesList[activePageIndex].name
   setlaodingStatus(true)
   axios.put('menu/'+menuId,{template_class:selectedThemeClass})
   .then(res => {
   }).catch(error => {
     alert(error.message)
   })
  axios.put('page/'+pagesList[activePageIndex].id,{name:$name,html_sections:JSON.stringify(state)})
  .then(res => {
    getMenuPages()
  }).catch(error => {
    setlaodingStatus(false)
    alert(error.message)
  })
}

function onNodeChange(){
  dispatch({type:"init",data:state})
  setReducerStateUpdated(true)
}


function getMenuPages(){
  axios.get('page?menu_id='+menuId)
  .then(res => {
    pageTitle = null
    setlaodingStatus(false)
    setPagesList(res.data)
    setReducerStateUpdated(false)
    if(res.data[activePageIndex].html_sections)
         dispatch({type:"init",data:JSON.parse(res.data[activePageIndex].html_sections)})
    else dispatch({type:"init",data:[]})
  }).catch(error => {
    setlaodingStatus(false)
    alert(error.message)
  })
}

 function submitNewPage() {
  if (pageTitle.length == 0) 
       alert("Page title required")
  else{
    setlaodingStatus(true)
    axios.post(`page`, {name:pageTitle,menu_id:menuId})
      .then(res => {
        pageTitle = null
        updateMenuPage()
      }).catch(error => {
        setlaodingStatus(false)
        alert(error.response.data.message);
      })
  } 
}


function getThemes(){
  axios.get('themes')
  .then(res => {
    setThemesList(res.data)
  }).catch(error => {
    alert(error.message)
  })
}

useEffect(() => {
  axios.defaults.headers.common['Authorization'] = cookies.access_token;
   setSelectedThemeClass(templateClass)
  getMenuPages();
  getThemes();
}, [])
  return (
    <div class="studio">
          <CustomLoader show={laodingStatus} />
            <header>
        <nav class="navbar  navbar-fixed-top navbar-default">
          <div class="container">
            <div class="navbar-header">
              <a class="navbar-brand" href="./index.html" title="">
                <img width="200px" src="../../assets/images/icon.svg" class="navbar-logo-img" alt="" />
              </a>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse-uarr">
        <ul class="nav navbar-nav navbar-right">
          <li> <a href="#"> <span class="text-primary" onClick={(e)=>{ e.preventDefault(); updateMenuPage();}}>Save Page <i class="fa fa-floppy-o" aria-hidden="true"></i></span> </a></li>
          <li> <a ><span>|</span></a></li>
          <li> <a href="#" onClick={(e)=>{ e.preventDefault(); removeMenuPage();}}> <span class="text-warning">Remove Page <i class="fa fa-trash" aria-hidden="true"></i></span></a></li>
          <li> <a ><span>&nbsp; &nbsp;</span></a></li>
          <li> <a ><span class="text-muted"><input type="text"   onChange={(e)=>{pageTitle = e.currentTarget.value}}  placeholder={pagesList[activePageIndex] && pagesList[activePageIndex].name} /> / {menuName}</span></a></li>
        </ul>
      </div>
          </div>
        </nav>
      </header>
  <div class="row templates" >
  {themesList.map((item)=>{
                  return ( <a onClick={(e)=>{ e.preventDefault(); setSelectedThemeClass(item.class);}}><img class={item.class == selectedThemeClass && "selectedItem"} width="80" height="80" src={item.thumbnail}/><h6>{item.name}</h6></a>
                  )
                })}
  </div>
 { getReducerStateUpdated() && (<div class="row">
    <div class="col-xs-12">
     <center><b><small class="text-danger">UNSAVED CHANGES PLEASE PRESS SAVE PAGE TO SAVE YOUR CHANGES</small></b></center> 
      </div>
   </div>)}
  <div class="row">
    <div class="col-xs-12">
    <StudioSections data={state} onDataChanged={onNodeChange} selectActiveNode={setActiveNodeIndex}  updateNodes={(action)=>{dispatch(action)}} />
    <MenuPreview selectedNodeindex = {activeNodeIndex} data={state} activeThemeClass={selectedThemeClass}  />
    <Editor  swapNode={swapNodes} onDataChanged={onNodeChange} data={state[activeNodeIndex]}   />
    </div>
  </div>
 

  <footer class="studioFooter" >

      <div class="tabs">
      <input type="text"  onChange={(e) => { pageTitle = e.currentTarget.value}} ></input>
      <button onClick={e => {
                  e.preventDefault();
                  submitNewPage()
                  }}> NEW <i class="fa fa-plus-circle" aria-hidden="true"></i></button>
                      {pagesList.map((item,index) => {
                        if(index==activePageIndex)
                             return  <a href="#" class="selectedPageTab">{item.name}</a>
                       else  return (<a href="#" onClick={e => {
                        updateMenuPage();
                        e.preventDefault();
                        setActivePageIndex(index);
                        activePageIndex = index;
                        }}>{item.name}</a>)
                      })}
    </div>
  </footer> 
    </div>
  );
}