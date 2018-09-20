import * as jwt from "jsonwebtoken";
import * as functions from "firebase-functions";

const publicKey = functions.config().public_key;
const privateKey = functions.config().private_key;

export interface Payload {
  /**
   * Unique identifier associated with an Asana account.
   */
  sub: string;
}

const algorithm = "RS256";

export const verify = (token: string): Promise<Payload> =>
  new Promise((resolve, reject) =>
    jwt.verify(
      token,
      publicKey,
      {
        algorithms: [algorithm]
      },
      (err, decoded) => {
        if (err) reject(err);

        resolve(decoded as Payload);
      }
    )
  );

export const sign = (payload: Payload): Promise<string> =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      privateKey,
      { algorithm, expiresIn: "1y" },
      (err, encoded) => {
        if (err) reject(err);

        resolve(encoded);
      }
    )
  );
