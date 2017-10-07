import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postUser} from '../store';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
      <div>
        <div className="temp">
        <div>
            <div className="header">
              <a href="#" className="active" id="login-box-link">SignUp</a>
            </div>
            <form className="email-login" onSubmit={this.props.handleSubmit}>
              <div>
                <input
                  type="name"
                  name="name"
                  value={this.state.name}
                  placeholder="Name"
                  onChange={handleChange} />
              </div>
              <div className="email-input">
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={handleChange} />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={handleChange} />
              </div>
              <div>
                <button>Sign Up</button>
              </div>
            </form>
        </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(event){
      event.preventDefault();
      const name = event.target.name.value;
      const email = event.target.email.value;
      const password = event.target.password.value;

      dispatch(postUser( {
        name,
        email,
        password
      } ));
    }
  };
};

export default connect(null, mapDispatchToProps)(Signup);
