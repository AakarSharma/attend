import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderColor } from '@ionic-native/header-color';

import { CollegeTabsPage } from '../college-tabs/college-tabs';
import { CourseTabsPage } from '../course-tabs/course-tabs';
import { StudentTabsPage } from '../student-tabs/student-tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //requiring the form elements
  @ViewChild('username') username;
  @ViewChild('password') password;

  user: FormGroup;

  public backgroundImage = 'assets/imgs/background-2.jpg';
  constructor(private headerColor: HeaderColor, private firedata: AngularFireDatabase, private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.headerColor.tint('#2ecc71');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Error',
      subTitle: "Wrong Username or Password entered",
      buttons: ['OK']
    }).present();
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Forgot Password',
      message: 'Contact your College to reset your password',
      inputs: [
        // {
        //   name: 'username',
        //   placeholder: 'Username'
        // }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            /* The logic after the Submit button is pressed goes here */
            // const database = this.firedata.database;
            // const auth = this.fire.auth;
            // if(data.username.length == 2){
            //   // database.ref('company/').child(data.username).child('details').child('email').once('value').then(snapshot => {
            //   //   var email = snapshot.val();
            //     auth.sendPasswordResetEmail('aakarsharmathegreat@gmail.com')
            //     .then(() => {
            //       // Password reset email sent.
            //       this.successResetPasswordLink();
            //     })
            //     .catch((error) => {
            //       // Error occurred. Inspect error.code.
            //       this.failResetPasswordLink();
            //     });
            //   // })
            // }
            // else if(data.username.length == 5){
            //   // database.ref('company/').child(data.username.substring(0,2)).child('supervisors').child(data.username.substring(2,5)).child('details').child('email').once('value').then(snapshot => {
            //   //   var email = snapshot.val();
            //     auth.sendPasswordResetEmail('01@demo.com')
            //     .then(() => {
            //       // Password reset email sent.
            //       this.successResetPasswordLink();
            //     })
            //     .catch((error) => {
            //       // Error occurred. Inspect error.code.
            //       this.failResetPasswordLink();
            //     });
            //   // })
            // }
            // else if(data.username.length == 10){
            //   // database.ref('company/').child(data.username.substring(0,2)).child('employees').child(data.username.substring(5,10)).child('details').child('email').once('value').then(snapshot => {
            //   //   var email = snapshot.val();
            //     auth.sendPasswordResetEmail("aakarsharmathegreat@gmail.com")
            //     .then(() => {
            //       // Password reset email sent.
            //       this.successResetPasswordLink();
            //     })
            //     .catch((error) => {
            //       // Error occurred. Inspect error.code.
            //       this.failResetPasswordLink();
            //     });
            //   // })
            // }
          }
        }
      ]
    });
    alert.present();
  }

  failResetPasswordLink() {
    let toast = this.toastCtrl.create({
      message: 'Wrong Username Entered',
      duration: 5000
    });
    toast.present();
  }

  successResetPasswordLink() {
    let toast = this.toastCtrl.create({
      message: 'Reset Password Link Sent on your registered email Id',
      duration: 5000
    });
    toast.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Invalid Username/Password',
      duration: 5000
    });
    toast.present();
  }

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Invalid Username/Password',
      duration: 3000,
      position: position
    });

    toast.present(toast);
  }

  showToastWithCloseButton(position: string) {
    const toast = this.toastCtrl.create({
      message: 'Invalid Username/Password',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: position
    });
    toast.present();
  }

  ngOnInit() {

    this.user = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      //email: new FormControl('', [Validators.required,Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

  }

  // function to authenticate the user logined
  signIn() {

    // this.fire.auth.setPersistence("session")
    // .then(function(){
    this.fire.auth.signInWithEmailAndPassword(this.username.value + "@demo.com", this.password.value)
      .then(data => {
        if (this.username.value === "admin") {
          this.navCtrl.setRoot(CollegeTabsPage);
        }
        else if (this.username.value.length === 6) {
          this.navCtrl.setRoot(CourseTabsPage);
        }
        else if (this.username.value.length === 11) {
          this.navCtrl.setRoot(StudentTabsPage);
        }
      })
      .catch(error => {
        // console.log(error);
        console.log('got an error ', error);
        //this.alert(error.message)
        //this.showToastWithCloseButton('top');
        this.showToast('top');
      })
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login[Page');
  }

}
