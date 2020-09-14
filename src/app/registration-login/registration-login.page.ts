import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-login',
  templateUrl: './registration-login.page.html',
  styleUrls: ['./registration-login.page.scss'],
})
export class RegistrationLoginPage implements OnInit {
  display =false;
  validations_form: FormGroup;
  

  constructor(private formBuilder: FormBuilder) {
    this.validations_form = formBuilder.group({
      username: ['',Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.required
      ])]
    })
  }
  ngOnInit() {
      
  }
  validation_messages ={
    'username' : [
      {type:'required',  message:'Username is required'},
      {type:'maxlength', message:'Username cannot be more than 25 chars'},
      {type:'minlength', message:'Username should atlest more than 5 chars.'}
      
    ]
  }

  onOtpChang(event){

  }
 

  

  checkView(identifier){
    if(identifier == "loginView"){
      this.display = false;
    }
    else if(identifier == "registerView"){
      this.display = true;
    }
  }

}
