import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {
  userNameLog: any;
  mobNoLog: any;
  userName: any;
  mobNo: any;
  items: any = [];
  result: any = [];
  regResult = [];
  code: any;
  srNo = 1;
  signUpValidate: FormGroup;
  isChecked: boolean;
  view: string = "registerView";
  display = false;
  ext: any;

  constructor(
    private menu: MenuController,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private dbService: FirebaseDbService
  ) {
    this.signUpValidate = formBuilder.group({
      userName: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]+$')])],
      code: ['', Validators.compose([Validators.required])],
      mobNo: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('[0-9]{10}')])]
    });
    this.code = this.signUpValidate.controls['code'];
    this.userName = this.signUpValidate.controls['userName'];
    this.mobNo = this.signUpValidate.controls['mobNo'];
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }
  ionViewDidLeave() {
    this.menu.enable(true);
  }


  ngOnInit() {
    this.dbService.getCountryCode().subscribe((data) => {
      this.result = data.map(value => {
        return {
          id: value.payload.doc.id,
          code: value.payload.doc.data()['code'],
          country: value.payload.doc.data()['country']
        }
      });
      this.items = this.result;
    });

    this.dbService.fetchUsers().subscribe((data) => {
      this.regResult = data.map(value => {
        return {
          id: value.payload.doc.id,
          mobile_no: value.payload.doc.data()['mobile_no'],
          name: value.payload.doc.data()['name'],
          sr_no: value.payload.doc.data()['sr_no']
        }
      });
      // handle null and undefined case
      if (this.regResult.length > 0 && this.regResult != undefined) {
        if (this.regResult.length == 0) {
          this.srNo = 1;
        }
        else {
          let oldSrNo = 1, newSrNo = 0;  //change naming convention
          for (var i = 0; i < this.regResult.length; i++) {
            newSrNo = this.regResult[i].srno;
            if (newSrNo > oldSrNo) {
              oldSrNo = newSrNo;
            }
            this.srNo = oldSrNo + 1;
          }
        }
      }

    });
    this.userNameLog = localStorage.getItem('username');
    this.mobNoLog= localStorage.getItem('mobno');
    this.ext = localStorage.getItem('extno');
    // console.log(this.ext);
    //console.log(this.signUpValidate.value.userName, this.signUpValidate.value.mobNo);
    //console.log(this.ext);
    
    
  }

  registerUser() {
    var flag = false;
    try { // check undefined and null response
      // console.log(this.regResult);
      // console.log( this.signUpValidate.value.mobNo,this.signUpValidate.value.userName)
      if (this.regResult.length > 0 && this.regResult != undefined) {
        for (let i = 0; i < this.regResult.length; i++) {
          if (this.regResult[i].mobile_no == this.signUpValidate.value.mobNo) {
            flag = true;
            this.dbService.showToast("User with this mobile number already exists");
            break;
          }
        }
      }
      if (flag == false) {
        this.dbService.createUser(this.srNo, this.signUpValidate.value.userName, (this.signUpValidate.value.code + this.signUpValidate.value.mobNo));
        this.rememberme();
        this.navCtrl.navigateForward('home');
      }
    } catch (e) {
      this.dbService.showToast(e);
    }
  }

  login() {
    let count = 0;
    let flag = false;
    let usernameCount = [];

    try {
      if (this.regResult.length > 0 && this.regResult != undefined) {
        for (let i = 0; i < this.regResult.length; i++) {
          if (this.userNameLog == this.regResult[i].name) {
            count++;
            usernameCount.push(this.regResult[i]);
          }
        }
        if (count >= 1) {
          if (usernameCount.length > 0 && usernameCount != undefined) {
            for (let i = 0; i < usernameCount.length; i++) {
              if ((this.ext + this.mobNoLog) == usernameCount[i].mobile_no) {
                flag = true;
                this.dbService.showToast("Login Successful!");
                this.rememberMe();
                this.navCtrl.navigateForward('home');
                break;
              }
            }
          }
          if (flag == false) {
            this.dbService.showToast("Mobile number does not match. Please enter a valid mobile number!");
          }
        }
        if (count == 0) {
          this.dbService.showToast("Username does not match. Please enter a valid username!");
        }
      }
    }
    catch (exception) {
      exception;
    }
  }

  rememberMe() {
    if (this.isChecked) {
      localStorage.setItem('username', this.userNameLog);
      localStorage.setItem('mobno', this.mobNoLog);
      localStorage.setItem('extno', this.ext);

    }
  }
  rememberme() {
    if (this.isChecked) {
      localStorage.setItem('username', this.signUpValidate.value.userName);
      localStorage.setItem('mobno', this.signUpValidate.value.mobNo);

    }
  }
  checkView(identifier) {
    //this.display = false;
    if (identifier == "loginView") {
      this.display = false;
      this.view = "loginView";
    } else if (identifier == "registerView") {
      this.display = true;
      this.view = "registerView";
    }
  }


}
