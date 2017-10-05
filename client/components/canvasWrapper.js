import React, { Component } from 'react';

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
      enlargeYourContainer: true
    });
  }

  render () {
    var boardStyle = {
      width: '800px',
      height: '600px',
    };

    console.log('them props', this.props);

    const handleChange = this.handleChange;

    return (
      <div>
        <div id='drawingBoard' style={boardStyle}></div>
        <form>
          <input
            id='title'
            type="text"
            name="name"
            value= {this.state.name}
            placeholder="Enter title"
            onChange={handleChange} />
        </form>
      </div>
    );
  }
}
