import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';




@IonicPage()
@Component({
  selector: 'page-attendance-view',
  templateUrl: 'attendance-view.html',
})
export class AttendanceViewPage {

  selectedCourse: any;
  list_course = [];
  year: any;
  month: any;
  entryNo: any;
  infos = [];

  constructor(private app: App,
    private alertCtrl: AlertController, private fireauth: AngularFireAuth, private firedata: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    const auth = this.fireauth.auth;
    const database = this.firedata.database;
    var temp_user = auth.currentUser.email.toUpperCase();
    this.entryNo = temp_user.split("@")[0];
    console.log(this.entryNo);
    database.ref('/students/').child(this.entryNo).child("courseRegistered").once("value", snapshot => {
      snapshot.forEach(child => {
        var temp = child.key
        this.list_course.push(temp);
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceViewPage');
  }

  logout() {
    const auth = this.fireauth.auth;

    if (auth.currentUser != null) {
      let alert = this.alertCtrl.create({
        title: 'Confirm Sign Out',
        message: 'Do you want to sign Out?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {

            }
          },
          {
            text: 'Sign Out',
            handler: () => {
              auth.signOut().then(() => {
                this.app.getRootNav().setRoot(LoginPage);
                // Sign-out successful.
              }, function (error) {
                // An error happened.
              });
            }
          }
        ]
      });
      alert.present();
    };
  }

  showAttendance() {
    const database = this.firedata.database;
    database.ref('/students/').child(this.entryNo).child('attendance').child(this.selectedCourse).once('value').then(snapshot => {
      snapshot.forEach(child => {
        if (child.key.startsWith(this.year + this.month)) {
          var temp_info = {}
          temp_info["date"] = child.key.substring(0, 4) + "-" + child.key.substring(4, 6) + "-" + child.key.substring(6, 8);
          temp_info["from"] = child.key.substring(8, 10) + ":" + child.key.substring(10, 12);
          temp_info["to"] = child.key.substring(12, 14) + ":" + child.key.substring(14, 16);
          if (child.val() == 1) {
            temp_info["present"] = true;
          }
          else {
            temp_info["present"] = false;
          }
          this.infos.push(temp_info);
        }
      });
    })
  }

}
