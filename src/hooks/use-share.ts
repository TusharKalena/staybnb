import { useEffect, useRef, useState } from "react";

const COPIED_RESET_MS = 2000;

/** Uses the native share sheet when available, otherwise copies the URL to the clipboard. */
export function useShare() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // The user dismissed the share sheet or clipboard access was denied.
    }
  };

  return { share, copied };
}
