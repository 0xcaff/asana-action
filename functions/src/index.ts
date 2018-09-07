import * as functions from "firebase-functions";
import * as express from "express";
import { server } from "./graphql";
import { app as fulfilmentApp } from "./fulfilment";

const app = express();
server.applyMiddleware({ app, path: "/" });

export const graphql = functions.https.onRequest(app);

export const fulfilment = functions.https.onRequest(fulfilmentApp);
