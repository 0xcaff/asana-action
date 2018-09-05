import * as functions from "firebase-functions";
import * as express from "express";
import { server } from "./graphql";

const app = express();
server.applyMiddleware({ app, path: "/" });

export const graphql = functions.https.onRequest(app);
