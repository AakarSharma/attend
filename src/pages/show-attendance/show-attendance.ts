import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShowAttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-attendance',
  templateUrl: 'show-attendance.html',
})
export class ShowAttendancePage {

  presents: any;
  absents: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.presents = this.navParams.get("presents");
    this.absents = this.navParams.get("absents");
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowAttendancePage');
  }

}
