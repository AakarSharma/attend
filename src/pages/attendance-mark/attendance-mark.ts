import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-attendance-mark',
  templateUrl: 'attendance-mark.html',
})
export class AttendanceMarkPage {
  from: Date = new Date();
  to: Date = new Date();
  RealDate: any;

  data: any;

  imageURI: any;
  imageFileName: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private transfer: FileTransfer,
    private camera: Camera,
    private fireauth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public http: HttpClient) {
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

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    const auth = this.fireauth.auth;
    var course = auth.currentUser.email.split("@")[0];

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

    fileTransfer.upload(this.imageURI, 'http://10.10.50.38:8000/predict', options)
      .then((data) => {
        this.data = data;
        console.log(data + " Uploaded Successfully");
        this.imageFileName = "http:/10.10.50.38:8000/database/tmp/" + course + ".jpg"
        loader.dismiss();
        this.presentToast("Image uploaded successfully");
      }, (err) => {
        console.log(err);
        loader.dismiss();
        this.presentToast(err);
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
