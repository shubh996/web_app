
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navigate_Whatsapp from './Navigate_Whatsapp';
import * as serviceWorker from './serviceWorker';
import Display_Product from './Display_Product';
import queryString from 'query-string'
import firebase from "firebase"

const gotoproduct =() =>{

const query = queryString.parse(window.location.search)
const uid = query.p_uid
const p_uid = uid.split("/")
const b_uid= uid.split("b_uid")



return( <Display_Product p_uid={p_uid[0]} b_uid={b_uid[1]} />)

}

const gotohome =() =>{

      const query = queryString.parse(window.location.search) 
      var x = window.location.href.split(".")[0].split("//")[1] 

      
      
      if(x == "whatsapp"){
        return( <Navigate_Whatsapp  /> )
      }
      else{
        return( <App    b_uid={x}  /> )
      }
  
  
  }



ReactDOM.render(

  <React.StrictMode>
    {
      window.location.search.includes("p_uid") 
      ?gotoproduct()
      :gotohome()
    }
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
