import { Component, OnInit } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent extends OnInit {
  name = 'Angular';
  map: L.Map;

  ngOnInit() {
    this.map = L.map('map').fitWorld();

    L.tileLayer('https://api.this.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'this.map data &copy; <a href="https://www.openstreetthis.map.org/">OpenStreetthis.map</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.this.mapbox.com/">this.mapbox</a>',
      id: 'this.mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    this.map.on('locationfound', this.onLocationFound);
    this.map.on('locationerror', this.onLocationError);

    this.map.locate({setView: true, maxZoom: 16});
  }

  onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(this.map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(this.map);
  }

  onLocationError(e) {
    alert(e.message);
  }
}
