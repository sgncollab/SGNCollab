import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service'
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.page.html',
  styleUrls: ['./create-playlist.page.scss'],
})
export class CreatePlaylistPage implements OnInit {
  private data: any;
  private selectedItems = [];

  constructor(
    private dataService: DataService,
    private navController: NavController,
    private form: FormsModule
  ) { }

  ngOnInit() {
      fetch('./assets/data/aarti-data.json').then(res => res.json())
        .then(json => {
          this.data = json;
        });
  }

  getItem(e: any, marathiTitle: string) {
    if (e.target.checked) {
      this.selectedItems.push(marathiTitle);
    }
    else {
      this.selectedItems = this.selectedItems.filter(item => item != marathiTitle);
    }
  }

  onNext() {
    this.dataService.setAarti(this.selectedItems);
    this.navController.navigateForward('aarti-reorder');
  }
}
