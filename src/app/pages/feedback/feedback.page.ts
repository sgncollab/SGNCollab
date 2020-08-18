import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Toast } from '@capacitor/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';


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

  constructor(
    private dataService: DataService,
    private dbService: FirebaseDbService,
    
  ) { }

  ngOnInit() {
    (function(){
      emailjs.init("user_bfpYBxcMyOSkR0oaHUcZB");
   })();
    this.dataService.setPresentPage(this.currentPage);
    this.user_name = this.dataService.getLoggedInUsername();
    //console.log(this.someAutoFormattedInput);
  }
  onAutoFormatChanged() {
    this.user_name = this.setFirstLetterToUppercase(this.user_name);
    this.user_feedback = this.setFirstLetterToUppercase(this.user_feedback);
  }

  private setFirstLetterToUppercase(string: string): string {
    // https://dzone.com/articles/how-to-capitalize-the-first-letter-of-a-string-in
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public sendEmail() {
    
    var templateParams = {
      user_name: this.user_name,
      user_email: this.user_email,
      user_feedback: this.user_feedback
    };
    emailjs.send('feedback_service', 'feedback_form', templateParams)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        //this.toastMessage("success");
        
        
      }, function (error) {
        console.log('FAILED...', error);
        //this.toastMessage("error");
      });
      this.user_name = "";
      this.user_email = "";
      this.user_feedback = "";

      
      

      

  }
  

  // toastMessage(identifier){
  //   if(identifier == "success"){
  //     this.dbService.showToast("Thank you for your responce!");    
  //   }
  //   else if(identifier == "error"){
  //     this.dbService.showToast("Failed..Please try again later!");

  //   }
  // }
  
}







