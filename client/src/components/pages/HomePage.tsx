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

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('https://plus.unsplash.com/premium_photo-1661932036915-4fd90bec6e8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNoaXBwaW5nfGVufDB8fDB8fHww');
  color: white;
  padding: 80px 20px;
  text-align: center;

  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 30px;
    font-size: 1.2rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  max-width: 600px;
  width: 100%;

  input {
    flex: 1;
    padding: 12px 15px;
    border-radius: 6px;
    border: none;
    outline: none;
    font-size: 1rem;
  }

  button {
    background-color: #e50914; 
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
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
         <Hero>
        <h1>Hello, <span style={{ color: "#FFD700" }}>Customer</span></h1>
        <p>Deliver everything, everywhere!</p>
        <SearchContainer>
          <input 
            type="text" 
            placeholder="Enter your tracking number"
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

          <button onClick={applyFilters}>Search</button>

        </SearchContainer>
        <AddPackageButton
          label="Add ME new PACKAGE!"
          onClick={() => navigate('/addNewPackage')}
        />
      </Hero>
    
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
