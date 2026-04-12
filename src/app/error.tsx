"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: "var(--color-bg-void)",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p
        className="heading-section mb-4"
        style={{ color: "var(--color-accent-gold)" }}
      >
        ERROR
      </p>
      <h1
        className="heading-display mb-4"
        style={{
          fontSize: "clamp(1.4rem, 4vw, 2.4rem)",
          color: "var(--color-text-primary)",
        }}
      >
        Something broke.
      </h1>
      <p
        className="body-text mb-8"
        style={{ maxWidth: "400px" }}
      >
        An unexpected error occurred. Try again, or head back to the homepage.
      </p>
      <button onClick={reset} className="btn-ghost">
        Try again
      </button>
    </div>
  );
}
