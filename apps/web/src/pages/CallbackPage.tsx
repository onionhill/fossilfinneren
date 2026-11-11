import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/** The Feide redirect URI, https://fossilfinneren.no/auth/callback. */
export function CallbackPage() {
  const { completeLogin } = useAuth();
  const navigate = useNavigate();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    completeLogin()
      .then(() => navigate("/feltdagbok", { replace: true }))
      .catch(() => navigate("/logg-inn", { replace: true }));
  }, [completeLogin, navigate]);

  return <p role="status">Logger inn med Feide …</p>;
}
