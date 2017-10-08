import React, {Component} from 'react';
import {connect} from 'react-redux';
import {attemptAuth} from '../store';
import {FormGroup, FormControl, ControlLabel, Form, Col, Button} from 'react-bootstrap';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const value = event.target.value;

    this.setState({
      [event.target.name]: value
    });
  }

  render(){
    const handleChange = this.handleChange;

    return (
        <Form horizontal className="formBoxLogin" onSubmit={(event) => this.props.handleSubmit(event, this.props.history)}>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={3}>
            Email
          </Col>
          <Col sm={9}>
            <FormControl
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={handleChange}
              style={{backgroundColor: 'grey', color: 'lightgreen'}} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={3}>
            Password
          </Col>
          <Col sm={9}>
            <FormControl
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={handleChange}
              style={{backgroundColor: 'grey', color: 'lightgreen'}} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={9}>
            <Button type="submit">
              Sign In
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(event, history){
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;

      dispatch(attemptAuth( {
        email,
        password,
        strategy: 'local'
      }, history ));
    }
  };
};

export default connect(null, mapDispatchToProps)(Signin);
