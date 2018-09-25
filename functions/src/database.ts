import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

/**
 * An abstraction around interaction with a database. It provides rudimentary
 * type safety.
 */
export interface Database {
  /**
   * Gets a user. If the user doesn't exist, null is returned.
   *
   * @param userId ID of the user to get
   */
  getUser(userId: string): Promise<User | null>;

  /**
   * Updates a user creating if necessary.
   *
   * @param newUser User information which should be in database
   */
  updateUser(newUser: User): Promise<void>;
}

export interface User {
  id: string;
  refreshToken: string;
  accessToken: AccessToken;
  chosenWorkspaceId?: string;
  email: string;
  name: string;
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
