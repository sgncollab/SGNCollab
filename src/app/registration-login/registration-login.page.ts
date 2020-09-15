import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsernameValidator } from '../validators/username'
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { EmptyError } from 'rxjs';


@Component({
  selector: 'app-registration-login',
  templateUrl: './registration-login.page.html',
  styleUrls: ['./registration-login.page.scss'],
})
export class RegistrationLoginPage implements OnInit {
  display =false;
  validations_form: FormGroup;
  username:any="";
  regResult:any;
  passwordToggle= 'eye';
  showpass=false
  
  isActiveToggleTextPassword: Boolean = true;
  public toggleTextPassword(): void{
      this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
      this.showpass= !this.showpass;
      if(this.passwordToggle == 'eye'){
        this.passwordToggle='eye-off';
      }else{
        this.passwordToggle = 'eye';
      }
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'number';
}
tcknOnInputChange(e){        
  e.detail.keyup(function() {
     e.detail.value(this.value.match(/[0-9]*/));
  });
}
  constructor(private formBuilder: FormBuilder,private dbService: FirebaseDbService) {
  }
  ngOnInit() {
    this.dbService.fetchUsers().subscribe((data) => {
      this.regResult = data.map(value => {
        return {
          id: value.payload.doc.id,
          mobile_no: value.payload.doc.data()['mobile_no'],
          name: value.payload.doc.data()['name'],
          sr_no: value.payload.doc.data()['sr_no']
        }
      });
      console.log(this.regResult);
  })
  }
  pinInput(e){
    console.log(e.detail.value);
    if(e.detail.value =="" || e.detail.value == undefined){
      console.log("pin is required");
    }
    else if (e.detail.value.length != 4){
      console.log("please enter 4 digit pin");
    }
    else {
      console.log("pin is valid");
    }
  }
  onChange(e){
    //console.log(e.detail.value)
    if(e.detail.value == "" || e.detail.value == undefined)
    {
      console.log("username is required");
    }
    else if(e.detail.value.length < 4 || e.detail.value.length > 30){
      console.log("pl.check the length");
    }
    else{
      console.log("Username is valid")
      let flag = this.regResult.filter(value=>{
        if(value.name==e.detail.value){
          return true;
        }
        return false;
      })
      console.log(flag);
      if(flag.length == 0 ){
        console.log("register");
      }else{
        console.log("username already taken!")
      }
    }
    
  }
  
  register(){
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
