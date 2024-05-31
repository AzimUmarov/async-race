import { Button } from 'react-bootstrap';
import './style.scss';

export default function ControlPanel() {
  return (
    <div className="sub-navbar">
      <div className="sub-navbar__control-buttons">
        <Button variant="primary">Race</Button>
        <Button variant="secondary">Reset</Button>
      </div>

      <div className="sub-navbar__create-buttons">
        <input placeholder="TYPE CAR BRAND" type="text" />
        <input type="color" />
        <Button variant="warning">Create</Button>
      </div>

      <div className="sub-navbar__update-buttons">
        <input placeholder="TYPE CAR BRAND" type="text" />
        <input type="color" />
        <Button variant="success">Update</Button>
      </div>

      <div className="sub-navbar__generate-cars">
        <Button>Generate Updates</Button>
      </div>
    </div>
  );
}
