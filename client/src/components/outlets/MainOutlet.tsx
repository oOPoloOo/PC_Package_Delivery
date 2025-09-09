import Header from "../UI/organisms/Header";
import Footer from "../UI/organisms/Footer";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";


const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MainOutlet = () => {
  return ( 
    <PageWrapper>
      <Header />
        <Main>
          <Outlet />
          <ToastContainer position="top-center" autoClose={1700} />
        </Main>
      <Footer />
    </PageWrapper>
  );
}
 
export default MainOutlet;