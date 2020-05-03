import { Component, OnInit } from '@angular/core';
import { MenuController, NavController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  data: any;
  username:any;
  password:any;

  constructor( public menuCtrl: MenuController,public navController:NavController,public toastController: ToastController) { }

  ngOnInit() {
      fetch('/assets/datajson.json').then(async res => {
      this.data = await res.json();
      console.log(this.data)
     
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }


ionViewDidLeave() {

    this.menuCtrl.enable( true )
}
  
  signUp() {}
  async signIn(){
    var flag=true
    for(var i=0;i<this.data.length;i++){
      if(this.data[i].username==this.username){
        if(this.data[i].password==this.password){
            const toast = await this.toastController.create({
            message: 'login successful/Logged In Successfully',
            duration: 2000,
            color:'medium',
            position: 'top'
          });
         toast.present();
         this.navController.navigateForward('/folder/Inbox')
        }
        else{
            const toast = await this.toastController.create({
            message: 'password wrong',
            duration: 2000,
            color:'medium',
            position: 'top'
          });
         toast.present();
        }
        flag=false
        break
      }
    }
      if(flag==true){
        const toast = await this.toastController.create({
          message: 'User id wrong',
          duration: 2000,
          color:'medium',
          position: 'top'
        });
       toast.present();
      }
        
  }
}
