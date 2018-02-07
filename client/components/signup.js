import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postUser} from '../store';
import {FormGroup, FormControl, ControlLabel, Form, Col, Button} from 'react-bootstrap';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordCheck:'',
      warning: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.passwordCheckAndSubmit=this.passwordCheckAndSubmit.bind(this);
  }

  handleChange(event){
    const value = event.target.value;

    this.setState({
      [event.target.name]: value
    });
  }
  passwordCheckAndSubmit(evt){
    evt.preventDefault();
    console.log('password',this.state.password);
    console.log('passwordCheck',this.state.passwordCheck);
    if(this.state.password !== this.state.passwordCheck){
    this.setState({warning: true});
    }else {
      this.props.handleSubmit(evt,this.props.history);
    }
  }

  render(){
    const handleChange = this.handleChange;

      return (
        <Form horizontal className="formBoxLogin" onSubmit={
          // (evt) => this.props.handleSubmit(evt, this.props.history)
          (evt)=>this.passwordCheckAndSubmit(evt)
        }>

        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={3}>
            Name
          </Col>
          <Col sm={9}>
            <FormControl
              type="name"
              name="name"
              value={this.state.name}
              placeholder="Name"
              onChange={handleChange}
              style={{backgroundColor: 'grey', color: 'lightgreen'}} />
          </Col>
        </FormGroup>

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

        <FormGroup controlId="formHorizontalPasswordCheck">
        <Col componentClass={ControlLabel} sm={3}>
          Re-Enter Password
        </Col>
        <Col sm={9}>
          <FormControl
            type="password"
            name="passwordCheck"
            value={this.state.passwordCheck}
            placeholder="Re-enter Password"
            onChange={handleChange}
            style={{backgroundColor: 'grey', color: 'lightgreen'}} />
        </Col>
      </FormGroup>

        {this.state.warning ? <h5 style={{color:'red'}}>Passwords do not match</h5>:null}

        <FormGroup>
          <Col smOffset={2} sm={9}>
            <Button type="submit">
              Sign Up
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

      const user = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value
      };

      dispatch(postUser(user, history));
    }
  };
};

export default connect(null, mapDispatchToProps)(Signup);
