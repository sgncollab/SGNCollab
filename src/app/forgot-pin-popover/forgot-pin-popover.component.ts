import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';


@Component({
  selector: 'app-forgot-pin-popover',
  templateUrl: './forgot-pin-popover.component.html',
  styleUrls: ['./forgot-pin-popover.component.scss'],
})
export class ForgotPinPopoverComponent implements OnInit {
  to_email
  constructor(private popovercntrl: PopoverController) { }

  ngOnInit() {
    (function () {
      emailjs.init("user_bfpYBxcMyOSkR0oaHUcZB");
    })();
  }
  resetEmail(){
    var templateParams = {
      to_email : this.to_email
    }
    emailjs.send('feedback_service', 'reset_email', templateParams)
      .then(  function (response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("Reset Request were sent to your Email");
      },
       function (error) {
        alert("FAILED!"+error);
        
      });
  }

  onSubmit() {
    //console.log(this.to_email);
    this.onClose();
  }
  onClose() {
    this.popovercntrl.dismiss();
  }

}
