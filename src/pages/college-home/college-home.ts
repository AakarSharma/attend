import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, ItemSliding, AlertController, App } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HeaderColor } from '@ionic-native/header-color';

import { CreatePage } from '../create/create';
import { EditPage } from '../edit/edit';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-college-home',
  templateUrl: 'college-home.html',
})
export class CollegeHomePage {
  items;

  activeItemSliding: ItemSliding = null;
  openMenu = false;
  hide = true;

  courses = [];

  students = [];

  copyStudents = [];

  constructor(private app: App, private alertCtrl: AlertController, private headerColor: HeaderColor, public http: HttpClient, private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
    this.headerColor.tint('#2ecc71');
  }



  // deleteUser(user) {
  //   var url = 'https://attendance-master.herokuapp.com/deleteUser';
  //   var httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   };
  //   const body = JSON.stringify(user);
  //   var data = this.http.post(url, body, httpOptions);
  //   data.subscribe(data => {
  //     console.log(data);
  //   });
  // }

  ionViewWillEnter() {
    const database = this.firedata.database;
    this.students = [];
    this.courses = [];
    database.ref('courses/').once('value', snapshot => {
      snapshot.forEach(child => {
        this.courses.push({ "name": child.key, "facultyName": child.child('facultyName').val() })
      })
    });

    database.ref('students/').once('value', snapshot => {
      snapshot.forEach(child => {
        this.students.push({ "name": child.child('name').val(), "entryNumber": child.key })
      })
    }).then(() => {
      this.copyStudents = this.students;
    });
  }

  togglePopupMenu() {
    this.hide = !this.hide;
    return this.openMenu = !this.openMenu;
  }

  // delete_supervisor(index) {
  //   var id = this.usersS[index].code;
  //   const database = this.firedata.database;

  //   database.ref('company/').child(id.substring(0, 2)).child('supervisors').child(id.substring(2, 5))
  //     .child("details").child("aboveEmployees").once('value').then(snapshot => {
  //       var value = snapshot.val();
  //       for (var i in value) {
  //         var empid = id + value[i];
  //         console.log(empid);
  //         this.shiftEmployeeToDefault(empid);
  //       }
  //     })

  //   database.ref('company/').child(id.substring(0, 2)).child('supervisors').child(id.substring(2, 5))
  //     .once('value').then(snapshot => {
  //       database.ref('trash/').child(id + '(' + Date.now() + ')').update(snapshot.val()).then(data => {   // saving the node to trash
  //         database.ref('company/').child(id.substring(0, 2)).child('supervisors').child(id.substring(2, 5))
  //           .remove(); // removing the node
  //       })
  //     });
  //   this.usersS.splice(index, 1);
  //   var data = {
  //     "email": id + "@demo.com"
  //   };
  //   this.deleteUser(data);
  // }

  // delete_employee(index) {
  //   var id = this.usersE[index].code;
  //   const database = this.firedata.database;
  //   database.ref('company/').child(id.substring(0, 2)).child('supervisors').child(id.substring(2, 5)).child('details').child('aboveEmployees').child(id.substring(5, 10)).remove();
  //   database.ref('company/').child(id.substring(0, 2)).child('employees').child(id.substring(5, 10)).once('value').then(snapshot => {
  //     database.ref('trash/').child(id + '(' + Date.now() + ')').update(snapshot.val()).then(data => {
  //       database.ref('company/').child(id.substring(0, 2)).child('employees').child(id.substring(5, 10)).remove();
  //     })
  //   });
  //   this.usersE.splice(index, 1);
  //   var data = {
  //     "email": id + "@demo.com"
  //   };
  //   this.deleteUser(data);
  // }

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

  openOption(itemSlide: ItemSliding, item: Item, event) {
    console.log('opening item slide..');
    event.stopPropagation(); // here if you want item to be tappable
    if (this.activeItemSliding) { // use this so that only one active sliding item allowed
      this.closeOption();
    }

    this.activeItemSliding = itemSlide;
    const swipeAmount = 50; // set your required swipe amount

    console.log('swipe amount ', swipeAmount);
    itemSlide.startSliding(swipeAmount);
    itemSlide.moveSliding(swipeAmount);

    itemSlide.setElementClass('active-slide', true);
    itemSlide.setElementClass('active-options-right', true);
    item.setElementStyle('transition', null);
    item.setElementStyle('transform', 'translate3d(-' + swipeAmount + 'px, 0px, 0px)');
  }

  closeOption() {
    console.log('closing item slide..');

    if (this.activeItemSliding) {
      this.activeItemSliding.close();
      this.activeItemSliding = null;
    }
  }

  addCourse() {
    const animationsOptions = {
      animation: 'ios-transition',
      duration: 1000
    }
    this.togglePopupMenu();                                            // To add supervisor using Navparams
    this.navCtrl.push(CreatePage, { "type": "course" }, animationsOptions);
  }

  addStudent() {
    const animationsOptions = {
      animation: 'ios-transition',
      duration: 1000
    }                                                 // To add employee using Navparams
    this.togglePopupMenu();
    this.navCtrl.push(CreatePage, { "type": "student" }, animationsOptions);
  }

  showStudent(index) {
    const animationsOptions = {
      animation: 'ios-transition',
      duration: 1000
    }
    // To call details page of tapped employee
    this.navCtrl.push(EditPage, { "id": this.students[index].code }, animationsOptions);
  }

  showCourse(index) {
    const animationsOptions = {
      animation: 'ios-transition',
      duration: 1000
    }
    // To call details page of tapped supervisor
    this.navCtrl.push(EditPage, { "id": this.courses[index].code }, animationsOptions);
  }

  // showView()
  // {
  //   this.navCtrl.push(AttendanceViewPage);
  // }
  initializeItems() {
    this.students = this.copyStudents;
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.students = this.students.filter((user) => {
        return (user.entryNumber.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}


