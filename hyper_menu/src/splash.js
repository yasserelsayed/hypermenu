import React,{useState,useEffect} from 'react'

function Spalsh(props) {
   const [show,setShow] =  useState(true)
   useEffect(() => {
    setTimeout(() => {
     setShow(false);
    }, 2000);
  }, [])
  return (
    <div class={props.selectedMenu && props.selectedMenu.template_class}>
    {show &&  <div class="splash"> <h3 class="animated flip splashTitle">{props.selectedMenu && props.selectedMenu.name}</h3></div>}
    </div>
  );
}

export default Spalsh;
