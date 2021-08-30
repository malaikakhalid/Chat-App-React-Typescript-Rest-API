import React, { FC, useState } from 'react';
import logo from './logo.svg';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import Chat from './components/Chat';
import Message from './components/MessageBox';

import Chatting from './components/Chatting';





const App: FC = () => {
  
  let history = useHistory();
  function setToken(userToken:{}){
    // console.log("App",userToken);
    sessionStorage.setItem('token',JSON.stringify(userToken));
  }

  var token =  sessionStorage.getItem('token');
  // console.log(token);

  if(!token){
    return  <Login  setToken = {setToken}/> 
   
  }
 
  return (
    <div>
      <BrowserRouter>
      
      <Route path="/" component={Chat}/>
      <Route path="/messages/:id" component={Chatting} />
      </BrowserRouter>
      {/* <Login setToken = {setToken}/> */}
    </div>
  );
}
export default App;
