import { Container, Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useContext, useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import Pagination from '../../common/Pagination';
import { AppContext } from '../../../context';
import winnerService from '../../../services/winnerService';
import garageService from '../../../services/garageService';
import CarObject from '../../common/CarObject';

export default function Winner() {
  const { winner, setWinner } = useContext(AppContext);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setWinner((prev) => ({ ...prev, loading: true, error: null }));

        const response = await winnerService.getAll(winner.page);
        const winnerCarsPromises = response?.data.map(async (_winner) => garageService.get(_winner?.id || 0));
        const winnerCars = await Promise.all(winnerCarsPromises);
        const winnersCarsFinal = response.data.map((_winner, index) => ({
          ..._winner,
          car: winnerCars[index],
        }));
        console.log('winners', winnersCarsFinal);

        setWinner((prev) => ({
          ...prev,
          winners: winnersCarsFinal,
          loading: false,
          error: null,
          totalCount: response?.totalCount || 0,
        }));
      } catch (error) {
        const errorMsg = (error as { message: string }).message;

        setWinner((prev) => ({ ...prev, loading: false, error: errorMsg }));
      }
    };
    fetchWinners();
  }, [winner.page, setWinner]);

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
            {winner.loading && (
              <tr>
                <td colSpan={5} className="text-center" aria-label="loading">
                  <Spinner animation="grow" className="mx-auto" />
                </td>
              </tr>
            )}

            {winner?.winners?.map((_winner, index) => (
              <tr>
                <td>{index + 1}</td>
                <td aria-label="Car">
                  <CarObject className="car-object" color={_winner.car.color} />
                </td>
                <td>{_winner.car.name}</td>
                <td>{_winner.wins}</td>
                <td>{_winner.time}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          page={winner.page}
          totalCount={winner.totalCount}
          onPageChange={(page: number) => {
            setWinner((prev) => ({ ...prev, page }));
          }}
        />
      </Container>
    </MainLayout>
  );
}
