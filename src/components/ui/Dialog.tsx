"use client";
import { X } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";
import { display, focus } from "@/components/ui/tokens";

/** Dialog aksesibel: Esc & klik di luar menutup, fokus terkunci, scroll halaman dikunci. */
export function Dialog({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const el = ref.current;
    const selector =
      'input:not([type="hidden"]),textarea,select,button:not([disabled]),[href]';
    el?.querySelector<HTMLElement>("input,textarea")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !el) return;
      const items = Array.from(el.querySelectorAll<HTMLElement>(selector));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-end bg-[#111827]/50 p-0 backdrop-blur-[2px] sm:place-items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] sm:max-w-lg sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className={`${display} text-[1.7rem] leading-tight font-normal`}>
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className={`grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg text-[#5B6675] transition-colors hover:bg-[#F3F4F2] ${focus}`}
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/** Label + kontrol + hint untuk formulir. */
export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-[#5B6675]">{hint}</p>}
    </div>
  );
}
