import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { SendLocationProvider } from './../send-location/send-location'; 

/*
  Generated class for the TrackLocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TrackLocationProvider {
  
  private orderId
  private personnelId

  constructor(public http: HttpClient, private backgroundGeolocation: BackgroundGeolocation, public locationSender: SendLocationProvider) {
    console.log('Hello TrackLocationProvider Provider');
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };
    this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {

        console.log(location);
        this.locationSender.send(location.latitude, location.longitude, this.orderId, this.personnelId);

        // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        this.backgroundGeolocation.finish(); // FOR IOS ONLY

      });

  }
  
  start (orderId:number, personnelId: number) {
    this.orderId = orderId
    this.personnelId = personnelId
    this.backgroundGeolocation.start();
  }

  stop () {
    this.backgroundGeolocation.stop();
  }

}
