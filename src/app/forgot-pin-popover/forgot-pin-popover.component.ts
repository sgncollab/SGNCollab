import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-forgot-pin-popover',
  templateUrl: './forgot-pin-popover.component.html',
  styleUrls: ['./forgot-pin-popover.component.scss'],
})
export class ForgotPinPopoverComponent implements OnInit {
  regResult;
  to_email: any;
  to_name: any;
  randomNo;
  pattern = /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
  emptyuname = false;
  uvalid = false;
  emptyemail = false;
  patternmatch = false;
  emailvalid = false;
  enterUName = "";
  enterPIN = "";
  rememberChecked = false;
  disabled = true;

  constructor(
    private popovercntrl: PopoverController,
    private dbService: FirebaseDbService,
    private navCtrl: NavController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    (function () {
      emailjs.init("user_bfpYBxcMyOSkR0oaHUcZB");
    })();

    this.randomNo = Math.floor(1000 + Math.random() * 9000);
    this.dbService.fetchUsers().subscribe((data) => {
      this.regResult = data.map(value => {
        return {
          id: value.payload.doc.id,
          pin: value.payload.doc.data()['pin'],
          name: value.payload.doc.data()['name'],
          sr_no: value.payload.doc.data()['sr_no']
        }
      });
    })
  }


  resetEmail() {
    // var templateParams = {
    //   to_email: this.to_email,
    //   to_name: this.to_name,
    //   randomNo: this.randomNo
    // }
    // emailjs.send('feedback_service', 'reset_email', templateParams)
    //   .then(function (response) {
    //     console.log('SUCCESS!', response.status, response.text);
    //     alert("Reset Request were sent to your Email");
    //   },
    //     function (error) {
    //       alert("FAILED!");
    //     });
  }
  inputCheck(e, identifier) {
    this.emptyuname = false;
    this.emptyemail = false;
    this.patternmatch = false;
    this.uvalid = false;
    this.disabled = true;
    this.emailvalid = false;


    if (identifier == 'username') {
      //console.log(e.detail.value)
      if (e.detail.value == "" || e.detail.value == undefined) {
        this.emptyuname = true;
      }
      else {
        let flag = this.regResult.filter(value => {
          if (this.to_name.toLowerCase() == value.name) {
            return true;
          }
          return false;
        })
        if (flag.length == 0) {
          this.uvalid = true;
          // console.log("username is not valid")
        }
        else {
          this.to_name = e.detail.value
          if (this.to_email == "" || this.to_email == undefined){
            this.emptyemail = true;
          }
          else{
            this.enablegetotp();

          }
        }
      }
    }
    else if (identifier == 'email') {

      if (e.detail.value == "" || e.detail.value == undefined) {
        this.emptyemail = true;
      }
      else if (this.pattern.test(String(e.detail.value))) {
        this.to_email = e.detail.value;

        if(this.to_name == "" || this.to_name == undefined){
          this.emptyuname = true;
        }
        else{
          this.enablegetotp();
        }


      }
      else {
        this.emailvalid = true;
        console.log("Please input valid email");

      }
    }

  }

  enablegetotp() {
    this.disabled = false;
  }
  onSubmit() {
    this.emptyuname = false;
    this.uvalid = false;
    this.emailvalid = false;

    if (this.to_name == null || this.to_name == undefined) {
      this.emptyuname = true;
      console.log("enter the details");
    } else {
      let flag = this.regResult.filter(value => {
        if (this.to_name.toLowerCase() == value.name) {
          return true;
        }
        return false;
      })
      if (flag.length > 0) {
        console.log("username valid");
        if (this.to_email == "" || this.to_email == undefined) {
          this.emptyemail = true;
          //console.log("Enter email");
        }
        else if (this.pattern.test(String(this.to_email))) {
          console.log("pattern match");
          console.log(this.randomNo);
          localStorage.clear();
          this.enterUName = "";
          this.enterPIN = "";
          this.rememberChecked = false;
          localStorage.setItem('resetPin', this.randomNo);
          this.onClose();
          this.dataService.setResetUname(this.to_name.toLowerCase());
          this.navCtrl.navigateForward('reset-pin');
        }
        else {
          this.emailvalid = true;
          console.log("Please input valid email");

        }
      }
      else {
        this.uvalid = true;
        console.log("username invalid");
      }
    }
  }

  onClose() {
    this.popovercntrl.dismiss();
  }

}
