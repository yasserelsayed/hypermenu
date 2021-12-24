import React from 'react'
import {actions,nodeTypes } from  '../reducers/studio_reducer'

 function StudioSections(props) {
  var nodes = props.data
  var addNodeHeader = (nodeNmae)=>{
    props.updateNodes({type:actions.addHeader,data:{name:nodeNmae}})
  }
  var addImage = (nodeName)=>{
    props.updateNodes({type:actions.addImage,data:{name:nodeName}})
  }
  var addFooter = (nodeName)=>{
    props.updateNodes({type:actions.addFooter,data:{name:nodeName}})
  }

  var addMenuItems = (nodeName)=>{
    props.updateNodes({type:actions.addItems,data:{name:nodeName}})
  }

  var removeNode = ($id)=>{
    props.updateNodes({type:actions.removeNode,data:{id:$id}})
  }

  return (
    <div>
       <div class="col-xs-3 studioColumn">
        <a href="#" onClick={(e)=>{e.preventDefault();addNodeHeader('new header');}}><h4 class="sectionHeader" id="addHeader">Add Header section &nbsp; <i class="fa fa-plus-circle" aria-hidden="true"></i></h4></a>
        {nodes.map((item,index)=>{
          if(item.type == nodeTypes.header)
          return  (  <h6 class="sectionItem"> <input type="text"  onChange={(e)=>{item.name = e.currentTarget.value; props.onDataChanged()}} placeholder={item.name} /> &nbsp;
           <i class="fa fa-minus-circle fa-lg" onClick={(e)=>{removeNode(item.id)}} aria-hidden="true"></i>
          &nbsp; &nbsp; <i  onClick={(e)=>{ props.selectActiveNode(index)}} class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
          </h6> )
        })}
       <a href="#" onClick={(e)=>{e.preventDefault();addImage('new image');}}><h4 class="sectionHeader" id="addHeader">Add Image section &nbsp; <i class="fa fa-plus-circle" aria-hidden="true"></i></h4></a>
        {nodes.map((item,index)=>{
          if(item.type == nodeTypes.image)
          return  (  <h6 class="sectionItem"> <input type="text"  onChange={(e)=>{item.name = e.currentTarget.value; props.onDataChanged()}} placeholder={item.name} /> &nbsp;
           <i class="fa fa-minus-circle fa-lg" onClick={(e)=>{removeNode(item.id)}} aria-hidden="true"></i>
          &nbsp; &nbsp; <i  onClick={(e)=>{props.selectActiveNode(index)}} class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
          </h6> )
        })}
        <a href="#" onClick={(e)=>{e.preventDefault();addMenuItems('New items list');}}><h4 class="sectionHeader" id="addHeader">Add Menu items section &nbsp; <i class="fa fa-plus-circle" aria-hidden="true"></i></h4></a>
        {nodes.map((item,index)=>{
          if(item.type == nodeTypes.items)
          return  (  <h6 class="sectionItem"> <input type="text"  onChange={(e)=>{item.name = e.currentTarget.value; props.onDataChanged()}} placeholder={item.name} /> &nbsp;
           <i class="fa fa-minus-circle fa-lg" onClick={(e)=>{removeNode(item.id)}} aria-hidden="true"></i>
          &nbsp; &nbsp; <i  onClick={(e)=>{props.selectActiveNode(index)}} class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
          </h6> )
        })}
         <a href="#" onClick={(e)=>{e.preventDefault();addFooter('new footer');}}><h4 class="sectionHeader" id="addHeader">Add Footer section &nbsp; <i class="fa fa-plus-circle" aria-hidden="true"></i></h4></a>
        {nodes.map((item,index)=>{
          if(item.type == nodeTypes.footer)
          return  (  <h6 class="sectionItem"> <input type="text"  onChange={(e)=>{item.name = e.currentTarget.value; props.onDataChanged()}} placeholder={item.name} /> &nbsp;
           <i class="fa fa-minus-circle fa-lg" onClick={(e)=>{removeNode(item.id)}} aria-hidden="true"></i>
          &nbsp; &nbsp; <i  onClick={(e)=>{props.selectActiveNode(index)}} class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
          </h6> )
        })}
      </div>
    </div>
  );
}

export default StudioSections;
