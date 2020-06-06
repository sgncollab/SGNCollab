import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private aartiData = [];
  private selectedItems = [];
  private index = 0;

  constructor() { }

  setData(data) {
    this.aartiData = data;
  }

  getData() {
    return this.aartiData;
  }

  setIndex(index) {
    this.index = index;
  }

  getIndex() {
    return this.index;
  }

  setAarti(item) {
    this.selectedItems = item;
  }

  getAarti() {
    return this.selectedItems;
  }
}
