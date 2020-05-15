import React from 'react';
import logo from './logo.svg';
import {Navbar,NavbarBrand} from 'reactstrap';
import './App.css';
import Menu from './components/Menucomponents';
function App() {
  return (
    <div>
      <Navbar dark color="primary">
      <div className='container'>
      <NavbarBrand href="/">Restuarant</NavbarBrand>
      </div>
      </Navbar>
      <Menu />
    </div>
  );
}

export default App;
