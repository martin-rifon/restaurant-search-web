import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import queryString from 'query-string';

import { searchRestaurants } from '../../actions/map/';

import restaurantIcon from '../../static/icons/restaurant.png';
import houseIcon from '../../static/icons/house.png';
import './index.css';

class Map extends Component {
  constructor (props) {
    super(props);

    const viewport = {
      width: 800,
      height: 600,
      latitude: -34.906483,
      longitude: -56.199757,
      zoom: 12,
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        viewport.latitude = position.coords.latitude;
        viewport.longitude = position.coords.longitude;

        this.setState({
          ...this.state,
          foundHome: true,
          homeLat: position.coords.latitude,
          homeLng: position.coords.longitude,
          viewport: {
            ...this.state.viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      });
    }

    this.state = {
      viewport,
      foundHome: false,
      homeLat: null,
      homeLng: null,
      popupInfo: null,
    };

    const parsedSearch = queryString.parse(window.location.search);
    if (parsedSearch.lat && parsedSearch.lng) {
      this.props.searchRestaurants(parsedSearch.lng, parsedSearch.lat);
    }
  }

  onMapClick = event => {
    this.props.searchRestaurants(event.lngLat[0], event.lngLat[1]);
  };

  restaurantsToMarkers = (restaurants = []) => restaurants.map(restaurant => (
      <Marker
        latitude={restaurant.lat}
        longitude={restaurant.lng}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <div onClick={() => this.setState({ popupInfo: restaurant })}>
          <img src={restaurantIcon} width={25} height={25} alt={restaurant.name} />
        </div>
      </Marker>
    )
  );

  renderPopup = () => {
      const {popupInfo} = this.state;

      return popupInfo && (
        <Popup tipSize={5}
          anchor="top"
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          onClose={() => this.setState({popupInfo: null})}
        >
          <div style={{ background: 'white', padding: '10px', textAlign: 'center' }}>
            <img src={popupInfo.logo} height='100px' width='100px' alt={popupInfo.name} />
            <p style={{ margin: '0em' }}>{ popupInfo.name }</p>
            <p style={{ margin: '0em' }}>Categorias: { popupInfo.topCategories }</p>
            <p style={{ margin: '0em' }}>Rating: { popupInfo.rating }</p>
            <p style={{ margin: '0em' }}>Tiempo de entrega: { popupInfo.deliveryTimeMaxMinutes } minutos</p>
            <a href={popupInfo.link} target="_blank">Sitio web</a>
          </div>
        </Popup>
      );
    }

  homeToMarker = ({ homeLat, homeLng }) => (
    <Marker
      latitude={homeLat}
      longitude={homeLng}
      offsetLeft={-20}
      offsetTop={-10}
    >
      <img src={houseIcon} width={30} height={43} alt='Tu ubicacion' />
    </Marker>
  );

  render() {
    const accessToken = 'pk.eyJ1IjoibWFydGluLXJpZm9uIiwiYSI6ImNqbGF3bmcwNTQ4bTMza3F0N2hhcWhlZj' +
      'AifQ.bjBfenD_8pQexDuXBnHW5Q';
    const homeMarker = this.state.foundHome ? [this.homeToMarker(this.state)] : [];
    const markers = this.restaurantsToMarkers(this.props.results).concat(homeMarker);

    return (
      <div>
        <Container style={{ textAlign: 'center' }}>
          <Row style={{ marginBottom: '3em', marginTop: '1em' }}>
            <Col>
              <h1>Busqueda</h1>
            </Col>
          </Row>
          <Row style={{ marginBottom: '2em' }}>
            <Col>
              <span>Bienvenido { this.props.user.name } { this.props.user.lastName }</span>
            </Col>
          </Row>
        </Container>

        <div style={{ marginLeft: '20%', marginBottom: '1em' }}>
          <ReactMapGL
            {...this.state.viewport}
            mapboxApiAccessToken={accessToken}
            onViewportChange={(viewport) => this.setState({ viewport })}
            onClick={this.onMapClick}
          >
            { markers }
            { this.renderPopup() }
          </ReactMapGL>
        </div>
      </div>
    );
  }
}

const mapPropsFromState = state => ({ results: state.map.results, user: state.user.data });

const mapActionsToProps = {
  searchRestaurants,
};

export default connect(mapPropsFromState, mapActionsToProps)(Map);
