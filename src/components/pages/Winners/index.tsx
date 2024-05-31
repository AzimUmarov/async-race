import './style.scss';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import MainLayout from '../../layout/MainLayout';
import carImage from '../../../assets/images/car.svg';
import Pagination from '../../common/Pagination';

export default function Winner() {
  return (
    <MainLayout>
      <Container>
        <h1 className="text-center p-1 mb-3 text-bg-info">Winners</h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Car</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Best time (seconds)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td aria-label="Car">
                <img style={{ height: '36px' }} src={carImage} alt="car" />
              </td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>1</td>
              <td aria-label="Car">
                <img style={{ height: '36px' }} src={carImage} alt="car" />
              </td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
        <Pagination />
      </Container>
    </MainLayout>
  );
}
