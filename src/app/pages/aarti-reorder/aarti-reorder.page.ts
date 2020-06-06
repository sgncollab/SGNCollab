import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service'

@Component({
  selector: 'app-aarti-reorder',
  templateUrl: './aarti-reorder.page.html',
  styleUrls: ['./aarti-reorder.page.scss'],
})
export class AartiReorderPage implements OnInit {
  private data: any;
  private selectedItems = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    fetch('./assets/data/aarti-data.json').then(res => res.json())
      .then(json => {
        this.data = json;
      });
    this.selectedItems = this.dataService.getAarti();
  }

  reorderItems(event) {
    let itemToMove = this.selectedItems.splice(event.detail.from, 1)[0];
    this.selectedItems.splice(event.detail.to, 0, itemToMove);
    event.detail.complete(); //need to see
  }

  onNext() {
    console.log(this.selectedItems);
  }
}
