import React,{useState} from 'react'
import IconSelector from '../constants/icon_selector'
import CustomLoader from '../custom_loader'
import axios from 'axios';


function Editor(props) {
  var node = props.data;
  const [laodingStatus, setlaodingStatus] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null);
  function uploadImage(){
    if(!uploadedImage) return;
    const formData = new FormData();
    formData.append("image", uploadedImage.files[0]);
    setlaodingStatus(true);
    axios.post('image',formData)
    .then(res => {
      setlaodingStatus(false);
      node.src = res.data;
      props.onDataChanged();
    }).catch(error => {
      setlaodingStatus(false)
      alert(error.message)
    })
  }

  return (
    <div>
       <CustomLoader  show={laodingStatus} />
      <div class="col-xs-3 studioColumn " style={{padding:"30px"}}>
        <h3>{node && (node.name)}</h3>
         
         {node && (<div class="row">
          <button onClick={(e)=>{props.swapNode(true,node)}} class="col-md-6">Move up <i class="fa fa-arrow-up" aria-hidden="true"></i></button>
          <button onClick={(e)=>{props.swapNode(false,node)}} class="col-md-6">Move down <i class="fa fa-arrow-down" aria-hidden="true"></i></button>
        </div>
          )}
     
        {node && node.hasOwnProperty('title') && (
          <div class="row">
            <h5 class="col-md-12">Title</h5>
            <input value={node && node.title}  onChange={
              (e)=>{
                e.preventDefault();
                 node.title = e.currentTarget.value;
                 props.onDataChanged();
              }
            } class="col-md-10 center" rows="1" ></input>
          </div>
          )}
             <br/>
        {node && node.hasOwnProperty('description') && (
          <div class="row">
            <h5 class="col-md-12">Description</h5>
            <textarea value={node && node.description} onChange={
              (e)=>{
                e.preventDefault();
                 node.description = e.currentTarget.value
                 props.onDataChanged();
              }
            } class="col-md-10 center" rows="1" ></textarea>
          </div>
          )}
            <br/> 
            {node && node.hasOwnProperty('color') && (
          <div class="row">
          <h5 class="col-md-12">Color</h5>
          <input value={node.color} class="col-md-10 center" type="color"  onChange={
              (e)=>{
                e.preventDefault();
                 node.color = e.currentTarget.value
                 props.onDataChanged();
              }
            } />
            <button   onClick={
              (e)=>{
                e.preventDefault();
                 node.color = null
                 props.onDataChanged();
              }
            }   class="col-md-10 center" >Use theme background</button>
          </div>
          )}
       {node && node.hasOwnProperty('priceList') && (
          <div class="row">
          <h5 class="col-md-12">price List</h5>
             {node.priceList.map((item,index)=>{
             return ( 
              <div>
              <h6>
               <div class="col-md-12">
                 <span class="col-md-3"> Item Name </span>
              <textarea rows="2"  value={ item.content} class="col-md-9" onChange={(e)=>{
                item.content = e.currentTarget.value
                props.onDataChanged();
               }} />
               </div>
               <div class="col-md-12">
                   <span class="col-md-3"> Price </span>
                   <input value={ item.price} type="number" class="col-md-5" onChange={(e)=>{
                        item.price = e.currentTarget.value
                        props.onDataChanged();
                      }} />
                   <a href='#' class="col-md-4 " onClick={(e)=>{
                     e.preventDefault();
                     node.priceList.splice(index,1);
                     props.onDataChanged();
                   }}><span class="text-danger"> remove </span></a>
               </div>  </h6>
               </div>)
             })}
             <br/>
            <button class="pull-right" onClick={(e)=>{
              node.priceList.push({content:"",price:""});
              props.onDataChanged();
            }
            }>ADD+</button>
          </div>
          )}
         <br/>
         {node && node.hasOwnProperty('itemsList') && (
          <div class="row">
          <h5 class="col-md-12">footer items</h5>
             {node.itemsList.map((item,index)=>{
             return ( 
              <div>
               <div class="col-md-12">
                   <span class="col-md-2"> Icon </span>
                   <div  class="col-md-10">
                         <IconSelector  onItemSelected={(v)=>{
                                item.icon = v
                                props.onDataChanged();
                         }} />
                         </div>
               </div>  
               <div class="col-md-12">
                 <span class="col-md-2"> Item </span>
              <textarea rows="2"  value={ item.content} class="col-md-8" onChange={(e)=>{
                item.content = e.currentTarget.value
                props.onDataChanged();
               }} />
                <a href='#' class="col-md-2" onClick={(e)=>{
                     e.preventDefault();
                     node.itemsList.splice(index,1);
                     props.onDataChanged();
                   }}><span class="text-danger"> remove </span></a>
               </div>
                <br/>
                <hr/>
               </div>)
             })}
             <br/>
            <button class="pull-right" onClick={(e)=>{
              node.itemsList.push({content:"",icon:""});
              props.onDataChanged();
            }
            }>ADD+</button>
          </div>
          )}
       <br/>
       {node && node.hasOwnProperty('src') && (
          <div class="row">
            <input onChange={(e)=>{setUploadedImage(e.target)}} type="file" class="col-md-10 center"></input>
            <br/>      <br/>
            <button class="col-md-10 center" onClick={(e)=>{uploadImage()}}>UPLOAD</button>
            <br/>
            <h5 class="col-md-12">URL</h5>
             <br/>
            <input placeholder="add image url" value={node.src} onChange={(e)=>{e.preventDefault();node.src =e.currentTarget.value;props.onDataChanged();}}
             type="text" class="col-md-10 center"></input>
             <br/>
          </div>
          )}
             <br/>
      </div>
   </div>
  )
}
export default Editor;



{/* 

<div class="row">
<h5 class="col-md-6 center">font size</h5>
<input class="col-md-6 center" type="number" max="100" min="1" />
</div>
<br/>
<div class="row">
<h5 class="col-md-6">order</h5>
<h5 class="col-md-6">2</h5>
</div>
<div class="row">
<input type="range" min="1" max="10" value="50"  id="myRange" />
</div>
<br/>
<br/>
<div class="row">
<select class="col-md-12" >
  <option value="">FONT FAMILY</option>
  <option value="dog">FONT 1</option>
  <option value="cat">FONT 2</option>
  <option value="hamster">FONT 3</option>
  <option value="parrot">FONT 4</option>
  <option value="spider">FONT 5</option>
  <option value="goldfish">FONT 6</option>
</select>
</div>
<br/>
<div class="row">
<h5 class="col-md-12">background image</h5>
</div>
<div class="row" >
<input class="col-md-10 center" type="file" />
</div>
<br/> */}