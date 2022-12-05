import axios from "axios";
import { DOMAN, TOKEN } from "../../utils/configSetting";

export class baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  get(url) {
    return axios.get(`${DOMAN}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  }

  post(url, data) {
    return axios.post(`${DOMAN}${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  }

  put(url, data) {
    return axios.post(`${DOMAN}${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  }

  delete(url) {
    return axios.delete(`${DOMAN}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  }
}
