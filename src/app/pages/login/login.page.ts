import { Component, OnInit } from '@angular/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private userName: string = "";
  private mobNo: number = 0;
  private regResult = [];
  private isChecked: boolean;

  constructor(
    private toastController: ToastController,
    private navController: NavController,
    private dbService: FirebaseDbService
  ) { }

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
      this.userName = localStorage.getItem('username');
      this.mobNo = parseInt(localStorage.getItem('mobno'));
    });
  }

  async login() {
    let count = 0;
    let flag = false;
    let usernameCount = [];

    try {
      if (this.regResult.length > 0 && this.regResult != undefined) {
        for (let i = 0; i < this.regResult.length; i++) {
          if (this.userName == this.regResult[i].name) {
            count++;
            usernameCount.push(this.regResult[i]);
          }
        }
        if (count >= 1) {
          if (usernameCount.length > 0 && usernameCount != undefined) {
            for (let i = 0; i < usernameCount.length; i++) {
              if (this.mobNo == usernameCount[i].mobile_no) {
                flag = true;
                const toast = await this.toastController.create({
                  message: 'Login Successful!',
                  duration: 2000,
                  color: 'primary',
                  position: 'top'
                });
                toast.present();
                this.rememberMe();
                this.navController.navigateForward('home');
                break;
              }
            }
          }
          if (flag == false) {
            const toast = await this.toastController.create({
              message: 'Mobile number does not match. Please enter a valid mobile number!',
              duration: 2000,
              color: 'primary',
              position: 'bottom'
            });
            toast.present();
          }
        }
        if (count == 0) {
          const toast = await this.toastController.create({
            message: 'Username does not match. Please enter a valid username!',
            duration: 2000,
            color: 'primary',
            position: 'bottom'
          });
          toast.present();
        }
      }
    }
    catch (exception) {
      exception;
    }
  }

  rememberMe() {
    if (this.isChecked) {
      localStorage.setItem('username', this.userName);
      localStorage.setItem('mobno', this.mobNo.toString());
    }
  }
}








