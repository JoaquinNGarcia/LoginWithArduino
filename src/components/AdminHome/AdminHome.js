import React, { Component } from "react";
import "../../App.css";
import {
  Segment,
  Dimmer,
  Loader,
  Input,
  Button,
  Form
} from "semantic-ui-react";
import "./styles.css";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempMin: 0,
      tempMax: 0,
      humMin: 0,
      humMax: 0,
      vientoMin: 0,
      vientoMax: 0,
      coefT: 0,
      coefH: 0,
      coefV: 0,
      user: null,
      sensorTemperatura: null,
      sensorHumedad: null,
      sensorViento: null
    };
  }

  componentDidMount() {
    //this.props.getUser();
    //this.props.getSensores();
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
    this.props.handleChange(name, value);
  };

  renderLoader = () => (
    <Segment>
      <Dimmer>
        <Loader>Loading</Loader>
      </Dimmer>
    </Segment>
  );

  actualizarValores = sensor => {
    this.props.updateSensor(sensor);
  };
  render() {
    // if (!this.props.user && !this.props.sensores) return this.renderLoader();
    // else {
    //   const sensorTemperatura = this.props.sensores.find(
    //     sensor => sensor.name_sensor === "temperatura"
    //   );
    //   const sensorHumedad = this.props.sensores.find(
    //     sensor => sensor.name_sensor === "humedad"
    //   );
    //   const sensorViento = this.props.sensores.find(
    //     sensor => sensor.name_sensor === "viento"
    //   );
    //   const {
    //     estadoTemp//,
    //     // estadoHum,
    //     // estadoViento
    //   } = this.props;
      const sensorTemperatura=[ {min_value:2, max_value:6, factor:'qwe'} ]
      const sensorHumedad=[ {min_value:2, max_value:6, factor:'qwe'} ]
      const sensorViento=[ {min_value:2, max_value:6, factor:'qwe'} ]
      const estadoTemp=["2", "4", "3"]
      return (
        <div>
          <div className="container-all">
            <div className="container-form">
              <Form
                className="form-sensor"
                onSubmit={() => this.actualizarValores(sensorTemperatura)}
              >
                <p>Temperatura</p>
                <Form.Field>
                  Valor minimo
                  <Input
                    type="text"
                    defaultValue={sensorTemperatura.min_value}
                    className="input-container"
                    name="tempMin"
                    onChange={(e, data) =>
                      (sensorTemperatura.min_value = parseInt(e.target.value))
                    }
                  />
                </Form.Field>
                <Form.Field>
                  Valor maximo
                  <input
                    type="text"
                    defaultValue={sensorTemperatura.max_value}
                    className="input-container"
                    name="tempMax"
                    onChange={
                      (e, data) =>
                        (sensorTemperatura.max_value = parseInt(e.target.value))
                    }
                  />
                </Form.Field>
                <Form.Field>
                  Coeficiente de conversion
                  <input
                    type="text"
                    defaultValue={sensorTemperatura.factor}
                    className="input-container"
                    name="coefT"
                    onChange={(e, data) =>
                      (sensorTemperatura.factor = e.target.value)
                    }
                  />
                </Form.Field>
                {console.log("Temperatura", estadoTemp)}
                <label>
                  Desactivar
                  <input
                    name="isGoing"
                    type="checkbox"
                    onChange={(e, data) =>
                      this.props.saveEstadoSensor({
                        sensor: "estadoTemp",
                        estado: e.target.checked
                      })
                    }
                    // checked={estadoTemp}
                  />
                </label>
                <Button type="submit">
                  {this.props.saveSensorInProgress ? "Guardando" : "Guardar"}
                </Button>
              </Form>
            </div>
            <div className="container-form">
              <Form
                className="form-sensor"
                onSubmit={() => this.actualizarValores(sensorHumedad)}
              >
                <p>Humedad</p>
                <Form.Field>
                  Valor minimo
                  <Input
                    type="text"
                    defaultValue={sensorHumedad.min_value}
                    className="input-container"
                    name="humMin"
                    onChange={(e, data) =>
                      (sensorHumedad.min_value = parseInt(e.target.value))
                    }
                  />
                </Form.Field>
                <Form.Field>
                  Valor maximo
                  <input
                    type="text"
                    defaultValue={sensorHumedad.max_value}
                    className="input-container"
                    name="humMax"
                    onChange={(e, data) =>
                      (sensorHumedad.max_value = parseInt(e.target.value))
                    }
                  />
                </Form.Field>
                <Form.Field>
                  Coeficiente de conversion
                  <input
                    type="text"
                    defaultValue={sensorHumedad.factor}
                    className="input-container"
                    name="coefH"
                    onChange={(e, data) =>
                      (sensorHumedad.factor = e.target.value)
                    }
                  />
                </Form.Field>
                {console.log("Humedad", estadoTemp)}
                <label>
                  Desactivar
                  <input
                    name="isGoing"
                    type="checkbox"
                    onChange={(e, data) =>
                      this.props.saveEstadoSensor({
                        sensor: "estadoHum",
                        estado: e.target.checked
                      })
                    }
                  />
                </label>
                <Button type="submit">
                  {this.props.saveSensorInProgress ? "Guardando" : "Guardar"}
                </Button>
              </Form>
            </div>
            <div className="container-form">
              <Form
                className="form-sensor"
                onSubmit={() => this.actualizarValores(sensorViento)}
              >
                <p>Viento</p>
                <Form.Field>
                  Valor minimo
                  <Input
                    type="text"
                    defaultValue={sensorViento.min_value}
                    className="input-container"
                    name="vientoMin"
                    onChange={(e, data) =>
                      (sensorViento.min_value = parseInt(data.value))
                    }
                  />
                </Form.Field>
                <Form.Field>
                  Valor maximo
                  <input
                    type="text"
                    defaultValue={sensorViento.max_value}
                    className="input-container"
                    name="vientoMax"
                    onChange={(e, data) =>
                      (sensorViento.max_value = parseInt(data.value))
                    }
                  />
                </Form.Field>
                <Form.Field>
                  Coeficiente de conversion
                  <input
                    type="text"
                    defaultValue={sensorViento.factor}
                    className="input-container"
                    name="coefV"
                    onChange={(e, data) =>
                      (sensorViento.factor = parseInt(data.value))
                    }
                  />
                </Form.Field>
                {console.log("Viento", estadoTemp)}
                <label>
                  Desactivar
                  <input
                    name="isGoing"
                    type="checkbox"
                    onChange={(e, data) =>
                      this.props.saveEstadoSensor({
                        sensor: "estadoViento",
                        estado: e.target.checked
                      })
                    }
                  />
                </label>
                <Button type="submit">
                  {this.props.saveSensorInProgress ? "Guardando" : "Guardar"}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      );
    // }
  }
}

export default AdminHome;
