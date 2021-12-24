import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { actions, nodeTypes } from '../reducers/studio_reducer'
import CustomLoader from '../custom_loader'
import Spalsh from '../splash'

function Preview(props) {
  var nodes = []
  const [laodingStatus, setlaodingStatus] = useState(false)
  const [pagesList, setPagesList] = useState([])
  const [menu, setMenu] = useState({})
  const [activePageIndex, setActivePageIndex] = useState(0)
  const { menuId } = useParams()


  const styleWrapper = {
    header :{
      background : 'red'
    }
  }

  function getMenuPages() {
    setlaodingStatus(true)
    axios.get('/page/show?menu_id=' + menuId)
      .then(res => {
        setlaodingStatus(false)
        setPagesList(res.data)
      }).catch(error => {
        setlaodingStatus(false)
        alert(error.message)
      })
  }

  function getMenuTemplate() {
    setlaodingStatus(true)
    axios.get('/menu/'+menuId)
      .then(res => {
        setMenu(res.data)
      }).catch(error => {
        alert(error.message)
      })
  }


  useEffect(() => {
    getMenuPages();
    getMenuTemplate();
  }, [])

  if (pagesList[activePageIndex])
    nodes = JSON.parse(pagesList[activePageIndex].html_sections)
  return (
    <div>
      <CustomLoader show={laodingStatus} />
      { menu && <Spalsh selectedMenu={menu}/> }
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
      </div>
      <div class="collapse navbar-collapse" id="navbar-collapse-uarr">
        <ul class="nav navbar-nav navbar-left">
          {pagesList && pagesList.map((item,index)=>{
                 return  <li> <a href='#' onClick={(e)=>{
                   e.preventDefault();
                    setActivePageIndex(index)
                 }}>{item.name}</a></li>
          })}
       
        </ul>
      </div>
    </div>
  </nav>
</header>
      <div id="menuPage" className={menu.template_class} >
        <ul>
          {nodes && nodes.map((item) => {
            if (item.type == nodeTypes.header)
              return (<li>
                <div class="headerSection" style={{background:item.color}}>
                 <h1>{item.title}</h1>
                 <h6>{item.description}</h6>
                </div>
              </li>)
            else if (item.type == nodeTypes.image)
              return (<li>
                <div class="imageSection">
                {item.src && (<div class="imageSection" style={{backgroundImage:`url(${item.src})`}}>
              <h1>{item.title}</h1>
            </div>)} 
            {!item.src && (<div class="imageSection" style={{backgroundImage:`url("../../../assets/images/imageuploader.jpg")`}}>
              <h1>{item.title}</h1>
            </div>)} 
                </div>
              </li>)
               else if(item.type == nodeTypes.items)
               return  ( <li>
                          <h2> {item && item.title}</h2>
                                   <div class="itemSection">
                                     <ul>
                                        {item.priceList && item.priceList.map((r)=>{
                                          return        <li> <p>{r.content}</p> <span>{r.price} ₽</span> </li> 
                                        })}
                                       </ul> 
                                   </div>
                            </li>)
            else if (item.type == nodeTypes.footer)
              return (
                <li>
                  <div class="footerSection">
                    <ul>
                    {item.itemsList && item.itemsList.map((r)=>{
                    return  <li><i class={"fa "+ r.icon} aria-hidden="true"></i> <h6>{r.content}</h6></li>
                    })}
                    </ul>
                  </div>
                </li>)
          })}
        </ul>
      </div>
    </div>
  )
}
export default Preview;
