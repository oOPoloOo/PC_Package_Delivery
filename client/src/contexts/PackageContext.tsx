import { createContext, useEffect, useReducer } from "react";
import type { PackageContextType, Package, PackageContextReducerActions, ChildrenElementProp, PackageStatus  } from "../types";

const reducer = (state: Package[], action: PackageContextReducerActions) => {
  switch(action.type){
    case 'setPackage':
      return action.data;   
    case 'addPackage':
    return [...state, action.newPackage];
  }
}

const PackageContext = createContext<PackageContextType|undefined>(undefined);

const PackageProvider = ({ children }: ChildrenElementProp) => {

   const [packages, dispatch] = useReducer(reducer, []);

   const fetchPackages = async (filters?: { tracking?: string; status?: PackageStatus }) => {
    try {

      let query = "";
      if(filters)
      {
        const paramsURL = new URLSearchParams();
         if (filters.tracking) paramsURL.append("tracking", filters.tracking);
         if (filters.status) paramsURL.append("status", filters.status);
         query = `?${paramsURL.toString()}`;
      }

      const res = await fetch(`http://localhost:5131/api/packages${query}`);
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

  type BackAddPackageResponse =
| { error: Error; message: string }
| {
    packageData: Package; acknowledged: boolean;  
  };

   const addPackage = async (
    newPackage: Omit<Package, "id">
  ): Promise<{ error: string } | { success: string; }> => {

    try {
      const BACK_RESPONSE: BackAddPackageResponse = await fetch(`http://localhost:5131/api/packages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPackage),
      }).then((res) => res.json());

      if ("error" in BACK_RESPONSE) {
        console.error(BACK_RESPONSE.error);
        return { error: BACK_RESPONSE.message };
      } else {
       
        dispatch({ type: "addPackage", newPackage: BACK_RESPONSE.packageData });
        return { success: "Successfully posted package." };
      }
    } catch (err) {
      console.error(err);
      return { error: `Error has occurred` };
    }
  };

  return (
    <PackageContext.Provider 
      value={{
        packages, 
        fetchPackages,
        addPackage      
      }}
    >
      { children }
    </PackageContext.Provider>
  )
}

export { PackageProvider };
export default PackageContext;