import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  getCollectionDataWithQuery(collectionName: string, queryFn?: any) {
    return this.firestore.collection(collectionName, queryFn).snapshotChanges();
  }

  getCollectionData(collectionName: string) {
    return this.firestore.collection(collectionName).snapshotChanges();
  }

  getDocument(collectionName: string, documentId: string) {
    return this.firestore.collection(collectionName).doc(documentId).get();
  }

  addDocument(collectionName: string, document: any) {
    return this.firestore.collection(collectionName).add(document);
  }

  async addDocumentAndGetId(collectionName: string, document: any) {
    const docRef = await this.firestore
      .collection(collectionName)
      .add(document);
    return docRef.id;
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

  getBlogPostsByBlogId(blogId: string) {
    return this.firestore
      .collection('blogposts', (ref) => ref.where('blogId', '==', blogId))
      .snapshotChanges();
  }
}
