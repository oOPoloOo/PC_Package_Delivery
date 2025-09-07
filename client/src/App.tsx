import { Routes, Route } from "react-router";
import MainOutlet from "./components/outlets/MainOutlet";
import Home from "./components/pages/HomePage";
// import PackageDetails from "./components/pages/PackageDetails";
// import Creation from "./components/pages/Creation";


function App() {

  return ( 
     <Routes> 
      <Route path="" element={<MainOutlet />}>
        <Route index element={<Home />} />
        {/* <Route path="package/:id" element={<PackageDetails />}/>
        <Route path="addPackage" element={<Creation />}/>     */}
      </Route>
    </Routes>    
  )
}

export default App
