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
        imageUrl: ''
      }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onClickSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(
        function(response) {
          console.log('response', response.outputs[0].data);
          console.log('response', response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {
          console.log('err', err);
        }
      );
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
        <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
    );
  }
}

export default App;
