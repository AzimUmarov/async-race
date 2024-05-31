import './style.scss';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import racingLogo from '../../../assets/images/racing-logo.svg';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar__content">
        <img src={racingLogo} alt="logo" className="navbar__logo" />
        <div className="navbar__item">
          <Button className="navbar__item--btn" variant="outline-primary" onClick={() => navigate('/')}>
            Garage
          </Button>
          <Button className="navbar__item--btn" variant="outline-info" onClick={() => navigate('/winners')}>
            Winners
          </Button>
        </div>
      </div>
    </div>
  );
}
