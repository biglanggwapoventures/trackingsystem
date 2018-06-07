import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, Alert, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginProvider } from './../../providers/login/login';
import { OrderListProvider } from './../../providers/order-list/order-list';
import { OrderDetailsPage } from './../order-details/order-details';

/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
  providers: [LoginProvider, OrderListProvider],
})
export class OrderListPage {

  private loading: Loading
  private user
  private orders


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage, 
    private loadingCtrl: LoadingController,
    private loginService: LoginProvider,
    private alertCtrl: AlertController,
    private orderListService: OrderListProvider,
    private modalCtrl: ModalController
  ) {
    this.user = this.navParams.get('user')
    
  }

  ionViewWillEnter() {
    
    this.fetchOrders()
  }

  showDetails(orderId) {
    this.navCtrl.push(OrderDetailsPage, {
      order: this.orders.find(item => item.id === orderId)
    })
  }


  fetchOrders () {
    this.loading = this.loadingCtrl.create({
      content: 'Retrieving list of orders..',
      dismissOnPageChange: true
    })
    this.loading.present()
    this.orderListService.getList(this.user['id'])
      .then(orders => {
        this.orders = orders
        this.loading.dismiss()
      }, err => {
        this.alertCtrl.create({
          title: 'Error',
          message: 'An error has occured',
          buttons: [{
            text: 'Retry',
            handler: () => {
              this.fetchOrders()
            }
          }]
        }).present()
      })
  }

  statusBadgeColor(status) {
    switch(status){
      case 'delivered': return 'primary'
      case 'processed': return 'secondary'
    }
  }
}
