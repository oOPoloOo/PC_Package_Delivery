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
    flex-wrap: wrap; /* responsive */
  }

  /* Social box */
  .social-box {
    width: 360px;
    border: 1px solid gray;
    border-radius: 8px;
    padding: 15px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .social-box h1 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  /* App box */
  .app-box {
    width: 360px;
    border: 1px solid gray;
    border-radius: 8px;
    padding: 15px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .app-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .app-text h1 {
    font-size: 18px;
    margin: 0;
  }

  .app-text h4 {
    font-size: 14px;
    margin: 5px 0 0;
    font-weight: normal;
  }

  .qr-container {
    display: flex;
    align-items: center;
  }

  .social-icons .icon-white,
  .qr-icon {
    color: white;
  }

  .social-icons .icon-white {
    font-size: 28px;
  }

  .qr-icon {
    font-size: 70px;
  }

  /* Copyright */
  .copyright {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    padding: 20px 0 0;
    font-size: 14px;
  }

  .copyright .icon-white {
    margin-right: 5px;
    font-size: 16px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <section className='footer-container'>
        {/* Social box */}
        <section className='social-box'>
          <h1>Follow PC-Delivery on social</h1>
          <div className='social-icons'>
            <AudiotrackIcon className="icon-white" />
            <InstagramIcon className="icon-white" />
            <XIcon className="icon-white" />
            <SmartDisplayIcon className="icon-white" />
            <FacebookRoundedIcon className="icon-white" />
          </div>
        </section>

        {/* App box */}
        <section className='app-box'>
          <div className='app-text'>
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
