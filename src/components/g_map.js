import React, {Component} from 'react';

export default class GMap extends Component {
  shouldComponentUpdate(){
    return false;
  }

  componentWillReceiveProps(nextProps){
    let {latitude, longitude , name, sales} = nextProps.lastSale;
    let location = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
    this.marker = new google.maps.Marker({
      position: location,
      icon: {
  			path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
  			fillColor: 'hotpink',
  			fillOpacity: 1,
  			strokeColor:'white',
  			strokeWeight: 1
  		},
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: name + ': ' + sales + ' gums'
    });
  }

  componentDidMount(){
    let centerOfMap = {lat:36.778259, lng: -119.417931};
	  this.map = new google.maps.Map(this.refs.map, {
  		center : centerOfMap,
      mapTypeControl: false,
      streetViewControl: false,
      scrollwheel:  false,
  		zoom : 5
  	});
  }

  render(){
    return(
      <div className="col">
        <h4>Stores' location</h4>
          <div id='map' ref='map'/>
      </div>
    );
  }
}
