import { default as fetch, Response } from "node-fetch";
import { URLSearchParams } from "url";

export async function getWorkspaces(accessToken: string): Promise<Workspace[]> {
  const resp = await fetch("https://app.asana.com/api/1.0/workspaces", {
    headers: { authorization: `Bearer ${accessToken}` }
  });

  return await unwrapResponse<Workspace[]>(resp);
}

export async function getWorkspace(
  workspaceId: string,
  accessToken: string
): Promise<Workspace> {
  const resp = await fetch(
    `https://app.asana.com/api/1.0/workspaces/${workspaceId}`,
    {
      headers: { authorization: `Bearer ${accessToken}` }
    }
  );

  return await unwrapResponse<Workspace>(resp);
}

export async function createTask(
  name: string,
  workspaceId: string,
  accessToken: string
): Promise<Task> {
  const body = new URLSearchParams({
    name,
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
