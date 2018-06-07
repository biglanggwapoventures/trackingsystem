import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { OrderListPageModule } from './../pages/order-list/order-list.module'
import { OrderDetailsPageModule } from './../pages/order-details/order-details.module'
import { LoginPageModule } from '../pages/login/login.module';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { SendLocationProvider } from '../providers/send-location/send-location';
import { LoginProvider } from '../providers/login/login';
import { OrderListProvider } from '../providers/order-list/order-list';
import { TrackLocationProvider } from '../providers/track-location/track-location';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    OrderListPageModule,
    OrderDetailsPageModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTrackerProvider,
    BackgroundGeolocation,
    Geolocation,
    SendLocationProvider,
    LoginProvider,
    OrderListProvider,
    TrackLocationProvider,
  ]
})
export class AppModule {}
