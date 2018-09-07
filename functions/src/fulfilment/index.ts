import { actionssdk } from "actions-on-google";
import { isDevelopment as debug } from "../env";

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
    `Hey, you can ask me to add tasks to Asana by saying "Tell unofficial asana to add a task "Get Groceries."`
  )
);

app.intent("actions.intent.SIGN_IN", conv => conv.close("Sign In Intent"));

app.intent("ADD_TASK", conv => conv.close("Add Task Intent"));
