import logo from './logo.svg';
import React from "react";
import Header from "./components/Header";
import Persons from "./components/Persons";
import Footer from "./components/Footer";

import './App.css';
import LoadButton from "./components/LoadButton";
import ModalView from "./components/ModalView";
import PersonForm from "./components/PersonForm";


function App() {
  return (
    <div className="App">
      <Header />
      <Persons />
      <Footer />
      {/*<header className="App-header">*/}

        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
