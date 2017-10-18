import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

export default class CanvasWrapper extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const value = event.target.value;

    this.setState({
      [event.target.name]: value
    });
  }

  componentDidMount(){
    var customBoard = new DrawingBoard.Board('drawingBoard', {
      controls: [
        'Color',
        { Size: { type: 'range' } },
        { DrawingMode: { filler: true } },
        'Navigation',
        'Upload'
      ],
      size: 1,
      webStorage: 'session',
      enlargeYourContainer: true,
      droppable: true
    });
  }

  render () {
    var boardStyle = {
      width: '800px',
      height: '600px',
    };

    function getMatchObj(match) {
      let current = match.slice(1).split('=');
      return { [current[0]]: current[1] };
    }

    var idObject = getMatchObj(this.props.location.search.toString());

    var galId = idObject['galleryid']; // DO NOT SWITCH TO DOT NOTATION - doesn't work in this case
    var userId;

    // Try to get userId from jwt (if it exists), else route user to signin page
    try {
      userId = jwt_decode(localStorage.getItem('jwt')).userId;
    } catch (err) {
      this.props.history.push('/signin');
    }

    const handleChange = this.handleChange;

    return (
      <div>
        <div id="galleryId" title={galId} />
        <div id="userId" title={userId} />

        <div id="name-form-wrapper">
          <form id="paintingNameForm" onSubmit={(evt) => evt.preventDefault()}>
            <h2>Name Your Masterpiece</h2>
            <input
              id="title"
              type="text"
              name="name"
              value= {this.state.name}
              placeholder="Enter title"
              onChange={handleChange}
              style={{backgroundColor: 'grey', borderColor: 'black', fontSize: '16px'}} />
          </form>
        </div>

        <div id='drawingBoard' style={boardStyle}></div>

      </div>
    );
  }
}
