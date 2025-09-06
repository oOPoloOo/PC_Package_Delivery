import { useState } from 'react'
import { Routes, Route } from "react-router";
import MainOutlet from "./components/outlets/MainOutlet";
import Home from "./components/pages/Home";
import PackageDetails from "./components/pages/PackageDetails";
import Creation from "./components/pages/Creation";
import Management from "./components/pages/Management";


function App() {

  return ( 
     <Routes> 
      <Route path="" element={<MainOutlet />}>
        <Route index element={<Home />} />
        <Route path="package/:id" element={<PackageDetails />}/>
        <Route path="addPackage" element={<Creation />}/>    
        <Route path="package/:id/changeStatus" element={<Management />}/>      
      </Route>
    </Routes>    
  )
}

export default App
