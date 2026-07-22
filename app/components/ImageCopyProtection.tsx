"use client";

import { useEffect } from "react";

const protectedMediaSelector =
  "img, picture, .imvo-protected-media, .imvo-protected-plan";

function isProtectedMedia(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(protectedMediaSelector));
}

export default function ImageCopyProtection() {
  useEffect(() => {
    const preventImageAction = (event: Event) => {
      if (isProtectedMedia(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventImageAction, { capture: true });
    document.addEventListener("dragstart", preventImageAction, { capture: true });
    document.addEventListener("selectstart", preventImageAction, { capture: true });

    return () => {
      document.removeEventListener("contextmenu", preventImageAction, { capture: true });
      document.removeEventListener("dragstart", preventImageAction, { capture: true });
      document.removeEventListener("selectstart", preventImageAction, { capture: true });
    };
  }, []);

  return null;
}
