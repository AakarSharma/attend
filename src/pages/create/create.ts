import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, ItemSliding } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  activeItemSliding: ItemSliding = null;

  private student = {
    entryNo: '',
    name: '',
    phone: '',
    email: '',
    dob: ''
  };
  private course = {
    courseNo: '',
    courseName: '',
    facultyName: '',
    facultyEmail: '',
    facultyPhone: '',
    regStudents: {}
  };

  public flag;
  imageURI: any;
  imageFileName: any;

  students = [];
  copy_students = [];
  reg_students = [];

  constructor(public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private camera: Camera,
    private transfer: FileTransfer,
    public http: HttpClient,
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams) {
    let type = this.navParams.get("type");
    if (type == "student") {
      this.flag = true;
    }
    else {
      this.flag = false;
      const database = this.firedata.database;
      database.ref("/students").once("value", snapshot => {
        snapshot.forEach(child => {
          this.students.push({ "name": child.child('name').val(), "entryNumber": child.key })
        })
      }).then(() => {
        this.copy_students = this.students;
      });
    }
  }

  delete_reg_student(i) {
    this.copy_students.push(this.reg_students[i]);
    this.reg_students.splice(i, 1);

  }

  add_reg_student(i) {
    this.reg_students.push(this.copy_students[i]);
    this.copy_students.splice(i, 1);
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

  getImage() {
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
    })
  }

  uploadFile() {
    var entryNo = <HTMLInputElement>document.getElementById('entryNo');
    var entryNo1 = entryNo.value.toUpperCase();

    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: entryNo1 + ".jpg",
      chunkedMode: false,
      mimeType: "image/jpg",
      headers: {}
    }

    fileTransfer.upload(this.imageURI, 'http://10.10.50.38:8000/upload_photo', options)
      .then((data) => {
        console.log(data + " Uploaded Successfully");
        this.imageFileName = "http://10.10.50.38/database/students/" + entryNo1 + ".jpg"
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



  createUser(user) {
    var url = 'http://10.10.50.38:8000/createUser';
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const body = JSON.stringify(user);
    var data2 = this.http.post(url, body, httpOptions);
    data2.subscribe(data => {
      console.log(data);
    });
  }

  regCourse(data) {
    var url = 'http://10.10.50.38:8000/courses';
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const body = JSON.stringify(data);
    var data2 = this.http.post(url, body, httpOptions);
    data2.subscribe(data => {
      console.log(data);
    });
  }

  initializeItems() {
    this.copy_students = this.students;
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


  postData() {
    const database = this.firedata.database;
    var data;

    if (this.flag == true) {
      var temp = {
        name: '',
        phone: '',
        email: '',
        dob: ''
      };
      var name = <HTMLInputElement>document.getElementById('name');
      var entryNo = <HTMLInputElement>document.getElementById('entryNo');
      var dob = <HTMLInputElement>document.getElementById('dob');
      var email = <HTMLInputElement>document.getElementById('email');
      var phone = <HTMLInputElement>document.getElementById('phone');

      temp.name = name.value;
      temp.dob = dob.value;
      temp.email = email.value;
      temp.phone = phone.value;

      var entryNo1 = entryNo.value.toUpperCase();
      // var student = {};
      // student[entryNo1] = temp;
      database.ref("/students/" + entryNo1).set(temp).then(() => {
        data = {
          "email": entryNo1 + "@demo.com",
          "password": temp.dob
        };
        this.createUser(data);
        this.uploadFile();
        this.navCtrl.pop({ animate: true, animation: 'transition', duration: 500, direction: 'back' });
      });
    }
    else {
      var temp1 = {
        courseName: '',
        facultyName: '',
        facultyEmail: '',
        facultyPhone: '',
        regStudents: {}
      };
      var courseNo = <HTMLInputElement>document.getElementById('courseNo');
      var courseName = <HTMLInputElement>document.getElementById('courseName');
      var facultyName = <HTMLInputElement>document.getElementById('facultyName');
      var facultyEmail = <HTMLInputElement>document.getElementById('facultyEmail');
      var facultyPhone = <HTMLInputElement>document.getElementById('facultyPhone');

      temp1.courseName = courseName.value;
      temp1.facultyName = facultyName.value;
      temp1.facultyEmail = facultyEmail.value;
      temp1.facultyPhone = facultyPhone.value;

      var courseNo1 = courseNo.value.toUpperCase();
      // var course = {};
      // course[courseNo1] = temp1;
      var temp_reg_students = {};
      var temp_course = {};
      temp_course["name"] = courseNo1;
      temp_course["data"] = {
        "students":[]
      };

      this.reg_students.forEach((student, index) => {
        temp_reg_students[student.entryNumber] = student.entryNumber;
        temp_course["data"]["students"].push(student.entryNumber);
        database.ref("/students" + student.entryNumber + "courseRegistered" + temp1.courseName).set(temp1.courseName);
      })
      temp1.regStudents = temp_reg_students;
      database.ref("/courses/" + courseNo1).set(temp1).then(() => {
        data = {
          "email": courseNo1 + "@demo.com",
          "password": "password"
        };
        this.createUser(data);
        this.regCourse(temp_course);
        this.navCtrl.pop({ animate: true, animation: 'transition', duration: 500, direction: 'back' });
      });
    }
  }
}

