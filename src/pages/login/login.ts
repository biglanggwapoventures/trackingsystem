import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, LoadingController, Loading, AlertController } from 'ionic-angular';
import { LoginProvider }  from './../../providers/login/login';
import { OrderListPage } from './../order-list/order-list';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginProvider]
})
export class LoginPage {

  private loading: Loading;
  // private alert: Alert;
  
  private user = {
    username: null,
    password: null
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loginService: LoginProvider, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Setting things up. Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    this.loginService.getUser()
      .then(user => {
        this.navCtrl.setRoot(OrderListPage, {user})
      }, err => {
        this.loading.dismiss()
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.loading = this.loadingCtrl.create({
      content: 'Logging in... Please wait...',
      dismissOnPageChange: true
    })
    this.loading.present()
    this.loginService.attempt(this.user.username, this.user.password)
      .then(user => {
        console.log('login susccessful')
        this.navCtrl.setRoot(OrderListPage, {user})
      }, err => {
        this.loading.dismiss();
        this.alertCtrl.create({
          title: 'Login error',
          message: err,
          buttons: ['Retry']
        }).present()
      })
  }


}
