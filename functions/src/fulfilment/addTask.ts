import { ActionsSdkConversation } from "actions-on-google";
import { createTask, refreshAndSaveToken } from "../asana";
import { db } from "../database";

/**
 * Responds to a user request for request for adding a task.
 *
 * @param conv Conversation to interact with user through
 * @param userId Verified identifier of the user making the request
 * @param taskTitle Title of the task which will be created
 */
export async function addTask(
  conv: ActionsSdkConversation,
  userId: string,
  taskTitle: string
): Promise<void> {
  const result = await addTaskInner(userId, taskTitle);
  const message = getMessage(result);

  conv.close(message);
}

/**
 * Helper function for adding a new task.
 *
 * @param userId User the task will be created for
 * @param title Title of the new task
 */
async function addTaskInner(userId: string, title: string): Promise<Result> {
  const user = await db.getUser(userId);
  if (!user) {
    return "USER_NOT_FOUND";
  }

  const workspaceId = user.chosenWorkspaceId;
  if (!workspaceId) {
    return "DEFAULT_WORKSPACE_NOT_CHOSEN";
  }

  await refreshAndSaveToken(user, db);
  await createTask(title, workspaceId, user.accessToken.token);

  return "SUCCESS";
}

/**
 * Enumeration of all possible return values for {@link addTaskInner}
 */
type Result = "USER_NOT_FOUND" | "DEFAULT_WORKSPACE_NOT_CHOSEN" | "SUCCESS";

/**
 * Gets a user facing message for a {@link Result}
 *
 * @param result To get message for
 */
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
