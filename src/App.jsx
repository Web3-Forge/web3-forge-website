import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Resources from './components/Resources';
import CreateResource from './components/CreateResource';


function App() {

  return (
  
     <Routes>
      <Route path={'/'} exact element={<Home />} />
      <Route path={'/dashboard'} element={<Dashboard />} />
      <Route path={'/resources'} element={<Resources/>} />
      <Route path={'/create-resource'} element={<CreateResource/>} />
      </Routes> 
     
  )
}

export default App;
