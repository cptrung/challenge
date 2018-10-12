import _ from "lodash";
import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  MarkerClusterer
} from "react-google-maps";

import Maps from './Maps';

class MapContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      lat: 0,
      lng: 0,
      markers: [{
        lat: 16.4657437,
        lng: 107.59208860000001,
        address: `10 Hùng Vương, Phú Nhuận, Thành phố Huế, Thua Thien Hue, Vietnam`,
        icon: `http://pluspng.com/img-png/png-tel-ka-t-qua-hinh-a-nh-cho-tel-flat-icon-png-700.png`
      },{
        lat: 16.456184,
        lng: 107.58093600000007,
        address: `20 Điện Biên Phủ, Phường Đúc, Thành phố Huế, Thua Thien Hue, Vietnamm`,
        icon: `http://blog.soomla.com/wp-content/uploads/2015/11/email-2-icon.png`
      },{
        lat: 16.4588924,
        lng: 107.59023649999995,
        address: `10 Đống Đa, Thành phố Huế, Thua Thien Hue, Vietnam`,
        icon: `https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/768px-Google_Chrome_icon_%28September_2014%29.svg.png`
      },{
        lat: 16.455263,
        lng: 107.59596929999998,
        address: `300 Phan Chu Trinh, An Cựu, Thành phố Huế, Thua Thien Hue, Vietnam`
      },{
        lat: 16.4685374,
        lng: 107.59870849999993,
        address: `30 Bà Triệu, Phú Hội, Thành phố Huế, Thua Thien Hue, Vietnam`
      },{
        lat: 16.4640598,
        lng: 107.60495379999998,
        address: `50 Tố Hữu, Thành phố Huế, Thua Thien Hue, Vietnam`
      }]
    }
  }

  componentDidMount() {
    this.getGeoLocation()
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        }
      )
    }
  }

  render() {
    const { lat, lng, markers } = this.state;
    return (
      <Maps
        key="map"
        center={{ lat, lng }}
        markers={markers}
      />
    )
  }
}

export default MapContainer;