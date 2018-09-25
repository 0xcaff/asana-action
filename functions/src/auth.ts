/**
 * Functions to create and verify JWT tokens
 */

import * as jwt from "jsonwebtoken";
import * as functions from "firebase-functions";

const publicKey = functions.config().jwt.public_key;
const privateKey = functions.config().jwt.private_key;

export interface Payload {
  /**
   * Unique identifier associated with an Asana account
   */
  sub: string;
}

const algorithm = "RS256";

/**
 * Verifies that the JWT token in is valid. Uses our application's keys and
 * settings.
 *
 * @param token Token to verify and decode
 */
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

/**
 * Signs the payload and encodes it as a JWT token. Uses our application's keys
 * and settings.
 *
 * @param payload Payload to sign
 */
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
