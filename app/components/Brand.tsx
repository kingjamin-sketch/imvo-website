export default function Brand({ 
  size = "md", 
  variant = "dark" 
}: { 
  size?: "sm" | "md" | "lg", 
  variant?: "dark" | "light"
}) {
  const isWhite = variant === "light";
  
  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: 16, 
      color: isWhite ? "white" : "black",
      transition: "color 0.3s ease",
      userSelect: "none"
    }}>
      <span style={{ 
        fontWeight: 900, 
        fontSize: size === "lg" ? 32 : 24,
        lineHeight: 1,
        letterSpacing: "-0.02em"
      }}>
        IMVO
      </span>
      
      {/* Motto permanently rendered beside the logo */}
      <span style={{ 
        fontSize: 11, 
        letterSpacing: "0.25em", 
        textTransform: "uppercase",
        fontWeight: 700,
        opacity: 0.8,
        marginTop: 2
      }}>
        INTELLECTU · MENS · VISIO · ORIGO
      </span>
    </div>
  );
}