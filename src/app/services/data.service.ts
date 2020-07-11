import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private aartiData = [];
  private selectedItems = [];
  private index = 0;
  private loggedInUser: any;
  private playlistName:any;
  private myplaylistartilist =[]
  private playlistString;

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

  setLoggedInUserData(userdata) {
    this.loggedInUser = userdata;
  }
  getLoggedInUserData() {
    return this.loggedInUser;
  }

  setPlaylistName(name){
    this.playlistName = name;
  }
  getPlaylistName() {
    return this.playlistName;
  }
  
  setmyPlaylistArtilist(list){
    this.myplaylistartilist = list;
  }
  getmyPlaylistArtilist(){
    return this.myplaylistartilist;
  }

  setPlaylistString(string){
    this.playlistString = string;
  }
  getPlaylistString(){
    return this.playlistString;
  }
}
