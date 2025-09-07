import { useContext } from "react";
import styled from "styled-components";
// import Card from "../UI/molecules/PackageCard";
import PackageContext from "../../contexts/PackageContext";
import type { PackageContextType  } from "../../types";

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

const HomePage = () => {
  const { packages } = useContext(PackageContext) as PackageContextType;

  return (
    <Content>  

      <h1>Deliver everything, everywhere!</h1>

      <StyledPostsContainer>
        {packages.length ? (
        //   packages.map((item) => <Card key={item.id} data={item} />)
        <p>We have packages to show working on it!</p>
        ) : (
          <p>Loading...</p>
        )}
      </StyledPostsContainer>

    </Content>
  );
};

export default HomePage;
