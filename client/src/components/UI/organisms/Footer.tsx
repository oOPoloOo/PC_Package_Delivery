import styled from 'styled-components';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import XIcon from '@mui/icons-material/X';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CopyrightIcon from '@mui/icons-material/Copyright';

const StyledFooter = styled.footer`
  background: #111;
  padding: 20px;
  
  .footer-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    color: white;
  }

  .social-box {
    width: 360px;
    height: 110px;
    border: 1px solid gray;
    border-radius: 8px;
    text-align: center;
    padding-top: 10px;
  }

  .social-icons {
    display: flex;
    gap: 40px;
    padding-bottom: 20px;
    justify-content: center;
  }

  .app-box {
    width: 360px;
    height: 110px;
    border: 1px solid gray;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    padding: 10px 20px;
  }

  .social-icons .icon-white {
    color: white;
    font-size: 28px;
  }

  .app-box .qr-icon {
    color: white;
    font-size: 80px;
  }

  .qr-container {
    display: flex;
    align-items: center;
    padding-right: 20px;
  }

  .copyright {
    display: flex;
    justify-content: center; 
    align-items: center;       
    color: white;
    text-align: center;
    padding: 20px 0;
    font-size: 14px;
  }

  .copyright .icon-white {
    margin-right: 5px;
  }
`;

const Footer = () => {
  return ( 
    <StyledFooter>
      <section className='footer-container'>
        <section className='social-box'>
          <div>
            <h1>Follow PC-Delivery on social</h1>
          </div>
          <div className='social-icons'>
            <AudiotrackIcon className="icon-white" />
            <InstagramIcon className="icon-white" />
            <XIcon className="icon-white" />
            <SmartDisplayIcon className="icon-white" />
            <FacebookRoundedIcon className="icon-white" />
          </div>
        </section>

        <section className='app-box'>
          <div>
            <h1>Get the PC-Delivery app</h1>
            <h4>For Android and iOS</h4>
          </div>
          <div className='qr-container'>
            <QrCode2Icon className="qr-icon" />
          </div>
        </section>
      </section>

      <div className='copyright'>
        <CopyrightIcon className="icon-white"/>
        <span>1990-2025 by PC-Delivery.com, Inc.</span>
      </div>
    </StyledFooter>
  );
}
 
export default Footer;