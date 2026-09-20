"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function useToast(duration = 2600) {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const notify = useCallback(
    (value: string) => {
      setMessage(value);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setMessage(""), duration);
    },
    [duration],
  );

  const toast = (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4"
    >
      {message && (
        <div className="rounded-xl bg-[#111827] px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          {message}
        </div>
      )}
    </div>
  );

  return { notify, toast };
}
