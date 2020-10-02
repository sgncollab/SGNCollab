import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Toast } from '@capacitor/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { ToastController } from '@ionic/angular';
import { NavController,Platform ,MenuController} from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  currentPage = "feedback";
  user_name = "";
  user_email = "";
  user_feedback = "";
  contact_number;
  data: string;
  backButtonSubscription;
  user

  constructor(
    private dataService: DataService,
    private dbService: FirebaseDbService,
    private toastController: ToastController,
    private navController: NavController,
    private platform: Platform,
    private menu: MenuController
    
  ) {this.data = ''; }

  ngOnInit() {
    (function(){
      emailjs.init("user_bfpYBxcMyOSkR0oaHUcZB");
   })();
    this.dataService.setPresentPage(this.currentPage);
    this.user = this.dataService.getGuest();
    if(this.user == "guest"){
      this.user_name = ""
    }
    else{
      this.user_name = this.dataService.getLoggedInUsername();
    }
    
    //console.log(this.someAutoFormattedInput);
  }
  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(6666, () => {
        this.menu.close();
        this.navController.navigateForward('aarti-list');
    })
  }
  ionViewDidLeave() {
   this.backButtonSubscription.unsubscribe();
   
  }
  onAutoFormatChanged() {
    this.user_name = this.setFirstLetterToUppercase(this.user_name);
    this.user_feedback = this.setFirstLetterToUppercase(this.user_feedback);
  }

  private setFirstLetterToUppercase(string: string): string {
    // https://dzone.com/articles/how-to-capitalize-the-first-letter-of-a-string-in
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  sendEmail() {
    var templateParams = {
      user_name: this.user_name,
      user_email: this.user_email,
      user_feedback: this.user_feedback
    };
     emailjs.send('feedback_service', 'feedback_form', templateParams)
      .then(  function (response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("Email sent successfully!");
      },
       function (error) {
        alert("FAILED!"+error);
        
      });
      this.user_name = "";
      this.user_email = "";
      this.user_feedback = "";
      
  }
}







