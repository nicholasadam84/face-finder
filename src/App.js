import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
      id: '',
      name: '',
      email: '',
      password: '',
      entries: 0,
      joined: '',
  }
}

class App extends Component {
  constructor() {
    super();
      this.state = initialState;
  }

  loadUser = (data) => {
    const { id, name, email, entries, joined } = data;
    this.setState(
      {user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined
      }}
    )
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
    //calculatFaceLocation() above returns the Object that displayFacebox() needs to set state.

    console.log(box);
    this.setState({ box: box }); 
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onClickSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    //app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    fetch('https://glacial-dusk-80087.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
        })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://glacial-dusk-80087.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(
              {
                id: this.state.user.id
              }
            )
          })
            .then(response => response.json())
            .then(count => this.setState(Object.assign(this.state.user, { entries: count })))
            .catch(console.log);
        }
        this.displayFacebox(this.calculateFaceLocation(response))
      }) 
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    return (
      <div className="App">
        <Navigation 
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        { this.state.route === 'home'
          ? <>
            <Logo />
            <Rank
              name={this.state.user.name} 
              entries={this.state.user.entries} 
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onClickSubmit={this.onClickSubmit}
            />
            <FaceRecognition 
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            />
            </>
          : (
            this.state.route === 'signin'
            ? <Signin 
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} /> 
            : <Register 
                loadUser={this.loadUser} 
                onRouteChange={this.onRouteChange} 
              />
            )
          }
    </div>
    );
}
}

export default App;
