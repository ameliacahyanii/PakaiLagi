"use client";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { focus, input } from "@/components/ui/tokens";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Konten di sisi kanan label, misalnya link "Lupa kata sandi?" */
  labelExtra?: ReactNode;
  /** Elemen di dalam kolom sisi kanan, misalnya tombol tampilkan sandi */
  end?: ReactNode;
  /** Teks bantuan atau pesan error di bawah kolom */
  hint?: ReactNode;
};

/** Kolom formulir auth: label, ikon kiri, input, dan opsi elemen kanan. */
export function AuthInput({
  id,
  label,
  icon: Icon,
  labelExtra,
  end,
  hint,
  ...rest
}: Props) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold">
          {label}
        </label>
        {labelExtra}
      </div>
      <div className="relative">
        <Icon
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#5B6675]"
        />
        <input
          id={id}
          {...rest}
          className={`${input} pl-10 ${end ? "pr-12" : ""}`}
        />
        {end && (
          <div className="absolute top-1/2 right-1.5 -translate-y-1/2">
            {end}
          </div>
        )}
      </div>
      {hint}
    </div>
  );
}

export function PasswordToggle({
  shown,
  onToggle,
}: {
  shown: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={shown}
      aria-label={shown ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
      className={`grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-[#5B6675] transition-colors hover:bg-[#F3F4F2] ${focus}`}
    >
      {shown ? <EyeOff size={17} /> : <Eye size={17} />}
    </button>
  );
}
