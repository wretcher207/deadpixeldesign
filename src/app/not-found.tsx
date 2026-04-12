import Link from "next/link";

export default function NotFound() {
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
        404
      </p>
      <h1
        className="heading-display mb-4"
        style={{
          fontSize: "clamp(1.4rem, 4vw, 2.4rem)",
          color: "var(--color-text-primary)",
        }}
      >
        Nothing here.
      </h1>
      <p
        className="body-text mb-8"
        style={{ maxWidth: "400px" }}
      >
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-ghost">
        Back to home
      </Link>
    </div>
  );
}
