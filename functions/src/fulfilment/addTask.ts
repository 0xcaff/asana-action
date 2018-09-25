import { ActionsSdkConversation } from "actions-on-google";
import { createTask, refreshAndSaveToken } from "../asana";
import { db } from "../database";

const getMessage = (result: Result): string => {
  switch (result) {
    case "USER_NOT_FOUND":
      return `Your asana account isn't linked yet. Link it through the Google Assistant app.`;

    case "DEFAULT_WORKSPACE_NOT_CHOSEN":
      return `A default workspace hasn't been selected. Please re-link your account.`;

    case "SUCCESS":
      return `Task created.`;
  }
};

export async function addTask(
  conv: ActionsSdkConversation,
  userId: string,
  taskName: string
): Promise<void> {
  const result = await addTaskInner(userId, taskName);
  const message = getMessage(result);

  conv.close(message);
}

async function addTaskInner(userId: string, taskName: string): Promise<Result> {
  const user = await db.getUser(userId);
  if (!user) {
    return "USER_NOT_FOUND";
  }

  const workspaceId = user.chosenWorkspaceId;
  if (!workspaceId) {
    return "DEFAULT_WORKSPACE_NOT_CHOSEN";
  }

  await refreshAndSaveToken(user, db);
  await createTask(taskName, workspaceId, user.accessToken.token);

  return "SUCCESS";
}

type Result = "USER_NOT_FOUND" | "DEFAULT_WORKSPACE_NOT_CHOSEN" | "SUCCESS";
