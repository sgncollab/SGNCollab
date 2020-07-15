import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currentPage = "settings";

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.setPresentPage(this.currentPage);
  }

}
