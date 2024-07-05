import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  constructor(private afs: AngularFirestore, private fireStorage: AngularFireStorage, private router: Router) { }
  private root = '/yk-p-angular2';
  public getPhase(phase: string) {
    return this.afs.collection(this.root).doc(phase).get();
  }

  public async getSubCollections(phase: string): Promise<any> {
    try {
      const snapshot = await this.getPhase(phase).toPromise();
      if (!snapshot!.exists) {
        throw new Error('Document does not exist!');
      }

      const subCollectionNames = ['Angular', 'React', 'Vue']; // サブコレクションの名前をリストにしておく
      const subCollectionsData:any[] = [];

      for (const name of subCollectionNames) {
        const subCollectionSnapshot = await snapshot!.ref.collection(name).get();
        subCollectionSnapshot.forEach(doc => {
          subCollectionsData.push({ collection: name, data: doc.data() });
        });
      }

      const groupedData = this.groupBy(subCollectionsData, 'collection');
      return groupedData;

    } catch (error) {
      console.error('Error getting subcollections:', error);
      throw error;
    }
  }
  // 配列を指定されたプロパティでグループ化する関数
  private groupBy(array: any[], key: string): any {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue.data);
      return result;
    }, {});
  }
  public getCategory(category:string) {
    return this.afs.collection(this.root+"/phase/"+category).snapshotChanges();//, ref => ref.orderBy('id', 'desc')
  }
  public getDetail(category:string,id: string) {
    return this.afs.collection(this.root+"/phase/"+category).doc(id).get();
  }
}