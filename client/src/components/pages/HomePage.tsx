import { useContext, useState } from "react";
import styled from "styled-components";
import Card from "../UI/molecules/PackageCard";
import PackageContext from "../../contexts/PackageContext";
import { PACKAGE_STATUSES, type PackageContextType, type PackageStatus } from "../../types";
import { useNavigate } from "react-router";
import AddPackageButton from "../UI/molecules/AddPackageButton";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
  color: white;
  padding: 20px;
  flex-grow: 1;

  h1 {
    margin-top: 10px;
  }
`;

const StyledPostsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FilterBar = styled.div`
  display: flex;
  gap:12px;
  margin: 15px 0;

  input, select, button 
  {
    padding: 8px;
    border-radius: 6px;
    border: none;
    outline: none;
  }  
`;

const HomePage = () => {
  const { packages, fetchPackages } = useContext(PackageContext) as PackageContextType;
  const navigate = useNavigate();

  // For package filtering
  const [tracking, setTracking] = useState("");
  const [status, setStatus] = useState<PackageStatus | "" >("");

  // Calls for new data with filters applied
   const applyFilters = () => {
    fetchPackages?.({
      tracking,
      status: status || undefined,
    });
  };
  
  return (
    <Content>  

      <AddPackageButton
        label="Add ME new PACKAGE!"
        onClick={() => navigate('/addNewPackage')}
      />

      <h1>Deliver everything, everywhere!</h1>
      
      <FilterBar>

        <input 
          type="text" 
          placeholder="Tracking number"
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value  as PackageStatus)}
        >
          <option value="">All statuses</option>
          {
            Object.values(PACKAGE_STATUSES).map((s) => (
              <option key={s} value={s}>{s}</option> 
            ))
          }
        </select>

        <button onClick={applyFilters}>Apply Filters</button>

      </FilterBar>
      <StyledPostsContainer>
        {packages.length ? (
          packages.map((item) => <Card key={item.id} data={item} />)
        ) : (
          <p>Loading...</p>
        )}
      </StyledPostsContainer>

    </Content>
  );
};

export default HomePage;
