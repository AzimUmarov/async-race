import './style.scss';
import { Col, Container, Row } from 'react-bootstrap';
import MainLayout from '../../layout/MainLayout';
import Car from '../../common/Car';
import RaceLine from '../../common/RaceLine/index';
import Pagination from '../../common/Pagination/index';
import ControlPanel from '../../common/ControlPanel/index';

export default function Garage() {
  return (
    <MainLayout>
      <ControlPanel />
      <Container className="p-0 garage">
        <Row>
          <Col xs={11} className="garage__cars">
            <Col>
              <Car first />
            </Col>
            <Col>
              <Car />
            </Col>
            <Col>
              <Car />
            </Col>
            <Col>
              <Car />
            </Col>
            <Col>
              <Car />
            </Col>
          </Col>

          <Col xs={1} className="garage__finish">
            <RaceLine />
          </Col>
        </Row>
      </Container>
      <Pagination />
    </MainLayout>
  );
}
