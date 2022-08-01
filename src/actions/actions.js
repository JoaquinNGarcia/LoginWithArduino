import {
  GET_USER,
  GET_SENSORES,
  UPDATE_SENSOR,
  SAVE_REGISTRO_SENSOR,
  GET_REGISTRO,
  GET_REGISTRO_IN_PROGRESS,
  SET_SEND_TRUE,
  UPLOAD_SENSOR_INPROGRESS,
  UPLOAD_SENSOR_FAILURE,
  SAVE_ESTADO_SENSOR
} from "./types";
import axios from "axios";

export const getUser = () => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:3000/user`);
    dispatch({
      type: GET_USER,
      payload: res.data[0]
    });
  } catch (e) {
    console.error(e);
  }
};

export const getSensores = () => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:3000/sensores`);
    dispatch({
      type: GET_SENSORES,
      payload: res.data
    });
  } catch (e) {
    console.error(e);
  }
};

export const updateSensor = sensor => async dispatch => {
  dispatch({ type: UPLOAD_SENSOR_INPROGRESS });
  try {
    const res = await axios.put(
      `http://localhost:3000/sensores/${sensor.id}`,
      sensor
    );
    dispatch({
      type: UPDATE_SENSOR,
      payload: res.data
    });
  } catch (e) {
    console.error(e);
    dispatch({ type: UPLOAD_SENSOR_FAILURE });
  }
};

export const guardarRegistro = payload => async dispatch => {
  try {
    const { data } = await axios.post(
      `http://localhost:3000/registro`,
      payload
    );
    dispatch({
      type: SAVE_REGISTRO_SENSOR,
      payload: { sensor: data.data.id_sensor, value: data.data.valueSensor }
    });
  } catch (e) {
    console.error(e);
  }
};

export const getRegistro = payload => async dispatch => {
  dispatch({
    type: GET_REGISTRO_IN_PROGRESS
  });
  try {
    const res = await axios.get(
      `http://localhost:3000/registro/${payload.fechaMin}/${payload.fechaMax}`
    );
    dispatch({
      type: GET_REGISTRO,
      payload: res.data
    });
  } catch (e) {
    console.error(e);
  }
};

export const setSendTrue = () => async dispatch => {
  dispatch({
    type: SET_SEND_TRUE
  });
};

export const saveEstadoSensor = payload => async dispatch => {
  console.log(payload);
  dispatch({
    type: SAVE_ESTADO_SENSOR,
    payload
  });
};
