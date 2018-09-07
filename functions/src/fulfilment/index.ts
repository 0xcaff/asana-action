import { actionssdk, SignIn } from "actions-on-google";
import { isDevelopment as debug } from "../env";
import { Data, SignInInput } from "./types";
import { addTask } from "./addTask";

export const app = actionssdk({
  debug,
  verification: {
    project: "asana-e43ee"
  },
  clientId:
    "942954643395-90r4fv3iqqnspl3fb16jou5drmpf6g6b.apps.googleusercontent.com"
});

app.intent("actions.intent.MAIN", conv =>
  conv.close(
    `Hey, you can ask me to add tasks to Asana by saying "Tell Asana to add task Get Groceries."`
  )
);

app.intent("ADD_TASK", async conv => {
  const taskName = conv.arguments.get("name") as string;
  if (!conv.user.profile.payload) {
    conv.data = { taskName } as Data;

    conv.ask(new SignIn("To connect with Asana"));
    return;
  }

  await addTask(conv, conv.user.profile.payload.sub, taskName);
});

app.intent(
  "actions.intent.SIGN_IN",
  async (conv, params, signIn: SignInInput) => {
    if (signIn.status !== "OK" || !conv.user.profile.payload) {
      conv.close("Sign in failed. Please link your Google Account.");
      return;
    }

    const data = conv.data as Data;
    const taskName = data.taskName;

    await addTask(conv, conv.user.profile.payload.sub, taskName);
  }
);
