import { config } from "../config";

export interface JournalEntry {
  id: string;
  text: string;
  photoUrl?: string;
  fossilId?: string;
  createdAt: string;
  teacherComment?: string;
}

async function request<T>(path: string, token: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${config.apiUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: { Authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
  });
  if (!response.ok) throw new Error(`API ${path} svarte ${response.status}`);
  return (await response.json()) as T;
}

export const api = {
  journal: (token: string) => request<JournalEntry[]>("/api/feltdagbok", token),
  addEntry: (token: string, entry: FormData) =>
    request<JournalEntry>("/api/feltdagbok", token, { method: "POST", body: entry }),
  classFinds: (token: string, group: string) =>
    request<Array<{ pupil: string; place: string; lat: number; lng: number }>>(
      `/api/klasser/${encodeURIComponent(group)}/funn`,
      token,
    ),
  comment: (token: string, entryId: string, text: string) =>
    request<JournalEntry>(`/api/feltdagbok/${entryId}/kommentar`, token, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }),
};
