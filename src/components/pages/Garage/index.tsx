import './style.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import Car from '../../common/Car';
import RaceLine from '../../common/RaceLine/index';
import Pagination from '../../common/Pagination/index';
import ControlPanel from '../../common/ControlPanel/index';
import { AppContext } from '../../../context';
import garageService from '../../../services/garageService';

export default function Garage() {
  const { setGarage, garage } = useContext(AppContext);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setGarage((prev) => ({ ...prev, loading: true }));

        const response = await garageService.getAll(garage.page);

        setGarage((prev) => {
          const newState = {
            ...prev,
            cars: response.data || [],
            loading: false,
            totalCount: response?.totalCount || 0,
          };

          return newState;
        });
      } catch (error) {
        const errorMsg = (error as { message: string }).message;

        setGarage((prev) => ({ ...prev, loading: false, error: errorMsg }));
      }
    };
    fetchCars();
  }, [setGarage, garage.page]);

  return (
    <MainLayout>
      <ControlPanel />
      <Container className="p-0 garage">
        <Row>
          <Col xs={11} className="garage__cars">
            {garage.cars.map((car, index) => (
              <Col key={car.id}>
                <Car car={car} index={index} />
              </Col>
            ))}
          </Col>

          <Col xs={1} className="garage__finish">
            <RaceLine />
          </Col>
        </Row>
      </Container>

      <Pagination
        totalCount={garage.totalCount}
        page={garage.page}
        onPageChange={(page: number) => {
          setGarage((prev) => ({ ...prev, page }));
        }}
      />
    </MainLayout>
  );
}
