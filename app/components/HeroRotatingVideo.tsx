"use client";

export default function HeroRotatingVideo() {
  return (
    <div 
      style={{ 
        position: "absolute", 
        inset: 0, 
        width: "100%", 
        height: "100%", 
        overflow: "hidden", 
        background: "#000" 
      }} 
      aria-hidden="true"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-1.jpg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/hero-1.mp4" type="video/mp4" />
      </video>
    </div>
  );
}