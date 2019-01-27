import { ShowAttendancePage } from './../show-attendance/show-attendance';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, App, ActionSheetController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-attendance-mark',
  templateUrl: 'attendance-mark.html',
})
export class AttendanceMarkPage {
  from: any;
  to: any;
  RealDate: any;

  imageURI: any;
  imageFileName: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private transfer: FileTransfer,
    private camera: Camera,
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public http: HttpClient,
    private app: App,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController) {
    this.getDates();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceMarkPage');
  }

  formatTime() {
    var d = new Date(this.from),
      hours = '' + d.getHours(),
      minutes = '' + d.getMinutes();

    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    return [hours, minutes].join(':');
  }

  takePicture(lol) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: lol
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  // refresh(){
  //   let ele = document.getElementById("present-list");
  //   ele.innerHTML +=  `
  //       <ion-item #item class="pagel-background">
  //         <ion-avatar item-start>
  //           <img src="assets/imgs/avatar.png">
  //         </ion-avatar>
  //         <h2>hello world</h2>
  //     </ion-item>`;
  // }

  presentOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  uploadFile() {
    const auth = this.fireauth.auth;
    const database = this.firedata.database;

    var course = auth.currentUser.email.split("@")[0].toUpperCase();

    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'test',
      fileName: course + ".jpg",
      chunkedMode: false,
      mimeType: "image/jpg",
      headers: {}
    }

    fileTransfer.upload(this.imageURI, 'http://10.10.50.137:8000/predict', options)
      .then((data) => {

        // this.imageFileName = "http:/10.10.50.38:8000/database/tmp/" + course + ".jpg"
        loader.dismiss();
        this.presentToast("Image uploaded successfully");
        var presents = data["present"];
        var absents = data["absent"];
        var date = this.RealDate.split("_");
        var tfrom = this.from.split(":");
        var tto = this.to.split(":");

        var timestamp = date[2] + date[1] + date[0] + tfrom[0] + tfrom[1] + tto[0] + tto[1];
        presents.forEach(element => {
          var temp = {};
          temp[timestamp] = "1";
          database.ref("/students/" + element + "/attendance/" + course).set(temp);
        });
        absents.forEach(element => {
          var temp = {};
          temp[timestamp] = "0";
          database.ref("/students/" + element + "/attendance/" + course).set(temp);
        });
        this.navCtrl.push(ShowAttendancePage, { "presents": presents, "absents": absents });
      }, (err) => {
        console.log(err);
        loader.dismiss();
        this.presentToast(err);
      });
  }

  uploadFile2() {
    var url = 'http://10.10.50.137:8000/demo';
    const auth = this.fireauth.auth;
    const database = this.firedata.database;

    var course = auth.currentUser.email.split("@")[0].toUpperCase();

    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const body = JSON.stringify({});
    var data2 = this.http.post(url, body, httpOptions);
    data2.subscribe(data => {
      console.log(data);
      var presents = data["present"];
      var absents = data["absent"];
      var date = this.RealDate.split("_");
      var tfrom = this.from.split(":");
      var tto = this.to.split(":");

      var timestamp = date[2] + date[1] + date[0] + tfrom[0] + tfrom[1] + tto[0] + tto[1];
      presents.forEach(element => {
        var temp = {};
        temp[timestamp] = "1";
        database.ref("/students/" + element + "/attendance/" + course).set(temp);
      });
      absents.forEach(element => {
        var temp = {};
        temp[timestamp] = "0";
        database.ref("/students/" + element + "/attendance/" + course).set(temp);
      });
      this.navCtrl.push(ShowAttendancePage, { "presents": presents, "absents": absents });
    });

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  assignTime() {
    var url = 'http://worldclockapi.com/api/json/utc/now';
    var onlineTime;

    return new Promise(resolve => {
      this.http.get(url).subscribe(data => {
        var tt = data;//.currentDateTime;
        onlineTime = tt['currentDateTime'];
        resolve(onlineTime);
      });
    });
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

  async getDates() {
    var time;
    time = await this.assignTime();
    var today = new Date(time);
    var date, month, year, currDate;
    month = today.getMonth() + 1;
    year = today.getFullYear();

    if (month > 9)
      currDate = month + "_" + year;
    else
      currDate = "0" + month + "_" + year;

    if (today.getDate() > 9)
      date = "" + today.getDate();
    else
      date = "0" + today.getDate();

    this.RealDate = date + "_" + currDate;
  }
}
