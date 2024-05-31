import { OrderEnum, SortEnum } from '../enums/winnerEnums';
import api from './api';

export interface ServiceOptions {
  baseURL: string;
}

const serviceFactory = <T, K = T>(options: ServiceOptions) => {
  const { baseURL } = options;

  return {
    async getAll(
      page = 1,
      limit = 7,
      sort = SortEnum.ID,
      order = OrderEnum.ASC,
    ): Promise<{ data: T[]; totalCount: number }> {
      const res = await api.get(`${baseURL}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
      return { data: res.data, totalCount: parseInt(res.headers['x-total-count'], 10) };
    },
    async get(id: number): Promise<T> {
      const res = await api.get(`${baseURL}/${id}`);
      return res.data;
    },
    async create(item: K): Promise<T> {
      const res = await api.post(baseURL, item);
      return res.data;
    },
    async update(id: number, item: K): Promise<T> {
      const res = await api.put(`${baseURL}/${id}`, item);
      return res.data;
    },
    async delete(id: number): Promise<void> {
      return api.delete(`${baseURL}/${id}`);
    },
  };
};

export default serviceFactory;
