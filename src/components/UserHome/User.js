import React, { Component } from "react";
import "../../App.css";
import chart from "../chart";
import {
  Segment,
  Dimmer,
  Loader,
  Input,
  Button,
  Form
} from "semantic-ui-react";
// import socketIOClient from "socket.io-client";
// import io from "socket.io-client";
import "./styles.css";

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempAnt: 0,
      vientoAnt: 0,
      humedadAnt: 0,
      fechaMin: "",
      fechaMax: ""
    };
  }
  componentDidMount() {
    // this.props.getSensores();
  }
  renderLoader = () => (
    <Segment>
      <Dimmer>
        <Loader>Loading</Loader>
        {/* {console.log("renderLoader")} */}
      </Dimmer>
    </Segment>
  );

  descargarInformacion = async (
    e,
    temp,
    viento,
    humedad,
    fechaMin,
    fechaMax
  ) => {
    // console.log("descargarInformacion");
    e.preventDefault();
    await this.props.getRegistro({ fechaMin, fechaMax });
    // const registro = this.props.registro;
    const registro = [
      {id_sensor: 1, valueSensor: 23, fecha: '2022/08/01', horario: '13:03' },
      {id_sensor: 10, valueSensor: 1, fecha: '2022/02/10', horario: '03:12' },
      {id_sensor: 12, valueSensor: 13, fecha: '2022/05/23', horario: '09:43' },
      {id_sensor: 4, valueSensor: 16, fecha: '2021/12/12', horario: '13:56' },
      {id_sensor: 8, valueSensor: 35, fecha: '2022/01/09', horario: '32:30' },
    ]
    var contenido = "";
    !!registro
      && registro.map(item => {
        return contenido += `Sensor: ${
          item.id_sensor
        } - ${item.valueSensor.toString()} °C, Fecha: ${item.fecha}, Horario: ${
          item.horario
        } \n`;
      });
    if (!contenido.trim())
      contenido = "Los sensores estan desactivados, no se registraron valores";

    const file = new Blob([contenido], {
      type: "text/plain"
    });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "RegistroSensores.txt";
    document.body.appendChild(element);
    element.click();
  };

  saveRegistro = (temperaturaActual, humedadActual, vientoActual) => {
    const {
      guardarRegistro,
      temperaturaAnt,
      vientoAnt,
      humedadAnt
    } = this.props;
    const date = new Date();
    const fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const horario = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    if (temperaturaAnt !== temperaturaActual) {
      guardarRegistro({
        id_sensor: "temperatura",
        valueSensor: temperaturaActual,
        fecha,
        horario
      });
    }
    if (vientoAnt !== vientoActual) {
      guardarRegistro({
        id_sensor: "viento",
        valueSensor: vientoActual,
        fecha,
        horario
      });
    }
    if (humedadAnt !== humedadActual) {
      guardarRegistro({
        id_sensor: "humedad",
        valueSensor: humedadActual,
        fecha,
        horario
      });
    }
  };

  render() {
    // const {
      // sensores,
      // user,
      // registroInProgress ,
      // estadoTemp,
      // estadoHum,
      // estadoViento
    // } = this.props;
    const temperatura = 4
    const viento = 40
    const humedad = 83
    
    const estadoTemp = false;
    const estadoHum = false;
    const estadoViento = false;

    // if ((!user && !sensores) || registroInProgress) {
    //   return this.renderLoader();
    // } else {
      // const sensorTemperatura = sensores.find(
      //   sensor => sensor.name_sensor === "temperatura"
      // );
      // const sensorHumedad = sensores.find(
      //   sensor => sensor.name_sensor === "humedad"
      // );
      // const sensorViento = sensores.find(
      //   sensor => sensor.name_sensor === "viento"
      // );
      // const temperatura = Math.round(
      //   this.props.temperatura * sensorTemperatura.factor
      // );
      // const humedad = Math.round(this.props.humedad * sensorHumedad.factor);
      // const viento = Math.round(this.props.viento * sensorViento.factor);

      const sensorTemperatura = [ {min_value:-50, max_value:50} ]
      const sensorHumedad = [ {min_value:-1, max_value:100} ]
      const sensorViento = [ {min_value:0, max_value:80} ]
      this.saveRegistro(temperatura, humedad, viento);
      (temperatura > sensorTemperatura.max_value || temperatura < sensorTemperatura.min_value) && this.props.sendMail("temperatura");
      
      (humedad > sensorHumedad.max_value || humedad < sensorHumedad.min_value) && this.props.sendMail("humedad");
      
      (viento > sensorViento.max_value || viento < sensorViento.min_value) && this.props.sendMail("viento");
      
      return (
        <div>
          <div className="container-all">
            <div className="container">
				<p>Temperatura</p>
				<div className="div-valor">
					{estadoTemp ? <p>Desactivado</p> : <p>{temperatura} ºC</p>}
				</div>
				{estadoTemp ? null : chart("Temperatura", temperatura)}
            </div>
            <div className="container">
              <p>Humedad</p>

              <div className="div-valor">
                {estadoHum ? <p>Desactivado</p> : <p>{humedad} %</p>}
              </div>
              {estadoHum ? null : chart("Humedad", humedad)}
            </div>
            <div className="container">
              <p>Velocidad del viento</p>
              <div className="div-valor">
                {estadoViento ? <p>Desactivado</p> : <p>{viento} km/h</p>}
              </div>
              {estadoViento ? null : chart("Viento", viento)}
            </div>
          </div>
          <div className="container-download">
            <Form className="form-fecha">
              <p>Fecha</p>
              <Form.Field className="input-container">
                Desde
                <Input
                  type="text"
                  defaultValue={this.state.fechaMin}
                  placeholder="yyyy-mm-dd"
                  className="input-container"
                  name="fechaMin"
                  onChange={
                    (e, data) => this.setState({ fechaMin: data.value })
                    //console.log(data)
                  }
                />
              </Form.Field>
              <Form.Field className="input-container">
                Hasta
                <Input
                  type="text"
                  defaultValue={this.state.fechaMax}
                  className="input-container"
                  placeholder="yyyy-mm-dd"
                  name="fechaMax"
                  onChange={(e, data) =>
                    this.setState({ fechaMax: data.value })
                  }
                />
              </Form.Field>
              <Button
                type="submit"
                className="button"
                onClick={
                  //this.downloadTxtFile()
                  e =>
                    this.descargarInformacion(
                      e,
                      temperatura,
                      humedad,
                      viento,
                      this.state.fechaMin,
                      this.state.fechaMax
                    )
                }
              >
                Descargar
              </Button>
            </Form>
          </div>
        </div>
      );
    // }
  }
}

export default UserHome;
