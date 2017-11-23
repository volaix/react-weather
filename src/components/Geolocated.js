import React from 'react';
import { geolocated } from 'react-geolocated';

class Demo extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.coords !== this.props.coords) {
      this.props.updateLocation(this.props.coords.latitude, this.props.coords.longitude)
    }
  }

  geolocatedDone = () => {
  }
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <table>
            <tbody>
              <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
              <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
            </tbody>
          </table>
          : <div>Getting the location data&hellip; </div>;
  }
}
const mapGeoToProps = () => ({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})
export default geolocated(mapGeoToProps)(Demo);