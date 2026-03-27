import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-8"
      style={{ borderColor: "rgba(68, 68, 68, 0.15)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-mark.png"
            alt="Dead Pixel Design"
            width={20}
            height={20}
            className="invert brightness-50"
          />
          <span
            className="font-mono text-xs"
            style={{ color: "var(--color-text-dim)" }}
          >
            &copy; {new Date().getFullYear()} Dead Pixel Design
          </span>
        </div>

        <span
          className="font-mono text-xs"
          style={{ color: "var(--color-text-dim)" }}
        >
          Maine, USA
        </span>
      </div>
    </footer>
  );
}
