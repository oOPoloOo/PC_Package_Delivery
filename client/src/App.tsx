import { Routes, Route } from "react-router";
import MainOutlet from "./components/outlets/MainOutlet";
import Home from "./components/pages/HomePage";
import NewPackagePage from "./components/pages/NewPAckagePage";
// import PackageDetails from "./components/pages/PackageDetails";

function App() {
  return ( 
     <Routes> 
      <Route path="" element={<MainOutlet />}>
        <Route index element={<Home />} />
        {/* <Route path="package/:id" element={<PackageDetails />}/> */}
        <Route path="addNewPackage" element={<NewPackagePage />}/>    
      </Route>
    </Routes>    
  )
}

export default App
