// import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointRight, faHandPointLeft } from '@fortawesome/free-solid-svg-icons'
import Home from './pages/Home';
// import { Link, Outlet } from "react-router-dom";

function App() {
  const [home, set_home] = useState(true);
  const handleClick = () => {

    set_home(false)

  };

  return (

    <div className="App">
      {
        (home) ? (<header className="App-header">
        <p>
          Welcome to NFT MarketPlace.. Click the link below to enter..
        </p>

        <div className="App-button">
          <FontAwesomeIcon icon={faHandPointRight} className="rotate-on-hover" />
          <button className="Button" onClick = {handleClick}>
            <p className='slide-on-hover'>Me</p>
          </button>
          <FontAwesomeIcon icon={faHandPointLeft} className="rotate-on-hover-2"/>
        </div>
      
      </header>)
      :
      ( <Home/> ) 
      }
    </div>
  );
}

export default App;
