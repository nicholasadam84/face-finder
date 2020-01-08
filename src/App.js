import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '95c11a19fd574356a072b07f34f52664'
 });

class App extends Component {
  constructor() {
    super();
      this.state = {
        input: '',
        imageUrl: '',
        box: {}
      }
  }

  calculateFaceLocation = (data) => {
    //console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(clarifaiFace);
    //console.log(width, height);
    return {
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      rightCol: width - (clarifaiFace.right_col * width) 
    }
  }

  displayFacebox = (box) => {
    //ES6 allows just {box}. Leaving {box: box} for clarity for now.
    console.log(box);
    this.setState({ box: box }); 
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onClickSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      //calculatFaceLocation() returns the Object that displayFacebox() needs to set state.
      .then(response => this.displayFacebox(this.calculateFaceLocation(response))) 
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onClickSubmit={this.onClickSubmit}
        />
        <FaceRecognition 
          imageUrl={this.state.imageUrl}
          box={this.state.box}
        />
    </div>
    );
  }
}

export default App;
