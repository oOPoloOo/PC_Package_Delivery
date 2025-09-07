import Header from "../UI/organisms/Header";
import Footer from "../UI/organisms/Footer";
import { Outlet } from "react-router";

const MainOutlet = () => {
    return ( 
        <>
            <Header />
                <main>
                    <Outlet />
                </main>
            <Footer />
        </>
    );
}
 
export default MainOutlet;