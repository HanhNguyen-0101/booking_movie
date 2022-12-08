import { notification } from "antd";

export const NOTIF_TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}

export const openNotification = (type = 'info', message = '', description = '') => {
  notification[type]({
    message,
    description,
    placement: 'bottomLeft'
  });
};