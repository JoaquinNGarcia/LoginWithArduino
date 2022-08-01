import AdminHome from "./AdminHome";
import {
  getUser,
  getSensores,
  updateSensor,
  saveEstadoSensor
} from "../../actions/actions";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    user: state.user,
    sensores: state.sensores,
    saveSensorInProgress: state.saveSensorInProgress,
    estadoTemp: state.estadoTemp,
    estadoHum: state.estadoHum,
    estadoViento: state.estadoViento
  };
};

export default connect(mapStateToProps, {
  getUser,
  getSensores,
  updateSensor,
  saveEstadoSensor
})(AdminHome);
