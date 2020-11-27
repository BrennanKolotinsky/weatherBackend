import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Weather from "./Components/WeatherUI/index.jsx";
import Authentication from "./Components/Authentication/index.jsx";
import Module from 'module'
const axios = require('axios'); // use to send API requests!
let authenticated = false;
let numTimes = 0;

const ConfirmAuth = () => {
  
  // the hook renders twice automatically (frustrating!)
  if (++numTimes > 2) {
    authenticated = true;
  }

  // this just forces an update
  const [value, setValue] = useState(0);
  return () => setValue(value => ++value);
}

function App() {
  let forceUpdate = ConfirmAuth(); // hook
  return (

    <div className="App">
      <div style={authenticated == false ? {} : { display : 'none' } }>
        <Authentication forceUpdate={ forceUpdate } authenticated={ authenticated }  />
      </div>
      <div style={authenticated == true ? {} : { display : 'none' } }>
        <Weather />
      </div>
    </div>
  );
}

export default App;