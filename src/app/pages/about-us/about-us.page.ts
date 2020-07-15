import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  currentPage = "about-us";

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.setPresentPage(this.currentPage);
  }

}
