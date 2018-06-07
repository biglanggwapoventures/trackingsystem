import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './../../app/constants'
import { Storage } from '@ionic/storage';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello LoginProvider Provider');
  }
  
  attempt(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(API.url('login'), {
        username, password
      }).subscribe(response => {
        this.storage.set('user', response['data']);
        resolve(response['data'])
      }, err => {
        if(err.status === 422){
          reject('Invalid username or password')
        }else{
          reject('Internal server error. Please contact developer')
        }
      });
    })
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.storage.get('user').then((user) => {
        if(user){
          resolve(user)
        }else{
          reject(null)
        }
      }, () => {
        reject(null)
      });
    })
  }

  logout() {
    return this.storage.remove('user')
  }


}
