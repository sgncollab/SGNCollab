import { Component, OnInit } from '@angular/core';
//import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  private mobileNo: string ="";
  randomNo
  mobplusrandom
  encryptedNo:string;
  decryptedNo;
  
  

  constructor( ) { }

  ngOnInit() {
  }
  encrypt(){
   console.log(this.mobileNo);
    this.randomNo = Math.floor(1000 + Math.random() * 9000);
   console.log(this.randomNo);
    this.mobplusrandom = (+this.mobileNo + this.randomNo);
   console.log(this.mobplusrandom);
   this.encryptedNo = (this.mobplusrandom.toString() + this.randomNo.toString());
   console.log(this.encryptedNo);
  }

  decrypt(){
    console.log(this.encryptedNo);
    this.randomNo = this.encryptedNo.slice(-4);
    console.log(this.randomNo);
    this.mobplusrandom = this.encryptedNo.slice(0,this.encryptedNo.length-4);
    console.log(this.mobplusrandom)
    this.decryptedNo = (this.mobplusrandom - this.randomNo)
    console.log(this.decryptedNo);
  }
  

  
}







