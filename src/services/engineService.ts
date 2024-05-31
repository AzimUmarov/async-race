import EngineEnum from '../enums/engineEnum';
import api from './api';

const BASE_ENTITY_URL = '/engine';

export default {
  startEngine: async (id: number) => api.patch(`${BASE_ENTITY_URL}?id=${id}&status=${EngineEnum.STARTED}`),
  stopEngine: async (id: number) => api.patch(`${BASE_ENTITY_URL}?id=${id}&status=${EngineEnum.STOPPED}`),
  switchToDriveMode: async (id: number) => api.patch(`${BASE_ENTITY_URL}?id=${id}&status=${EngineEnum.DRIVE}`),
};
