import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import logo from './logo.svg';
import {Login, Chat_panel} from './components';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Login/>}/>
          <Route path="/chat_panel"  element={<Chat_panel/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
