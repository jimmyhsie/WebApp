import * as mysql from 'mysql'
import {mysql as config} from '../config/config'
import Apps from './app'

export const Connection = mysql.createConnection(config)

Connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log("Connected!");
  });

  export default {
      Apps
  }

