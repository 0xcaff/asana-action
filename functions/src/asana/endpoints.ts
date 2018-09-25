import { default as fetch, Response } from "node-fetch";
import { URLSearchParams } from "url";

/**
 * Fetches the currently signed in user.
 */
export async function getMe(accessToken: string): Promise<User> {
  const resp = await fetch("https://app.asana.com/api/1.0/users/me", {
    headers: { authorization: `Bearer ${accessToken}` }
  });

  return await unwrapResponse<User>(resp);
}

/**
 * Gets first page of workspaces of the current user.
 */
export async function getWorkspaces(accessToken: string): Promise<Workspace[]> {
  const resp = await fetch("https://app.asana.com/api/1.0/workspaces", {
    headers: { authorization: `Bearer ${accessToken}` }
  });

  return await unwrapResponse<Workspace[]>(resp);
}

/**
 * Creates a new task for the current user.
 *
 * @param title Title of the task
 * @param workspaceId Identifier of the workspace the task will be created in
 */
export async function createTask(
  title: string,
  workspaceId: string,
  accessToken: string
): Promise<Task> {
  const body = new URLSearchParams({
    name: title,
    assignee: "me",
    workspace: workspaceId
  });

  const resp = await fetch("https://app.asana.com/api/1.0/tasks", {
    body,
    method: "POST",
    headers: { authorization: `Bearer ${accessToken}` }
  });

  return await unwrapResponse<Task>(resp);
}

/**
 * Helper function to unwrap the data part of a response from Asana API calls.
 * Throws an error if an error is returned by Asana.
 *
 * @param resp Response to unwrap
 */
async function unwrapResponse<T>(resp: Response): Promise<T> {
  if (resp.status >= 400) {
    throw await resp.text();
  }

  const json: Envelope<T> = await resp.json();
  if (json.errors) {
    throw json;
  }

  return json.data;
}

/**
 * The shape of the data returned by Asana's API.
 */
interface Envelope<T> {
  data: T;
  errors?: Error[];
}

interface Error {
  help?: string;
  phrase?: string;
  message: string;
}

interface Task {
  gid: string;
}

export interface Workspace {
  gid: string;
  name: string;
}

export interface User {
  gid: string;
  email: string;
  name: string;
}
