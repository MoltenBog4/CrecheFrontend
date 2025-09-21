import React, { useState } from "react";


/**
 * Newsletter Subscribe Form (front-end only)
 * - If `POST /api/subscribe` is available, it will use it.
 * - Otherwise it will “fake succeed” so you can demo without a backend.
 *
 * Props:
 * - onSuccess?: () => void   (called when subscription succeeds)
 * - compact?: boolean        (smaller paddings)
 */
export default function SubscribeForm({ onSuccess, compact = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const validEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setStatus("loading");

      // Try your real backend first (adjust the URL if needed)
      const res = await fetch("http://localhost:8080/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        // If backend isn’t running, fall back to a fake success
        // throw new Error(`HTTP ${res.status}`);
        await new Promise((r) => setTimeout(r, 600));
        setStatus("success");
        setEmail("");
        onSuccess?.();
        return;
      }

      // Backend returned ok:
      await res.text();
      setStatus("success");
      setEmail("");
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={`nl-box ${compact ? "nl-compact" : ""}`}>
      <h3 className="nl-heading">📬 Subscribe to Newsletter</h3>
      <p className="nl-sub">
        Get crèche updates: term dates, events, reminders & early-learning tips.
      </p>

      <form className="nl-form" onSubmit={handleSubmit} noValidate>
        <div className="nl-row">
          <label htmlFor="nl-email" className="sr-only">
            Email address
          </label>
          <input
            id="nl-email"
            className="nl-input"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(error)}
            required
          />
          <button
            className="nl-btn"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </div>

        {error && <p className="nl-error">⚠️ {error}</p>}
        {status === "success" && (
          <p className="nl-success">✅ Thank you! Please check your email.</p>
        )}
        <p className="nl-hint">We respect your privacy. Unsubscribe anytime.</p>
      </form>
    </div>
  );
}

/* Small helper for screen-reader-only text */
function SrOnly() {
  return null;
}
