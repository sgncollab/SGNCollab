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
    //localStorage.getItem('resetPin');
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

  onSubmit() {
    console.log(this.randomNo);
    localStorage.setItem('resetPin', this.randomNo);
    this.onClose();
    this.dataService.setResetUname(this.to_name.toLowerCase());
    this.navCtrl.navigateForward('reset-pin');



  }

  onClose() {
    this.popovercntrl.dismiss();
  }

}
