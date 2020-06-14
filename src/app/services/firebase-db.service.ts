import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDbService {
  private collectionName = " ";

  constructor(
    private firestore: AngularFirestore,
    private toastCtrl: ToastController
  ) { }

  createUser(srNo, userName, mobNo) {
    this.collectionName = 'users';
    //console.log(this.collectionName);
    var userData = { 'sr_no': srNo, 'name': userName, 'mobile_no': mobNo }
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

  updatePlaylist(uPid,record){
    this.collectionName="user_playlist";
    return this.firestore.doc(this.collectionName+'/'+uPid).update(record);
  }
  deleteUserPlaylist(uPid){
    this.collectionName='user_playlist'
    return this.firestore.collection(this.collectionName).doc(uPid).delete();
  }

  deletePlaylist(pId){
    this.collectionName='playlist'
    return this.firestore.collection(this.collectionName).doc(pId).delete();
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: "primary"
    }).then(toastData => toastData.present());
  }
}
