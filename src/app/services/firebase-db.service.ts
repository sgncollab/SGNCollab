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

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }
}
