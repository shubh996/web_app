
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Display_Product from './Display_Product';
import queryString from 'query-string'




const goto =() =>{

  const query = queryString.parse(window.location.search)
const uid = query.p_uid
const p_uid = uid.split("/")
const b_uid= uid.split("b_uid")

return <Display_Product p_uid={p_uid[0]} b_uid={b_uid[1]} />

}



ReactDOM.render(
  
  <React.StrictMode>
    {
      window.location.search.includes("p_uid") 
      ?goto()
      :<App b_uid={window.location.pathname} />
    }
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
