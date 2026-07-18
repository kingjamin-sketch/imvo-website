"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = {
  open: boolean;
  title: string;
  images: string[];
  startIndex?: number;
  onClose: () => void;
};

export default function ProjectLightbox({
  open,
  title,
  images,
  startIndex = 0,
  onClose,
}: Props) {
  const safeImages = useMemo(() => images?.filter(Boolean) ?? [], [images]);
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    if (!open) return;

    const frameId = requestAnimationFrame(() => setIndex(startIndex));
    return () => cancelAnimationFrame(frameId);
  }, [open, startIndex]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, safeImages.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, safeImages.length]);

  if (!open) return null;

  const src = safeImages[index];

  return (
    <div className="lbBackdrop" role="dialog" aria-modal="true" aria-label={`${title} image gallery`}>
      <button className="lbClose" onClick={onClose} aria-label="Close gallery">
        ✕
      </button>

      <div className="lbTop">
        <div className="lbTitle">{title}</div>
        <div className="lbCount">
          {safeImages.length ? index + 1 : 0} / {safeImages.length}
        </div>
      </div>

      <div className="lbStage">
        <button
          className="lbNav lbLeft"
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index <= 0}
          aria-label="Previous image"
        >
          ‹
        </button>

        <div className="lbMedia">
          {src ? (
            <Image
              src={src}
              alt={`${title} image ${index + 1}`}
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
              priority
            />
          ) : (
            <div className="lbEmpty">No images yet</div>
          )}
        </div>

        <button
          className="lbNav lbRight"
          onClick={() => setIndex((i) => Math.min(i + 1, safeImages.length - 1))}
          disabled={index >= safeImages.length - 1}
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      <div className="lbThumbs">
        {safeImages.map((img, i) => (
          <button
            key={`${img}-${i}`}
            className={`lbThumb ${i === index ? "lbThumbActive" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
          >
            <Image
              src={img}
              alt=""
              width={160}
              height={100}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
