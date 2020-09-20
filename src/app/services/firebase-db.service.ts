import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
//import  { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDbService {
  private collectionName = " ";

  constructor(
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    
  ) { }

  createUser(srNo, userName, pin) {
    this.collectionName = 'users';
    //console.log(this.collectionName);
    var userData = { 'sr_no': srNo, 'name': userName, 'pin': pin }
    return this.firestore.collection(this.collectionName).add(userData);
  }

  fetchUsers() {
    this.collectionName = 'users';
    return this.firestore.collection(this.collectionName).snapshotChanges()
  }

  getCountryCode() {
    this.collectionName = 'countryCode';
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  fetchUserPlaylist() {
    this.collectionName = 'user_playlist';
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  fetchPlaylist() {
    this.collectionName = 'playlist';
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  updatePlaylist(uPid, playlistId, playlistName, srNo) {
    this.collectionName = "user_playlist";
    var record ={ 'playlist_id': playlistId, 'playlist_name': playlistName, 'sr_no': srNo }
    return this.firestore.doc(this.collectionName + '/' + uPid).update(record);
  }
  deleteUserPlaylist(uPid) {
    this.collectionName = 'user_playlist'
    return this.firestore.collection(this.collectionName).doc(uPid).delete();
  }

  deletePlaylist(pId) {
    this.collectionName = 'playlist'
    return this.firestore.collection(this.collectionName).doc(pId).delete();
  }
  
  insertIntoPlaylist(playlistId, playlistString) {
    this.collectionName = 'playlist';
    console.log("inserted");
    var playlistData = { 'playlist': playlistString, 'playlist_id': playlistId }
    //this.insertIntoPlaylist(playlistId,name,srNo)
    return this.firestore.collection(this.collectionName).add(playlistData);
  }

  insertIntoUserPlaylist(playlistId, playlistName, srNo) {
    this.collectionName = 'user_playlist';
    var userPlaylistData = { 'playlist_id': playlistId, 'playlist_name': playlistName, 'sr_no': srNo }
    return this.firestore.collection(this.collectionName).add(userPlaylistData);
  }

  updatePin(id,sr_no,name,pin){
    this.collectionName = "users";
    var record = {'name': name , 'pin':pin , 'sr_no':sr_no}
    return this.firestore.doc(this.collectionName + '/'+ id).update(record);


  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 1000,
      color: 'primary',
      position:'bottom',
    }).then(toastData => toastData.present());
  }

  


}
