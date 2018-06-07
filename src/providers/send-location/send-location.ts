import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './../../app/constants'

/*
  Generated class for the SendLocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SendLocationProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SendLocationProvider Provider');
  }

  send (latitude: number, longitude: number, orderId: number, personnelId: number) {
    return new Promise((resolve, reject) => {
      this.http.post(API.url('save-coords'),{
        lat: latitude,
        lng: longitude,
        personnel_id: personnelId,
        order_id: orderId
      }).subscribe(res => {
        resolve(res)
      }, err => {
        reject()
      });
    })
  }

}
