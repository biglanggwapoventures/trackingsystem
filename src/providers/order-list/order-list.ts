import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './../../app/constants'

/*
  Generated class for the OrderListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderListProvider {

  constructor(public http: HttpClient) {
    console.log('Hello OrderListProvider Provider');
  }

  getList(userId) {
    return new Promise((resolve, reject) => {
      this.http.get(API.url(`driver/${userId}/orders`))
      .subscribe(response => {
        resolve(response['data'])
      }, err => {
        reject()
      })
    })
  }

  setStatus(orderId: number, status: string) {
    return new Promise((resolve, reject) => {
      this.http.post(API.url('order'), {
        'id': orderId,
        'status': status
      })
      .subscribe(response => {
        resolve(status)
      }, err => {
        reject()
      })
    })
  }

  

}
