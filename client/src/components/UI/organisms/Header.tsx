import styled from 'styled-components';
import { useNavigate } from 'react-router';

const HeaderS = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 84px;
    background-color: #531750;

    > div {
        display: flex;
        align-items: center;
        width: 95%;
        height: 48px;

        .left {
            display: flex;
            align-items: center;
            cursor: pointer; 
        }
    }
`;

const Header = () => {
    const navigate = useNavigate();
    return (
        <HeaderS>
            <div className="left" onClick={() => navigate("/")} >
              
                    <img
                        src="https://p7.hiclipart.com/preview/992/183/666/van-car-truck-computer-icons-delivery-pizza.jpg"
                        alt="Home"
                        style={{ width: '85px', height: 'auto' }}
                    />
                    <span
                        style={{
                            color: 'white',
                            fontSize: '22px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginLeft: '12px',
                        }}
                    >
                    PC DELIVERY
                    </span>                
            </div>
        </HeaderS>
    );
};

export default Header;
