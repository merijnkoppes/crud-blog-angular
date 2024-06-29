import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  getCollectionData(collectionName: string) {
    return this.firestore.collection(collectionName).snapshotChanges();
  }

  addDocument(collectionName: string, document: any) {
    return this.firestore.collection(collectionName).add(document);
  }

  deleteDocument(collectionName: string, documentId: string) {
    return this.firestore.doc(`${collectionName}/${documentId}`).delete();
  }
  addDocumentWithId(collectionName: string, documentId: string, document: any) {
    return this.firestore
      .collection(collectionName)
      .doc(documentId)
      .set(document);
  }
  updateDocument(collectionName: string, documentId: string, document: any) {
    return this.firestore
      .doc(`${collectionName}/${documentId}`)
      .update(document);
  }
}
