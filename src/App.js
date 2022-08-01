import React, { Component } from "react";
// import axios from "axios";
import "./App.css";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Switch,
  // Redirect,
  Route
} from "react-router-dom";
import UserHome from "./components/UserHome/container";
import AdminHome from "./components/AdminHome/container";
import socketIOClient from "socket.io-client";
import { getUser, getSensores, setSendTrue } from "./actions/actions";
import { connect } from "react-redux";
import io from "socket.io-client";

// const axiosInstance = axios.create({
//   baseURL: "localhost:4000"
// });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatura: 0,
      humedad: 0,
      viento: 0,
      endpoint: "localhost:3030",
      tempMin: 0,
      tempMax: 0,
      humMin: 0,
      humMax: 0,
      vientoMin: 0,
      vientoMax: 0,

      sensor: []
    };
    this.socket = socketIOClient(this.state.endpoint);
  }

  componentDidMount = async () => {
    // const { endpoint } = this.state;
    //const socket = socketIOClient(endpoint);
    // const { temperatura, humedad, viento } = this.state;
    this.socket.on("arduinodata", data => {
      this.setState({
        temperatura: data.Temperatura,
        humedad: data.Humedad,
        viento: data.Viento 
      });
    });
    // this.props.getSensores();
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  sendMail = sensor => {
    if (!this.props.sentMessage) {
      var socket = io(this.state.endpoint);
      this.props.setSendTrue(sensor);
      socket.on("connect", function() {
        socket.emit("sendemail", sensor, function(data) {
          console.log(data); // data will be 'tobi says woot'
        });
      });
    }
  };
  render() {
    const { temperatura, humedad, viento } = this.state;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/user-home">
              <UserHome
                temperatura={temperatura}
                viento={viento}
                humedad={humedad}
                endpoint={this.state.endpoint}
                sendMail={this.sendMail}
              />
            </Route>
            <Route path="/admin-home">
              <AdminHome handleChange={this.handleChange} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sentMessage: state.sentMessage
  };
};

export default connect(mapStateToProps, { getUser, getSensores, setSendTrue })(
  App
);
