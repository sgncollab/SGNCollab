import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
randomNo:number;
  constructor(private navCtrl: NavController,) { }

  ngOnInit() {
    this.randomNo = Math.floor(1000 + Math.random() * 9000);
    alert(this.randomNo);
    localStorage.setItem('randomNo',this.randomNo.toString());
    
  }

  onOtpChange(event){
    //console.log(event.length);
    //let flag=false;

     
    if(event != localStorage.getItem('randomNo') && event.length == 4){
      console.log("not matched");
      
    }
    else if(event == localStorage.getItem('randomNo')){
      this.navCtrl.navigateForward('aarti-list');
    }

    
  }
  
}
