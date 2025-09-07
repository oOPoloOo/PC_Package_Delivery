import { createContext, useEffect, useReducer } from "react";
import type { PackageContextType, Package, PackageContextReducerActions, ChildrenElementProp  } from "../types";

const reducer = (state: Package[], action: PackageContextReducerActions) => {
  switch(action.type){
    case 'setPackage':
      return action.data;   
  }
}

const PackageContext = createContext<PackageContextType|undefined>(undefined);

const PackageProvider = ({ children }: ChildrenElementProp) => {

   const [packages, dispatch] = useReducer(reducer, []);

   const fetchPackages = async () => {
    try {
      const res = await fetch(`http://localhost:5131/api/package`);
      const data: Package[] = await res.json();
      console.dir("PackageCONTEX fetchsetPackage ", data);

      dispatch({ type: 'setPackage', data });
    } catch (error) {
      console.error("Failed to fetch packages", error);
    }
  };
    useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <PackageContext.Provider 
      value={{
        packages, 
        fetchPackages        
      }}
    >
      { children }
    </PackageContext.Provider>
  )
}

export { PackageProvider };
export default PackageContext;