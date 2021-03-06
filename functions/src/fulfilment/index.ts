/**
 * Fulfilment for Action on Google. Is called by Google Assistant when the
 * action is invoked. Responsible for taking action based on user request.
 */

import { actionssdk, SignIn } from "actions-on-google";
import { isDevelopment as debug } from "../env";
import { addTask } from "./addTask";
import { verify } from "../auth";
import { withLogging } from "./logging";

export const app = actionssdk({
  debug,
  verification: {
    project: "asana-e43ee"
  }
});

app.intent(
  "actions.intent.MAIN",
  withLogging(conv =>
    conv.close(
      `Hey, you can ask me to add tasks to Asana by saying something like, "Tell Asana Unofficial to add task, Get Groceries.`
    )
  )
);

app.intent(
  "ADD_TASK",
  withLogging(async conv => {
    const taskName = conv.arguments.get("name") as string;
    if (!conv.user.access.token) {
      conv.data = { taskName } as Data;

      conv.ask(new SignIn("To connect with Asana"));
      return;
    }

    const user = await verify(conv.user.access.token);
    await addTask(conv, user.sub, taskName);
  })
);

app.intent(
  "actions.intent.SIGN_IN",
  withLogging(async (conv, params, signIn: SignInInput) => {
    if (signIn.status !== "OK" || !conv.user.access.token) {
      conv.close("Sign in failed. Please link your Asana Account.");
      return;
    }

    const data = conv.data as Data;
    const taskName = data.taskName;

    const user = await verify(conv.user.access.token);
    await addTask(conv, user.sub, taskName);
  })
);

interface Data {
  taskName: string;
}

interface SignInInput {
  status: "OK" | string;
}
