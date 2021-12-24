import React from 'react'
import {actions,nodeTypes } from  '../reducers/studio_reducer'

function MenuPreview(props) {
  var nodes = props.data
  return (
 <div class="col-xs-6" id="menuPage" >
   <div className={props.activeThemeClass} >
        <ul>
        {nodes.map((item,index)=>{
          if(item.type == nodeTypes.header)
          return  (   <li className={props.selectedNodeindex==index && "selectedItem"}>
            <div class="headerSection" style={{background:item.color}}>
              <h1>{item.title}</h1>
              <h6>{item.description}</h6>
            </div>
          </li>)
          else if(item.type == nodeTypes.image)
          return  (        <li className={props.selectedNodeindex==index && "selectedItem"}>
           {item.src && (<div class="imageSection" style={{backgroundImage:`url(${item.src})`}}>
              <h1>{item.title}</h1>
            </div>)} 
            {!item.src && (<div class="imageSection" style={{backgroundImage:`url("../../../assets/images/imageuploader.jpg")`}}>
              <h1>{item.title}</h1>
            </div>)} 
         </li>)
           else if(item.type == nodeTypes.items)
           return  ( <li className={props.selectedNodeindex==index && "selectedItem"}>
                             <h2> {item && item.title}</h2>
                             <div class="itemSection">
                                 <ul>
                                    {item && item.priceList.map((r)=>{
                                      return        <li> <p>{r.content}</p> <span>{r.price}</span> </li> 
                                    })}
                                   </ul> 
                               </div>
                        </li>)
            else if(item.type == nodeTypes.footer)
                           return  (         
                              <li className={props.selectedNodeindex==index && "selectedItem"}>
                                  <h2> {item && item.title}</h2>
                                <div class="footerSection">
                                   <ul>
                                   {item && item.itemsList.map((r)=>{
                                      return  <li> <i class={"fa "+ r.icon} aria-hidden="true"></i> <h6>{r.content}</h6></li>  
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
export default MenuPreview;
