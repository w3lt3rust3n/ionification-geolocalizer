import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Map, tileLayer, marker } from 'leaflet';
import { NativeGeocoder, NativeGeocoderOptions } from "@ionic-native/native-geocoder/ngx";

@Component({
  selector: 'app-pickup-location',
  templateUrl: './pickup-location.page.html',
  styleUrls: ['./pickup-location.page.scss'],
})
export class PickupLocationPage implements OnInit {

  map:Map;
  newMarker:any;
  adress:string[];
  constructor( private router:Router, private geocoder:NativeGeocoder ) { }

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    this.map = new Map("mapId").setView([17.3850, 78.4867], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
  ngOnInit() {
  }

  getAdress(lat:number, long:number) {
    let options:NativeGeocoderOptions={
      useLocale:true,
      maxResults:5
    };
    this.geocoder.reverseGeocode(lat,long,options).then(
      results => {this.adress = Object.values(results[0]).reverse();}
      );
  }

  goBack() {
    this.router.navigate(['home']);
  }

  locatePosition() {
    this.map.locate({setView:true}).on("locationfound", (e:any)=>{
      this.newMarker = marker([e.latitude,e.longitude], {
        draggable:true }).addTo(this.map);
        this.newMarker.bindPopup("Vous êtes ici !").openPopup();
        this.newMarker.on("dragend", () => {
          const position = this.newMarker.getLatLag();
        });
      });
    }
    confirmPickUpLocation() {

    }
  }




