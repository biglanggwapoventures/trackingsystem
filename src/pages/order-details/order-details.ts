import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { OrderListProvider } from './../../providers/order-list/order-list';
import { TrackLocationProvider } from './../../providers/track-location/track-location';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
  providers: [OrderListProvider]
})
export class OrderDetailsPage {

  private order
  private loading: Loading
  private user
  // protected orderId
  // protected personnedId

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private orderService: OrderListProvider,
    public locationTracker: TrackLocationProvider,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Loading please wait...',
      dismissOnPageChange: true
    })
    this.storage.get('user')
      .then(user => {
        
        this.order = navParams.get('order')
        // this.orderId = this.order['id']
        this.user = user
        // this.personnedId = user['personnel_id']
        this.loading.dismiss()
      }, () => {
        this.alertCtrl.create({
          title: 'Error',
          message: 'An error has occured',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.navCtrl.pop()
            }
          }]
        }).present()
      })
    
  }

  setStatus(status) {
    this.loading = this.loadingCtrl.create({
      content: 'Processing',
      dismissOnPageChange: true
    })
    this.loading.present()
    this.orderService.setStatus(this.order['id'], status)
      .then(status => {
        this.order['status'] = status
        if(status === 'delivered'){
          this.start()
        }else{
          this.stop()
        }
        this.loading.dismiss()
        this.alertCtrl.create({
          title: 'Done',
          message: 'Process completed!',
          buttons: ['Ok']
        }).present()
      })
  }

  start(){
    this.locationTracker.start(this.order['id'], this.user['personnel_id']);
  }
 
  stop(){
    this.locationTracker.stop();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
  }

}
