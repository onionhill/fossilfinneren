import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { config } from "../config";
import { userManager } from "./feide";

export type Role = "elev" | "laerer";

export interface TeachingGroup {
  id: string;
  name: string;
}

export interface Viewer {
  name: string;
  role: Role;
  school: string;
  groups: TeachingGroup[];
  accessToken: string;
  /** Sent to the API, which checks it was issued to Fossilfinneren's client. */
  idToken: string;
}

interface AuthState {
  viewer: Viewer | null;
  login: (role?: Role) => Promise<void>;
  logout: () => Promise<void>;
  completeLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

// Feide's test organisation, used when VITE_AUTH_MODE=mock.
const MOCK_VIEWERS: Record<Role, Viewer> = {
  elev: {
    name: "Asbjørn ElevEn",
    role: "elev",
    school: "Feide testskole",
    groups: [{ id: "fc:gogroup:spusers.feide.no:3a-nat", name: "3A naturfag" }],
    accessToken: "mock-elev",
    idToken: "",
  },
  laerer: {
    name: "Turid LærerEn",
    role: "laerer",
    school: "Feide testskole",
    groups: [
      { id: "fc:gogroup:spusers.feide.no:3a-nat", name: "3A naturfag" },
      { id: "fc:gogroup:spusers.feide.no:4b-nat", name: "4B naturfag" },
    ],
    accessToken: "mock-laerer",
    idToken: "",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [viewer, setViewer] = useState<Viewer | null>(null);

  const loadViewer = useCallback(async () => {
    if (config.authMode === "mock") {
      const role = sessionStorage.getItem("mock-role") as Role | null;
      setViewer(role ? MOCK_VIEWERS[role] : null);
      return;
    }
    const user = await userManager.getUser();
    if (!user || user.expired) return setViewer(null);
    const response = await fetch(`${config.apiUrl}/api/meg`, {
      headers: { Authorization: `Bearer ${user.access_token}`, "X-Feide-Id-Token": user.id_token ?? "" },
      credentials: "include",
    });
    if (!response.ok) return setViewer(null);
    const me = (await response.json()) as Omit<Viewer, "accessToken" | "idToken">;
    setViewer({ ...me, accessToken: user.access_token, idToken: user.id_token ?? "" });
  }, []);

  useEffect(() => {
    void loadViewer();
  }, [loadViewer]);

  const value = useMemo<AuthState>(
    () => ({
      viewer,
      login: async (role = "elev") => {
        if (config.authMode === "mock") {
          sessionStorage.setItem("mock-role", role);
          await loadViewer();
          return;
        }
        await userManager.signinRedirect();
      },
      logout: async () => {
        await fetch(`${config.apiUrl}/api/logg-ut`, { method: "POST", credentials: "include" }).catch(
          () => undefined,
        );
        if (config.authMode === "mock") {
          sessionStorage.removeItem("mock-role");
          setViewer(null);
          return;
        }
        await userManager.signoutRedirect();
      },
      completeLogin: async () => {
        await userManager.signinRedirectCallback();
        await loadViewer();
      },
    }),
    [viewer, loadViewer],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("useAuth must be used inside AuthProvider");
  return auth;
}
