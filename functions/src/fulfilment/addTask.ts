import { ActionsSdkConversation } from "actions-on-google";
import { createTask, refreshAndSaveToken } from "../asana";
import { db } from "../database";

const getMessage = (result: Result): string => {
  switch (result) {
    case "ASANA_NOT_LINKED":
      return `Your asana account isn't linked yet. Go to asana-action.0xcaff.me and link it.`;

    case "DEFAULT_WORKSPACE_NOT_CHOSEN":
      return `A default workspace hasn't been selected. Go to asana-action.0xcaff.me and select one.`;

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
    return "ASANA_NOT_LINKED";
  }

  const workspaceId = user.chosenWorkspaceId;
  if (!workspaceId) {
    return "DEFAULT_WORKSPACE_NOT_CHOSEN";
  }

  await refreshAndSaveToken(user, db);
  await createTask(taskName, workspaceId, user.accessToken.token);

  return "SUCCESS";
}

type Result = "ASANA_NOT_LINKED" | "DEFAULT_WORKSPACE_NOT_CHOSEN" | "SUCCESS";
