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
  private playlistStr="";
  private selectedPlaylist = [];
  private userPlaylist =[];
  private listPlaylist =[];
  private presentPage ;
  private lang:boolean;
  private username;
  private Rmno=0;
  resetname:any;
  user;
  usertype:string="guest";
  item;

  constructor() { }

  setGuest(user){
    this.user = user
  }
  getGuest(){
    return this.user
  }

  setResetUname(resetname){
   this.resetname = resetname;
  }
  getResetUname(){
    return this.resetname;
  }

  setLang(lang){
    this.lang = lang;
  }
  getLang(){
    return this.lang;
  }

  setPresentPage(presentPage){
    this.presentPage = presentPage
  }
  getPresentPage(){
    return this.presentPage;
  }
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

  setLoggedInUsername(username){
     this.username = username;
  }

  getLoggedInUsername(){
    return this.username;
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

  setPlaylistString(str){
    this.playlistStr = str;
  }

  getPlaylistString(){
    return this.playlistStr;
  }
  setSelectedPlaylistItem(selectedPlaylist){
    this.selectedPlaylist = selectedPlaylist;
  }
  getSelectedPlaylistItem(){
    return this.selectedPlaylist;
  }
  setAllUserPlaylist(userPlaylist){
  this.userPlaylist = userPlaylist;
  }
  getAllUserPlaylist(){
    return this.userPlaylist;
  }
  setListPlaylist(listPlaylist){
    this.listPlaylist = listPlaylist
  }
  getListPlaylist(){
    return this.listPlaylist;
  }
  setRegisteredMobNo(mNo){
  this.Rmno=mNo;
  }
  getRegisteredMobNo(){
    return this.Rmno
  }

  setUserType(usertype){
    this.usertype = usertype;
  }
  getUserType(){
    return this.usertype;
  }

  setItem(item){
    this.item = item;
  }
  getItem(){
    return this.item;
  }
  
}
