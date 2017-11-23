import React from 'react';
import ReactDOM from 'react-dom';
import Geolocated from './components/Geolocated'
import Display from './components/Display'
import { geolocated } from 'react-geolocated';

class App extends React.Component {
  state = {
    ajax: null,
    geoinfo: {
      lat: 35,
      lon: 130
    },
    geolocated: false
  }

  gettingFcc = () => {
    console.log(`running gettingFCC`);
    const urls = [
      `https://fcc-weather-api.glitch.me/api/current?lat=${this.state.geoinfo.lat}&lon=${this.state.geoinfo.lon}`
    ]
    const grabContent = (url) => fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState(() => ({
          ajax: json,
        }))
      })

    Promise
      .all(urls.map(grabContent))
      .then(() => console.log(`Updated Weather from ${urls}`))
  }
  componentDidMount() {
    this.gettingFcc()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.geoinfo !== this.state.geoinfo) {
      this.gettingFcc()
    }
  }

  updateLocation = (lat, lon) => {
    this.setState(() => ({
      geoinfo: {
        lat,
        lon
      }
    }))
  }

  showGeolocated = () => {
    if (this.state.geolocated) {
      return <Geolocated
        updateLocation={this.updateLocation} />
    }
  }

  handleClickGeolocated = () => {
    this.setState(() => ({ geolocated: true }))
  }

  handleChangeLat = (lat) => {
    const latChange = lat.target.value
    this.setState((prevState) => {
      return {
        geoinfo: {
          ...prevState.geoinfo,
          lat: latChange
        }
      } 
    })
  }

  handleChangeLon = (lonChange) => {
    const lon = lonChange.target.value
    this.setState((prevState) => {
      return {
        geoinfo: {
          ...prevState.geoinfo,
          lon
        }
      } 
    })
  }

  render() {
    return (
      <div>
        <h1>Weather App</h1>
        <button onClick={this.handleClickGeolocated}>My Coordinates are...?</button>
        {this.showGeolocated()}
        {!this.state.ajax && <p>loading weather data...</p>}
        <h3>Coordinates</h3>
        <ul>
          <li>
            <label> Latitude: <input type="text" value={this.state.geoinfo.lat} onChange={this.handleChangeLat} /> </label>
          </li>
          <li>
            <label> Longitude: <input type="text" value={this.state.geoinfo.lon} onChange={this.handleChangeLon} /> </label>
          </li>
        </ul>
        {this.state.ajax && <Display
          weatherInfo={this.state.geoinfo}
          fcc={this.state.ajax}
          updateLocation={this.updateLocation}
        />}
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('app'));