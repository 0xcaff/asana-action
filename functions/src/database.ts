import * as admin from "firebase-admin";

export interface Database {
  getUser(userId: string): Promise<User>;
  updateUser(userId: string, newUser: User): Promise<void>;
}

export interface User {
  asana?: Asana;
}

export interface Asana {
  refreshToken: string;
  accessToken: AccessToken;
  chosenWorkspaceId?: string;
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

  async getUser(userId: string): Promise<User> {
    const doc = await this.db
      .collection("users")
      .doc(userId)
      .get();

    return doc.data() || {};
  }

  async updateUser(userId: string, newUser: User): Promise<void> {
    await this.db
      .collection("users")
      .doc(userId)
      .set(newUser);
  }
}

const firestore = admin.firestore();
export const db = new FirestoreDatabase(firestore);
