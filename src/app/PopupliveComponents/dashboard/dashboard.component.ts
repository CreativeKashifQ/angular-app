
import { Component, Inject, OnInit } from '@angular/core';
import {environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { DOCUMENT } from '@angular/common';
import * as turf from '@turf/turf'
import { AccountService } from 'src/app/Services/account.service';
import { Router } from '@angular/router';
import {  NgComponent } from '../../Helper/ng-component'
import * as moment from 'moment';
import { EventService } from 'src/app/Services/event.service';
import { Filter } from './filter.model';
import { Geolocation } from '@capacitor/geolocation';



interface IResponse<T> {
  records: T[]
}


interface IEvent {
  category: string
  created_at: string
  date: string
  end_time: string
  id: number
  name: string
  place_latlng: string
  place_name: string
  roles: string
  start_time: string
  status: string
  updated_at: string
  url: string
  user_id: string
}

interface ICategory {
  category: string
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends NgComponent implements OnInit{

  filter = new Filter();
  events !: IEvent[]
  markers: any[] = []
  categories !: ICategory[]
  selectedRadius: number = 5
  appliedRadius !: number | null
  selectedRadiusUnit: any = 'miles'
  geoLocateCenter: any
  dateRange: any
  map!: mapboxgl.Map;
  moment: any = moment
  current_lat !: number
  current_lng !: number



  constructor(@Inject(DOCUMENT) private readonly document: HTMLDocument,
    private accountService: AccountService, private router: Router, private eventService: EventService) {
    super();
    this.document = document

  }





  applyFilter() {

    if (this.selectedRadiusUnit == 'meters') {
      this.appliedRadius = this.selectedRadius * 1000;
    } else {
      this.appliedRadius = this.selectedRadius
    }
    let searchRadius = this.makeRadius(this.geoLocateCenter, this.appliedRadius);
    const anySrcImplObj: any = this.map.getSource('search-radius');
    anySrcImplObj.setData(searchRadius);

    this.filter.start_date = moment(this.dateRange.startDate).format('l')
    this.filter.end_date = moment(this.dateRange.endDate).format('l')

    if (this.filter.category != null || (this.filter.start_date != 'Invalid date' || this.filter.end_date != 'Invalid date')) {
      this.eventService.filterEvents(this.filter).subscribe(
        (res) => {
          const response = res as IResponse<IEvent>;
          this.events = response.records;
          console.log(this.events);

          this.renderEventsOnMap();
        },
        (ex) => console.log(ex)
      )
    }


  }


  renderEventsOnMap(): void {
    this.markers?.forEach(marker => marker.remove())
    if(this.events != null)
    for (const event of this.events) {

      // create a HTML element for each feature
      const markerEl = document.createElement('div');
      markerEl.className = 'marker';
      // make a marker for each feature and add to the map
      let part1 = event.place_latlng.split(',')[0]
      let part2 = event.place_latlng.split(',')[1]
      let place: any = {
        "geometry": {
          "type": "Point",
          "coordinates": {
            "lng": part1,
            "lat": part2
          }

        }
      }

      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(place.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`<a target="_blank" href="${event.url}" style="text-decoration:none; z-index:1000!important;"><div class="mapboxgl-popup-content">
                <h6 class="text-center mx-auto" style="color:#dc3545;">Events Details</h6>
                <strong>Category : ${event.category}</strong>
                <h5 class="m-top" style="margin-top:10px;">${event.name}</h5>
                <div style="padding-top:10px;">
               <h6 style="color:gray;">Happening On - <strong style="font-weight:200;">${event.date}</strong> <br> <strong style="font-weight:200;">${event.start_time} - ${event.end_time} </strong></h6>
                </div>
                </a>
                <a target="_blank" href="${event.url}" class="btn bg-primary text-light btn-sm p-2 m-2 ">Buy Ticket</a>`)
        )
        .addTo(this.map);
      this.markers.push(marker);
    }


  }
 loadcurrentLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.current_lat = coordinates.coords.latitude;
    this.current_lng = coordinates.coords.longitude;
  };

  ngOnInit(): void {

    this.loadcurrentLocation();

    //fatch events to show on map
    this.eventService.showEvents().subscribe(
      (res) => {
        const response = res as IResponse<IEvent>;
        this.events = response.records;
      },
      (ex) => this.handleException(ex)
    )
    //fetch distinct categories to show
    this.eventService.showCategories().subscribe(
      (res) => {
        const response = res as IResponse<ICategory>;
        this.categories = response.records;

      },
      (ex) => this.handleException(ex)
    )
    //map initialize
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
      zoom: 2, // starting zoom
      center: [0, 0],
      accessToken: 'pk.eyJ1IjoicmF2ZXdpemFyZHMiLCJhIjoiY2t3YTQxMXdmMmg3MDJ3cGRtcnpoY3ZycSJ9.eVEp1YFYNMKLiK_v43UF3w'
    });



    // Add the control to the map(input field for location search).
    var geocoder = new MapboxGeocoder({
      accessToken: 'pk.eyJ1IjoicmF2ZXdpemFyZHMiLCJhIjoiY2t3YTQxMXdmMmg3MDJ3cGRtcnpoY3ZycSJ9.eVEp1YFYNMKLiK_v43UF3w'
    })
    // add geocoder input search field on outside the map
    this.map.addControl(geocoder);
    this.document.getElementById('geocoder')?.appendChild(geocoder.onAdd(this.map));
    // geocoder event  emit and result is listener who listen the geocoder search results
    const instance = this

    geocoder.on('result', function (e) {
      instance.geoLocateCenter = e.result.center;
      let searchRadius = instance.makeRadius(instance.geoLocateCenter, instance.selectedRadius);

      const anySrcImplObj: any = instance.map.getSource('search-radius');
      anySrcImplObj.setData(searchRadius);
    })

    //Add the control to the map(current location control).
    //current location control
    // Add geolocate control to the map.
    // Initialize the geolocate control.
    let geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: false
      },
      trackUserLocation: true
    });
    // Add the control to the map.
    instance.map.addControl(geolocate);
    //add geolocate icon outside the map using DOM
    this.document.getElementById('geolocate')?.appendChild(geolocate.onAdd(instance.map));
    //when map load geolocate will be trigger map will show user current loaction
    instance.map.on("load", function () {
      geolocate.trigger();
    });

    //locate user and get current lat lng to show map initial radius
    geolocate.on("geolocate", locateUser);

    function locateUser(e: any) {
      instance.geoLocateCenter = [instance.current_lng, instance.current_lat]
      let searchRadius = instance.makeRadius(instance.geoLocateCenter, instance.selectedRadius);
      const anySrcImplObj: any = instance.map.getSource('search-radius');
      anySrcImplObj.setData(searchRadius);

    }

    function locateCustom(prevCenter: any) {
      const geoLocateCenter = prevCenter

      instance.map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center: geoLocateCenter,
        zoom: 10,
        bearing: 0,

        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 2, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: (t) => t,

        // this animation is considered essential with respect to prefers-reduced-motion
        essential: true
      });

    }

    //when map load add markers and popup with html on locations getting from database api events api
    instance.map.on('load', function () {
      //Backend listen loadEventsOnMap Event and dispatch all events with events-updated listener, all events will available from
      //database on the map...

      instance.renderEventsOnMap();
      ///**************************************LAYERS*********************/////
      //  LAYERS FOR MAP // Draw the alien search radius on the map when getSource Method call
      ///****************************************************************************/////

      instance.map.addLayer({
        id: 'search-radius',
        source: {
          type: 'geojson',
          data: {
            "type": "FeatureCollection",
            "features": []
          }
        },
        type: 'fill',
        paint: {
          'fill-color': '#F60038',
          'fill-opacity': 0.2
        }
      });
    });

  }

  ///**************************************HELPER FUNCTIONS*********************/////
  //  HELPER FUNCTIONS FOR MAP    //makeRadius function goes here!
  //****************************************************************************///////
  makeRadius(lngLatArray: any, radius: any) {
    var point = turf.point(lngLatArray!);
    var buffered = turf.buffer(point, radius!, {
      units: this.selectedRadiusUnit
    });
    return buffered;
  }








}
