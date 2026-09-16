export default function Brand({
  size = "md",
  variant = "dark",
}: {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
}) {
  const widths = { sm: 190, md: 255, lg: 330 } as const;

  return (
    <img
      src="/brand/imvo-main.svg"
      alt="IMVO — Intellectu. Mens. Visio. Origo."
      draggable={false}
      style={{
        display: "block",
        width: widths[size],
        maxWidth: "42vw",
        height: "auto",
        filter: variant === "light" ? "invert(1)" : "none",
        transition: "filter 0.3s ease, opacity 0.3s ease",
        userSelect: "none",
      }}
    />
  );
}
