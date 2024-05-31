import { NewWinner, Winner } from '../interfaces/winnerInterface';
import serviceFactory from './serviceFactory';

const winnerService = serviceFactory<Winner, NewWinner>({ baseURL: '/winners' });

export default winnerService;
