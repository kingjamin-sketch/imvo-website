"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const inquiryTypes = [
  "Architectural Design",
  "Planning & Design",
  "Consultancy",
  "Supervision",
  "Property Development Guidance",
  "Property Acquisition Guidance",
  "Other / Custom Scope",
];

const contactDetails = [
  {
    label: "WhatsApp",
    value: "Start Conversation",
    href: "https://wa.me/250787349257",
  },
  {
    label: "Email",
    value: "imvodesign@gmail.com",
    href: "mailto:imvodesign@gmail.com?subject=Project Inquiry - IMVO",
  },
  {
    label: "Location",
    value: "IMVO Group, Kigali",
    href: "https://maps.google.com/maps?q=-1.9235606,30.0709587&z=18",
  },
  {
    label: "Scope",
    value: "Rwanda · East Africa",
    href: "/projects",
  },
];

const transition = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };
const fastTransition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

const WEB3FORMS_ACCESS_KEY = "a729c40b-0f25-4c34-9495-2b265db92f2f";

const ArchitecturalModel = () => {
  const labels = [
    { title: "BIM", sub: "Information Modeling", x: 330, y: 70 },
    { title: "PERMIT", sub: "Regulatory Compliance", x: 500, y: 112 },
    { title: "SITE", sub: "Analysis Context", x: 585, y: 235 },
    { title: "CONSULTANCY", sub: "Feasibility Advisory", x: 505, y: 350 },
    { title: "SUPERVISION", sub: "Site Monitoring", x: 95, y: 126 },
    { title: "ZONING", sub: "Planning Strategy", x: 70, y: 255 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        right: "0%",
        top: "-6%",
        width: 760,
        height: 660,
        opacity: 0.9,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 760 660"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="modelGlow" cx="55%" cy="45%" r="55%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="65%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <circle cx="410" cy="305" r="285" fill="url(#modelGlow)" />

        <motion.g
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M120 575 C220 500 340 520 430 585 C520 640 610 575 700 540"
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
          <path
            d="M190 550 C285 485 390 485 535 550"
            fill="none"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="1"
            strokeDasharray="5 9"
          />
          <circle cx="120" cy="575" r="4" fill="white" />
          <circle cx="430" cy="585" r="4" fill="white" />
          <circle cx="700" cy="540" r="4" fill="white" />
          <text
            x="100"
            y="602"
            fill="rgba(255,255,255,0.6)"
            fontSize="10"
            fontWeight="900"
            letterSpacing="2"
          >
            KIGALI
          </text>
          <text
            x="405"
            y="612"
            fill="rgba(255,255,255,0.45)"
            fontSize="10"
            fontWeight="900"
            letterSpacing="2"
          >
            RWANDA
          </text>
          <text
            x="667"
            y="568"
            fill="rgba(255,255,255,0.45)"
            fontSize="10"
            fontWeight="900"
            letterSpacing="2"
          >
            REGION
          </text>
        </motion.g>

        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M165 410 L305 350 L505 380 L610 460 L435 535 L205 495 Z"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.2"
          />
          <path
            d="M205 495 C300 435 390 430 610 460"
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
          />
          <path
            d="M305 350 L435 535"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          <path
            d="M505 380 L355 515"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          <path
            d="M145 460 C240 410 350 405 580 438"
            fill="none"
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="1"
          />
          <path
            d="M170 530 C270 485 400 490 560 520"
            fill="none"
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="1"
          />

          {[230, 310, 390, 470, 550].map((x, i) => (
            <rect
              key={i}
              x={x}
              y={430 + (i % 2) * 18}
              width="46"
              height="24"
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="1"
            />
          ))}
        </motion.g>

        {[0, 1, 2].map((_, i) => (
          <motion.ellipse
            key={i}
            cx="405"
            cy="285"
            rx={275 - i * 42}
            ry={96 - i * 14}
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1"
            strokeDasharray={`${120 - i * 18} ${85 + i * 18}`}
            animate={{ strokeDashoffset: [0, -260] }}
            transition={{
              duration: 14 + i * 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transformOrigin: "405px 285px",
              transform: `rotate(${i * 14}deg)`,
            }}
          />
        ))}

        <motion.g
          animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.65] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M245 305 L305 260 L365 305 L365 365 L245 365 Z"
            fill="none"
            stroke="rgba(255,255,255,0.72)"
            strokeWidth="1.3"
          />
          <path
            d="M272 365 L272 330 L305 330 L305 365"
            fill="none"
            stroke="rgba(255,255,255,0.38)"
            strokeWidth="1"
          />
          <path
            d="M245 305 L365 305"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          <text
            x="278"
            y="398"
            fill="rgba(255,255,255,0.55)"
            fontSize="10"
            fontWeight="900"
            letterSpacing="3"
          >
            HOME
          </text>
        </motion.g>

        <motion.g
          animate={{ y: [0, 6, 0], x: [0, -4, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M385 225 L495 248 L495 385 L385 360 Z"
            fill="none"
            stroke="rgba(255,255,255,0.62)"
            strokeWidth="1.3"
          />
          <path
            d="M385 225 L430 190 L540 215 L495 248"
            fill="none"
            stroke="rgba(255,255,255,0.42)"
            strokeWidth="1"
          />
          <path
            d="M495 248 L540 215 L540 350 L495 385"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />

          {[252, 280, 308, 336].map((y) => (
            <path
              key={y}
              d={`M405 ${y} L472 ${y + 14}`}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
            />
          ))}

          {[405, 430, 455, 480].map((x) => (
            <path
              key={x}
              d={`M${x} 236 L${x} 362`}
              stroke="rgba(255,255,255,0.13)"
              strokeWidth="1"
            />
          ))}

          <text
            x="414"
            y="415"
            fill="rgba(255,255,255,0.55)"
            fontSize="10"
            fontWeight="900"
            letterSpacing="3"
          >
            BUILDING
          </text>
        </motion.g>

        <motion.g
          animate={{ y: [0, -10, 0], opacity: [0.55, 0.95, 0.6] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M560 170 L640 202 L640 382 L560 350 Z"
            fill="none"
            stroke="rgba(255,255,255,0.62)"
            strokeWidth="1.2"
          />
          <path
            d="M560 170 L598 145 L678 178 L640 202"
            fill="none"
            stroke="rgba(255,255,255,0.38)"
            strokeWidth="1"
          />
          <path
            d="M640 202 L678 178 L678 358 L640 382"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1"
          />

          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M578 ${202 + i * 20} L625 ${220 + i * 20}`}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
          ))}

          {Array.from({ length: 5 }).map((_, i) => (
            <path
              key={i}
              d={`M${575 + i * 12} 185 L${575 + i * 12} 355`}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
          ))}

          <text
            x="552"
            y="412"
            fill="rgba(255,255,255,0.55)"
            fontSize="10"
            fontWeight="900"
            letterSpacing="3"
          >
            DEVELOPMENT
          </text>
        </motion.g>

        {[305, 450, 600].map((x, i) => (
          <motion.line
            key={x}
            x1={x}
            y1={110 + i * 15}
            x2={x}
            y2={500}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            strokeDasharray="4 8"
            animate={{ opacity: [0.2, 0.55, 0.2] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {Array.from({ length: 55 }).map((_, i) => {
          const angle = i * 137.5;
          const radius = 55 + (i % 24) * 8;
          const x = 405 + Math.cos((angle * Math.PI) / 180) * radius;
          const y = 300 + Math.sin((angle * Math.PI) / 180) * radius * 0.58;
          const size = i % 10 === 0 ? 4 : i % 4 === 0 ? 2.6 : 1.7;

          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={size}
              fill="white"
              animate={{
                opacity: [0.18, 0.9, 0.25],
                scale: [1, 1.35, 1],
              }}
              transition={{
                duration: 3 + (i % 6) * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.03,
              }}
              style={{
                filter:
                  size > 2.5
                    ? "drop-shadow(0 0 8px rgba(255,255,255,0.65))"
                    : "none",
              }}
            />
          );
        })}

        {labels.map((label, i) => (
          <motion.g
            key={label.title}
            animate={{ opacity: [0.42, 0.78, 0.42] }}
            transition={{
              duration: 5 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <circle cx={label.x - 16} cy={label.y - 4} r="3" fill="white" />
            <text
              x={label.x}
              y={label.y}
              fill="rgba(255,255,255,0.55)"
              fontSize="11"
              fontWeight="900"
              letterSpacing="3"
            >
              {label.title}
            </text>
            <text
              x={label.x}
              y={label.y + 17}
              fill="rgba(255,255,255,0.34)"
              fontSize="8"
              fontWeight="800"
              letterSpacing="1.5"
            >
              {label.sub.toUpperCase()}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (window.location.hash === "#quote") {
      setTimeout(() => {
        document.getElementById("quote")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 120);
    }
  }, [mounted]);

  if (!mounted) {
    return <div style={{ background: "#050505", minHeight: "100vh" }} />;
  }

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const sourceData = new FormData(form);

    const firstName = String(sourceData.get("firstName") || "").trim();
    const lastName = String(sourceData.get("lastName") || "").trim();
    const email = String(sourceData.get("email") || "").trim();
    const phone = String(sourceData.get("phone") || "").trim();
    const location = String(sourceData.get("location") || "").trim();
    const budget = String(sourceData.get("budget") || "").trim();
    const message = String(sourceData.get("message") || "").trim();

    const fullName = `${firstName} ${lastName}`.trim() || "Website Visitor";

    const payload = new FormData();

    payload.append("access_key", WEB3FORMS_ACCESS_KEY);
    payload.append("subject", "New Project Inquiry - IMVO");
    payload.append("from_name", "IMVO Website");

    payload.append("name", fullName);
    payload.append("email", email);
    payload.append("phone", phone);
    payload.append("message", message);

    payload.append("First Name", firstName || "Not provided");
    payload.append("Last Name", lastName || "Not provided");
    payload.append("Email Address", email || "Not provided");
    payload.append("Phone / WhatsApp", phone || "Not provided");
    payload.append("Project Location", location || "Not provided");
    payload.append("Estimated Budget", budget || "Not provided");
    payload.append(
      "Required Disciplines",
      selectedServices.length > 0 ? selectedServices.join(", ") : "Not selected"
    );
    payload.append(
      "Source Page",
      typeof window !== "undefined" ? window.location.href : "IMVO Website"
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setSelectedServices([]);
        form.reset();
      } else {
        console.error("Web3Forms error:", result);
        alert(
          "Your inquiry could not be sent. Please email IMVO directly at imvodesign@gmail.com."
        );
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      alert(
        "Something went wrong. Please email IMVO directly at imvodesign@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        background: "#050505",
        color: "white",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <section
        className="mobileStack"
        style={{
          minHeight: "calc(100vh - 88px)",
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
        }}
      >
        <div
          style={{
            padding:
              "90px max(32px, calc((100vw - 1440px) / 2 + 32px)) 70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            zIndex: 10,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: 12,
              opacity: 0.6,
              fontWeight: 800,
            }}
          >
            Contact
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.2 }}
            style={{
              margin: "18px 0 0",
              fontSize: "clamp(54px, 7vw, 118px)",
              lineHeight: 0.88,
              letterSpacing: "-0.08em",
              fontWeight: 900,
            }}
          >
            Start with
            <br />
            the right
            <br />
            conversation.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.35 }}
            style={{
              marginTop: 40,
              maxWidth: 520,
              fontSize: 18,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Tell us about your project, site, ambition, timeline, and current
            stage. We will help define whether you need design, consultancy,
            supervision, planning support, or development guidance.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...transition, delay: 0.25 }}
          style={{
            position: "relative",
            minHeight: "calc(100vh - 88px)",
            overflow: "hidden",
          }}
        >
          <Image
            src="/contact-hero.png"
            alt="Contact IMVO"
            fill
            priority
            style={{
              objectFit: "cover",
              filter: "grayscale(100%) brightness(0.8)",
              transition:
                "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), filter 1.4s ease",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.filter = "grayscale(0%) brightness(0.9)";
              event.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.filter =
                "grayscale(100%) brightness(0.8)";
              event.currentTarget.style.transform = "scale(1)";
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #050505, transparent 40%)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </section>

      {/* QUOTE FORM */}
      <section
        id="quote"
        className="mobilePad"
        style={{
          scrollMarginTop: 120,
          padding: "140px 0",
          background: "#0a0a0a",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="containerWide mobileStack"
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <div style={{ position: "sticky", top: 140 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={transition}
            >
              <div
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: 12,
                  opacity: 0.6,
                  fontWeight: 800,
                }}
              >
                Studio Access
              </div>

              <h2
                style={{
                  marginTop: 14,
                  fontSize: "clamp(28px, 3vw, 42px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                }}
              >
                Direct lines to
                <br />
                the studio.
              </h2>
            </motion.div>

            <div
              style={{
                marginTop: 60,
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {contactDetails.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...transition, delay: index * 0.1 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr auto",
                    gap: 24,
                    padding: "36px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    alignItems: "center",
                    color: "inherit",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                      fontWeight: 900,
                    }}
                  >
                    {item.label}
                  </span>

                  <span
                    style={{
                      fontSize: 18,
                      letterSpacing: "-0.02em",
                      fontWeight: 800,
                    }}
                  >
                    {item.value}
                  </span>

                  <span
                    style={{
                      opacity: 0.5,
                      transition: "all 0.3s ease",
                      fontWeight: 900,
                    }}
                  >
                    ↗
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
          >
            <div
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: 12,
                opacity: 0.6,
                fontWeight: 800,
              }}
            >
              Project Brief
            </div>

            <h2
              style={{
                marginTop: 14,
                fontSize: "clamp(28px, 3vw, 42px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              Submit your inquiry.
            </h2>

            <div style={{ marginTop: 60, minHeight: 600 }}>
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
                    transition={fastTransition}
                  >
                    <div style={{ marginBottom: 40 }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: 800,
                          marginBottom: 16,
                        }}
                      >
                        Required Disciplines
                      </label>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 12,
                        }}
                      >
                        {inquiryTypes.map((type) => {
                          const isSelected = selectedServices.includes(type);

                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => toggleService(type)}
                              style={{
                                padding: "14px 24px",
                                borderRadius: 99,
                                border: isSelected
                                  ? "1px solid white"
                                  : "1px solid rgba(255,255,255,0.15)",
                                background: isSelected ? "white" : "transparent",
                                color: isSelected
                                  ? "black"
                                  : "rgba(255,255,255,0.7)",
                                fontSize: 13,
                                fontWeight: 800,
                                cursor: "pointer",
                                transition:
                                  "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                              }}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className="mobileStack"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 24,
                        marginBottom: 24,
                      }}
                    >
                      {[
                        ["firstName", "First Name", "text"],
                        ["lastName", "Last Name", "text"],
                        ["email", "Email Address", "email"],
                        ["phone", "Phone / WhatsApp", "tel"],
                        ["location", "Project Location", "text"],
                        ["budget", "Estimated Budget (Optional)", "text"],
                      ].map(([name, placeholder, type]) => (
                        <input
                          key={name}
                          name={name}
                          type={type}
                          placeholder={placeholder}
                          required={name === "firstName" || name === "email"}
                          style={{
                            width: "100%",
                            height: 64,
                            border: "none",
                            borderBottom:
                              "1px solid rgba(255,255,255,0.2)",
                            background: "transparent",
                            color: "white",
                            padding: "0 10px",
                            outline: "none",
                            fontSize: 16,
                            fontWeight: 600,
                            transition: "all 0.3s ease",
                          }}
                        />
                      ))}
                    </div>

                    <textarea
                      name="message"
                      placeholder="Tell us about the site context, goals, and current phase..."
                      rows={5}
                      required
                      style={{
                        width: "100%",
                        border: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.2)",
                        background: "transparent",
                        color: "white",
                        padding: "20px 10px",
                        outline: "none",
                        resize: "vertical",
                        fontSize: 16,
                        fontWeight: 600,
                        fontFamily: "inherit",
                        transition: "all 0.3s ease",
                      }}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        marginTop: 40,
                        background: isSubmitting
                          ? "rgba(255,255,255,0.2)"
                          : "white",
                        color: isSubmitting ? "white" : "black",
                        padding: "20px 48px",
                        borderRadius: 99,
                        fontWeight: 800,
                        fontSize: 16,
                        border: "none",
                        cursor: isSubmitting ? "wait" : "pointer",
                      }}
                    >
                      {isSubmitting
                        ? "TRANSMITTING BRIEF..."
                        : "SUBMIT INQUIRY ↗"}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={fastTransition}
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      padding: "40px 0",
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 32,
                        boxShadow: "0 0 40px rgba(255,255,255,0.16)",
                      }}
                    >
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>

                    <div
                      style={{
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.45)",
                        fontWeight: 900,
                        marginBottom: 14,
                      }}
                    >
                      Inquiry Submitted
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        fontSize: "clamp(34px, 4vw, 52px)",
                        fontWeight: 900,
                        letterSpacing: "-0.05em",
                        lineHeight: 1,
                      }}
                    >
                      Brief received.
                    </h3>

                    <p
                      style={{
                        marginTop: 22,
                        fontSize: 18,
                        lineHeight: 1.8,
                        color: "rgba(255,255,255,0.68)",
                        maxWidth: 560,
                      }}
                    >
                      Thank you for reaching out to IMVO. Your project inquiry
                      has been received by our studio. We will review the
                      project scope, location, timeline, and requested
                      disciplines, then respond with the most appropriate next
                      step.
                    </p>
<div
  style={{
    marginTop: 18,
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 16px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.03)",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: "rgba(255,255,255,0.75)",
  }}
>
  ⏱ We typically respond within 1–2 business days
</div>
                    <p
                      style={{
                        marginTop: 16,
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.45)",
                        maxWidth: 560,
                      }}
                    >
                      For urgent matters, you can also contact us directly at{" "}
                      <a
                        href="mailto:imvodesign@gmail.com"
                        style={{
                          color: "white",
                          textDecoration: "none",
                          borderBottom:
                            "1px solid rgba(255,255,255,0.4)",
                        }}
                      >
                        imvodesign@gmail.com
                      </a>
                      .
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        flexWrap: "wrap",
                        marginTop: 42,
                      }}
                    >
                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setSelectedServices([]);
                        }}
                        style={{
                          background: "white",
                          color: "black",
                          padding: "16px 34px",
                          borderRadius: 99,
                          fontWeight: 900,
                          fontSize: 14,
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.transform = "scale(1.04)";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        SUBMIT ANOTHER INQUIRY
                      </button>

                      <a
                        href="mailto:imvodesign@gmail.com?subject=Project Inquiry - IMVO"
                        style={{
                          background: "transparent",
                          color: "white",
                          padding: "16px 34px",
                          borderRadius: 99,
                          fontWeight: 900,
                          fontSize: 14,
                          border: "1px solid rgba(255,255,255,0.22)",
                          textDecoration: "none",
                          display: "inline-block",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.backgroundColor =
                            "rgba(255,255,255,0.1)";
                          event.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.42)";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.backgroundColor =
                            "transparent";
                          event.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.22)";
                        }}
                      >
                        EMAIL THE STUDIO ↗
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LOCATION / MAP */}
      <section
        className="mobilePad"
        style={{
          background: "#050505",
          color: "white",
          paddingTop: 110,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="containerWide"
          style={{
            position: "relative",
            zIndex: 10,
            paddingBottom: 80,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
          >
            <div
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: 12,
                opacity: 0.6,
                fontWeight: 800,
              }}
            >
              Location
            </div>

            <h2
              style={{
                margin: "16px 0 0",
                fontSize: "clamp(42px,5vw,84px)",
                lineHeight: 0.95,
                letterSpacing: "-0.07em",
                fontWeight: 900,
              }}
            >
              Kigali base.
              <br />
              Regional reach.
            </h2>

            <p
              style={{
                marginTop: 40,
                maxWidth: 470,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.9,
                fontSize: 17,
              }}
            >
              IMVO Group operates from Kigali, Rwanda, supporting design,
              consultancy, supervision, planning, and development-oriented
              projects across Rwanda and the wider East African region.
            </p>
          </motion.div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 10,
            width: "58%",
            height: 700,
            overflow: "hidden",
            zIndex: 4,
            pointerEvents: "none",
          }}
        >
          <ArchitecturalModel />
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "65vh",
            background: "#111",
          }}
        >
          <iframe
            title="IMVO Location"
            src="https://maps.google.com/maps?q=-1.9235606,30.0709587&z=18&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            style={{
              border: 0,
              filter: "grayscale(100%) invert(92%) contrast(92%) brightness(95%)",
            }}
          />
        </div>
      </section>
    </div>
  );
}