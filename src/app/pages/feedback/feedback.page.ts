import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  currentPage = "feedback" ;
  someAutoFormattedInput = "";
  someAutoFormattedEmail = "";
  someAutoFormattedFeedback = "";
  

  constructor(
    private dataService: DataService,
    ) { }

  ngOnInit() {
    this.dataService.setPresentPage(this.currentPage);
  }
  onAutoFormatChanged() {
    this.someAutoFormattedInput = this.setFirstLetterToUppercase(this.someAutoFormattedInput);
    this.someAutoFormattedFeedback = this.setFirstLetterToUppercase(this.someAutoFormattedFeedback);
  }

  private setFirstLetterToUppercase(string:string):string {
    // https://dzone.com/articles/how-to-capitalize-the-first-letter-of-a-string-in
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  onSubmit(){
    console.log(this.someAutoFormattedInput);
    console.log(this.someAutoFormattedEmail);
    console.log(this.someAutoFormattedFeedback);

  }
  
  
  }
  
  

  



