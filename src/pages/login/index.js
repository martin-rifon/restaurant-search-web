import { Button, Form, FormGroup, Input, Container, Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { login } from '../../actions/user/';

import './index.css';

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: 'test_automation_000@pedidosya.com',
      password: 'abc1234',
    };
  }

  onInput = (element, value) => {
    const newState = {};
    if (value) {
      newState[element] = value;
    } else {
      newState[element] = '';
    }

    this.setState(newState);
  };

  onEmailInput = ({ target: { value } }) => {
    this.onInput('email', value);
  };

  onPasswordInput = ({ target: { value } }) => {
    this.onInput('password', value);
  };

  onLogin = () => {
    const { login } = this.props;
    const { email, password } = this.state;
    login(email, password);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <Container style={{ textAlign: 'center' }}>
          <Row style={{ marginBottom: '5em', marginTop: '1em' }}>
            <Col>
              <h1>Login</h1>
            </Col>
          </Row>
          <Row>
            {
              this.props.error &&
              <Col md={{ size: 4, offset: 4 }}>
                <Alert color="danger">
                  Usuario o contraseña incorrectos.
                </Alert>
              </Col>
            }

            <Col md={{ size: 4, offset: 4 }}>
              <Form>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Ingresa tu email..."
                    value={email}
                    onInput={this.onEmailInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Ingresa tu contraseña..."
                    value={password}
                    onInput={this.onPasswordInput}
                  />
                </FormGroup>

                <Button onClick={this.onLogin}>Iniciar sesion</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapPropsFromState = (state) => ({ error: state.user.error });

const mapActionsToProps = {
  login,
};

export default connect(mapPropsFromState, mapActionsToProps)(Login);
