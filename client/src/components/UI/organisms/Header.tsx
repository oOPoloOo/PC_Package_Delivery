import styled from 'styled-components';
import { Link } from 'react-router';

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
        }

        a {
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
            text-decoration-color: var(--first-color);
        }
    }
`;

const Header = () => {
    return (
        <HeaderS>
            <div className="left">
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                        }}
                    >
                        PC DELIVERY
                    </span>
                </Link>
            </div>
        </HeaderS>
    );
};

export default Header;
