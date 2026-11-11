import type { Viewer } from "../auth/AuthContext";
import { config } from "../config";

export interface JournalEntry {
  id: string;
  text: string;
  photoUrl?: string;
  fossilId?: string;
  createdAt: string;
  teacherComment?: string;
}

type Tokens = Pick<Viewer, "accessToken" | "idToken">;

async function request<T>(path: string, tokens: Tokens, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${config.apiUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
      "X-Feide-Id-Token": tokens.idToken,
      ...(init.headers ?? {}),
    },
  });
  if (!response.ok) throw new Error(`API ${path} svarte ${response.status}`);
  return (await response.json()) as T;
}

export const api = {
  journal: (tokens: Tokens) => request<JournalEntry[]>("/api/feltdagbok", tokens),
  addEntry: (tokens: Tokens, entry: FormData) =>
    request<JournalEntry>("/api/feltdagbok", tokens, { method: "POST", body: entry }),
  classFinds: (tokens: Tokens, groupId: string) =>
    request<Array<{ pupil: string; place: string; lat: number; lng: number }>>(
      `/api/klasser/${encodeURIComponent(groupId)}/funn`,
      tokens,
    ),
  comment: (tokens: Tokens, entryId: string, text: string) =>
    request<JournalEntry>(`/api/feltdagbok/${entryId}/kommentar`, tokens, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }),
};
