
var $id =0 
var reducerStateUpdated = false;
export function setReducerStateUpdated(b){
  reducerStateUpdated = b
}
export function getReducerStateUpdated(){
  console.log(reducerStateUpdated);
  return reducerStateUpdated 
}
export  function reducer(state, action) {
  switch (action.type) {
    case 'init':{
      action.data.forEach((item)=>{
        $id++;
        item.id = $id
      })
       return [...action.data];
    }
    case 'addHeader':{
      $id++;
      headerNode.id++;
      reducerStateUpdated = true;
      return [...state,{...headerNode,id:$id,name:action.data.name}];
    } case 'addImage':{
      reducerStateUpdated = true;
      $id++;
      return [...state,{...imageNode,id:$id,name:action.data.name}];
    }
    case 'addFooter':{
      reducerStateUpdated = true;
      $id++;
      return [...state,{...footerNode,id:$id,name:action.data.name}];
    }
    case 'addItems':{
      reducerStateUpdated = true;
      $id++;
      return [...state,{...menuItemsNode,id:$id,name:action.data.name}];
    }
     case 'removeNode':{
      reducerStateUpdated = true;
      state.forEach((element,index) => {
             if(action.data.id == element.id)
             state.splice(index,1);
          });
      return [...state];
    }

    case 'updateNode':{
      reducerStateUpdated = true;
      state.forEach((element,index) => {
             if(action.data.id == element.id)
             state[index] = { ...state[index],name:action.data.name}
          });
      return [...state];
    }
  }
}

export const actions = {
    init:"init",
    addImage:"addImage",
    addHeader:"addHeader",
    addFooter:"addFooter",
    addItems:"addItems",
    removeNode:"removeNode",
    updateNode:"updateNode"
}

export const nodeTypes = 
   {header:"header",
   image:"image",
   footer:"footer",
   items:"items"
}

var headerNode = {
    type: "header", 
    title:"",
    description:"",
    name:"",
    id:0,
    color:"#fff"
}

var imageNode = {
   type: "image", 
   title:"",
   src:"",
   name:"",
   id:0
}

var footerNode = {
  type: "footer", 
   title:"",
   name:"",
   itemsList:[],
   id:0
}

var menuItemsNode = {
   type: "items", 
   title:"",
   name:"",
   id:0,
   priceList:[]
}