import { Container, Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useContext, useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import Pagination from '../../common/Pagination';
import { AppContext } from '../../../context';
import winnerService from '../../../services/winnerService';
import garageService from '../../../services/garageService';
import CarObject from '../../common/CarObject';
import { OrderEnum, SortEnum } from '../../../enums/winnerEnums';
import './style.scss';

export default function Winner() {
  const { winner, setWinner } = useContext(AppContext);
  const [sort, setSort] = useState(SortEnum.ID);
  const [order, setOrder] = useState(OrderEnum.ASC);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setWinner((prev) => ({ ...prev, loading: true, error: null }));

        const response = await winnerService.getAll(winner.page, 10, sort, order);
        const winnerCarsPromises = response?.data.map(async (_winner) => garageService.get(_winner?.id || 0));
        const winnerCars = await Promise.all(winnerCarsPromises);
        const winnersCarsFinal = response.data.map((_winner, index) => ({
          ..._winner,
          car: winnerCars[index],
        }));

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
  }, [winner.page, setWinner, sort, order]);

  return (
    <MainLayout>
      <Container>
        <div className="table-container">
          <div className="table-container__title">
            <h1 className="text-center p-1 mb-3 ">Winners</h1>
          </div>

          <div className="table-container__filter">
            <div>
              <span>Order By: </span>
              <select name="order" value={order} onChange={(e) => setOrder(e.target.value as OrderEnum)}>
                <option value={OrderEnum.ASC}>ASC</option>
                <option value={OrderEnum.DESC}>DESC</option>
              </select>
            </div>
            <div>
              <span>Sort By: </span>
              <select name="sort" value={sort} onChange={(e) => setSort(e.target.value as SortEnum)}>
                <option value={SortEnum.ID}>id</option>
                <option value={SortEnum.WINS}>wins</option>
                <option value={SortEnum.TIME}>time</option>
              </select>
            </div>
          </div>
        </div>
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

            {winner?.winners?.map((_winner) => (
              <tr>
                <td>{_winner.id}</td>
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
          limit={10}
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
