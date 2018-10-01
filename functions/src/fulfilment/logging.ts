import {
  ActionsSdkIntentHandler,
  ActionsSdkConversation,
  Argument
} from "actions-on-google";
import * as functions from "firebase-functions";
import * as chatbase from "@google/chatbase";

import { verify, Payload } from "../auth";

const key = functions.config().chatbase.api_key;

export function withLogging<
  TConvData,
  TUserStorage,
  TArgument extends Argument,
  TConversation extends ActionsSdkConversation<TConvData, TUserStorage>
>(
  handler: ActionsSdkIntentHandler<
    TConvData,
    TUserStorage,
    TConversation,
    TArgument
  >
): ActionsSdkIntentHandler<TConvData, TUserStorage, TConversation, TArgument> {
  return (conv, ...args: any[]) => {
    // @ts-ignore
    const result = handler(conv, ...args);

    // Start logging in background.
    // tslint:disable-next-line
    logEvent(conv);

    return result;
  };
}

async function getUser(token?: string): Promise<Payload | undefined> {
  if (token) {
    return await verify(token);
  }

  return undefined;
}

async function logEvent<TConvData, TUserStorage>(
  conv: ActionsSdkConversation<TConvData, TUserStorage>
) {
  const user = await getUser(conv.user.access.token);

  const set = chatbase
    .newMessageSet()
    .setApiKey(key)
    .setPlatform("Actions")
    .setCustomSessionId(conv.id)
    .setIntent(conv.intent)
    .setUserId(user ? user.sub : "anonymous");

  const userMessage = set
    .newMessage()
    .setAsTypeUser()
    .setMessage(conv.input.raw);

  const response = conv.responses
    .filter(resp => typeof resp === "string")
    .join("\n");

  const agentMessage = set
    .newMessage()
    .setMessage(response)
    .setAsNotFeedback()
    .setAsTypeAgent();

  if (conv.intent === "actions.intent.MAIN") {
    userMessage.setAsNotHandled();
    agentMessage.setAsFeedback();
  } else {
    userMessage.setAsHandled();
    agentMessage.setAsNotFeedback();
  }

  await set.sendMessageSet();
}
