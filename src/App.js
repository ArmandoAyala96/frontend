import logo from './logo.svg';
import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Matriculas from './pages/Matriculas/index';

function App() {

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">Prueba Laravel y React JS</span>
      </nav>
      <Matriculas></Matriculas>
    </>
  )


}

export default App;
