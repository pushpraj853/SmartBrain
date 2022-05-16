import React, { Component } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";
import FaceRecognition from './Component/FaceRecognition/FaceRecognition';
import Navigation from './Component/Navigation/Navigation';
import Signin from './Component/Signin/Signin';
import Register from './Component/Register/Register';
import Logo from './Component/Logo/Logo';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm';
import Rank from './Component/Rank/Rank';
import './App.css';

const particlesInit = async (main) => {
  console.log(main);
  await loadFull(main);
};

const particlesLoaded = (container) => {
  console.log(container);
};

const initialState ={
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedin: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const calrifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: calrifaiFace.left_col * width,
      topRow: calrifaiFace.top_row * height,
      rightCol: width - (calrifaiFace.right_col * width),
      bottomRow: height - (calrifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://radiant-citadel-31670.herokuapp.com/imageUrl', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
        input: this.state.input,
        })
      })
      .then(response =>  response.json())
        .then(response => {
          if (response) {
            fetch('https://radiant-citadel-31670.herokuapp.com/img', {
              method: 'PUT',
              headers: {'content-type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id,
              })
            })
            .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries: count}))
              })
              .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
          }
        )
        .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    }
    else if (route === 'home') {
      this.setState({isSignedin: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles
          className='particles'
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  // enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 60,
                  duration: 1.0,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
        <Navigation isSignedin = {this.state.isSignedin} onRouteChange={this.onRouteChange}/>
        {
        this.state.route === 'home' 
        ? <div>
            <Logo />
            <Rank 
              name={this.state.user.name} 
              entries={this.state.user.entries} 
            />
            <ImageLinkForm  
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} 
            />
            <FaceRecognition 
              box={this.state.box} 
              imageUrl={this.state.imageUrl}
            />
          </div>
        : (
          this.state.route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          ) 
        }
      </div>
    );
  }

}

export default App;