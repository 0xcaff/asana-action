import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

export interface Database {
  getUser(userId: string): Promise<User | null>;
  updateUser(newUser: User): Promise<void>;
}

export interface User {
  id: string;
  refreshToken: string;
  accessToken: AccessToken;
  chosenWorkspaceId?: string;
  email: string,
  name: string,
}

export interface AccessToken {
  token: string;
  expiryTime: number;
}

class FirestoreDatabase implements Database {
  private db: admin.firestore.Firestore;

  constructor(firebase: admin.firestore.Firestore) {
    this.db = firebase;
  }

  async getUser(userId: string): Promise<User | null> {
    const doc = await this.db
      .collection("users")
      .doc(userId)
      .get();

    const data = doc.data();
    if (!data) {
      return null;
    }

    return data as User;
  }

  async updateUser(newUser: User): Promise<void> {
    await this.db
      .collection("users")
      .doc(newUser.id)
      .set(newUser);
  }
}

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: false });
export const db = new FirestoreDatabase(firestore);
