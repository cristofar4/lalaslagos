import { useState } from "react";

/** <img> that falls back to a noir/lime gradient block if the source fails. */
export function SmartImg({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className={className}
        style={{
          backgroundImage:
            "radial-gradient(120% 120% at 30% 20%, rgba(201,242,77,0.16), transparent 55%), linear-gradient(160deg, #1e1e1a, #0f0f0d)",
        }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
