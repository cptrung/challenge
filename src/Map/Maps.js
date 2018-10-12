import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const mapOptions = {
  styles: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]
};

class Maps extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      directions: []
    }
  }


  componentDidMount() {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route({
      origin: new window.google.maps.LatLng(16.455263, 107.59596929999998),
      destination: new window.google.maps.LatLng(16.4685374, 107.59870849999993),
      travelMode: window.google.maps.TravelMode.DRIVING,
      waypoints: [{
        location: new window.google.maps.LatLng(16.456184, 107.58093600000007),
        // stopover: false
      },
      {
        location: new window.google.maps.LatLng(16.4657437, 107.59208860000001),
        // stopover: false
      }]
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  renderMarker = () => {
    const { markers } = this.props;
    let arrayMarker = [];
    _.forEach(markers, (item, index) => {

      const position = { lat: item.lat, lng: item.lng }
      const icon = { url: item.icon, scaledSize: { width: 32, height: 32 } };

      const marker = <Marker position={position} key={index.toString()} icon ={icon}/>
      arrayMarker.push(marker);
    });
    return arrayMarker;
  }

  render() {
    const { directions } = this.state;
    return (<GoogleMap
      centerAroundCurrentLocation
      defaultZoom={15}
      center={this.props.center}
      options={mapOptions}
    >
      <SearchBox
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      >
        <div>
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
          <button onclick="activateLasers()"> Activate Lasers </button>
        </div>
      </SearchBox>

      {directions && <DirectionsRenderer directions={directions} />}
      <Marker position={this.props.center} />
      {this.renderMarker()}
    </GoogleMap>
    )
  }
};

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCLsHXXsmgBjJ5-9EjM8fVQhpDDJ10jM4M&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
)(Maps);