import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';

class Login extends Component {

  static propTypes = {
    history: object
  }

  constructor(props) {
    super(props);
    //Restablecer el estado de inicio de sesión.
    //this.props.logout();

    this.state = {
      password: null,
      submitted: false,
      username: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    //const { name, value } = e.target;
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    //this.props.login(this.state);
    this.setState({ submitted: true });
    // const { username, password } = this.state;
    /*if (username && password) {
        this.props.login(username, password);
    }*/
  };

  handleRedirect = () => {
    const { history: { push } } = this.props;
    push('/admin-home');
  }

  handleRedirectUser = () => {
    const { history: { push } } = this.props;
    push('/user-home');
  }

  render() {
    // const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <Form className="form-login" onSubmit={this.handleSubmit}>
        <h1>Administrador</h1>
          <div className={ 'form-group' + (submitted && !username ? ' has-error' : '') }>
            <Form.Field>
              <label className="label-form"> Usuario </label>
              <Form.Input
                type="text"
                placeholder="Email"
                onChange={this.handleChange}
                name="username"
                value={username}
                required
              />
              {submitted && !username && 
                <div className="help-block">Nombre de usuario requerido</div>
              }
            </Form.Field>
          </div>
          <div className={ 'form-group' + (submitted && !password ? ' has-error' : '') }> 
            <Form.Field>
              <label className="label-form"> Contraseña </label>
              <Form.Input
                type="password"
                placeholder="password"
                onChange={this.handleChange}
                name="password"
                value={password}
                required
              />
              {submitted && !password &&
                <div className="help-block">Contraseña requerida</div>
              }
            </Form.Field>
          </div>

          <div className="form-group">
            <br/>
            <Button className="btn btn-primary" type="submit" onClick={ () => this.handleRedirect() }>
              Iniciar sesion
            </Button>
          </div>
          <br/>
          <div className="User">
            <button className="btn" onClick={ () => this.handleRedirectUser() }>
              Soy un usuario
            </button>
          </div>

      </Form>
    );
  }
}

export default withRouter(Login);
