import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { SendLocationProvider } from './../send-location/send-location'; 

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {

  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  public personnelId = null;
  public orderId = null;
 
  constructor(public zone: NgZone,  public backgroundGeolocation: BackgroundGeolocation, public geolocation: Geolocation, public locationSender: SendLocationProvider) {
 
  }
 
  startTracking(orderId:number, personnelId: number) {
    this.orderId = orderId
    this.personnelId = personnelId
 
    // Background Tracking
   
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: false,
      interval: 10000,
      stopOnTerminate: false
    };
   
    this.backgroundGeolocation.configure(config).subscribe((location) => {
   
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
   
        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = location.latitude;
          this.lng = location.longitude;
          this.locationSender.send(this.lat, this.lng, this.orderId, this.personnelId);
        });
    
      }, (err) => {
    
        console.log(err);
    
      });
    
      // Turn ON the background-geolocation system.
      // this.backgroundGeolocation.start();
      this.getForegroundCoords();
   
  }
 
  stopTracking() {

 
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }

  getForegroundCoords () {
        // Foreground Tracking
    
        let options = {
          frequency: 3000,
          enableHighAccuracy: true
        };
      
        this.watch = this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      
        console.log(position);
      
        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.locationSender.send(this.lat, this.lng, this.orderId, this.personnelId);
          setTimeout(() => {
            this.getForegroundCoords();
          }, 10000);
        });
     
      });
  }

}
