// ============================================================
// PakaiLagi - Shared UI Classes
// Design system untuk seluruh halaman
// ============================================================

// ------------------------------------------------------------
// Typography
// ------------------------------------------------------------

export const display = "font-[family-name:var(--font-display,Georgia,serif)]";

export const body = "font-[family-name:var(--font-body,system-ui,sans-serif)]";

export const h1 = `${display} text-[2rem] leading-[1.08] font-normal tracking-[-0.01em] sm:text-[2.6rem]`;

export const h2 = `${display} text-[2rem] leading-[1.08] font-normal tracking-[-0.01em] sm:text-[2.6rem]`;

export const cardTitle = "text-[1.1rem] font-semibold tracking-tight";

// ------------------------------------------------------------
// Layout
// ------------------------------------------------------------

export const pageBg = `${body} min-h-screen bg-[#F7F8F7] text-[#111827] antialiased`;

export const container = "mx-auto w-full max-w-[1200px] px-4 sm:px-6";

// ------------------------------------------------------------
// Focus
// ------------------------------------------------------------

export const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#12705A]";

export const focusDark =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white";

export const focusWithin =
  "focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-[#12705A]";

// ------------------------------------------------------------
// Card
// ------------------------------------------------------------

export const card =
  "rounded-2xl border border-[#E4E7EB] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04),0_10px_28px_-14px_rgba(17,24,39,0.10)]";

export const cardPad = `${card} p-5 sm:p-6`;

// ------------------------------------------------------------
// Buttons
// ------------------------------------------------------------

const btnBase =
  `inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 ` +
  `rounded-xl px-4 text-[0.9rem] font-semibold transition-colors ` +
  `disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${focus}`;

export const btn = btnBase;

export const btnPrimary = `${btnBase} bg-[#0B4F3F] text-white hover:bg-[#083D31]`;

export const btnSecondary = `${btnBase} border border-[#E4E7EB] bg-white text-[#111827] hover:border-[#0B4F3F]`;

export const btnDanger = `${btnBase} border border-[#EBCFC5] bg-white text-[#B4432B] hover:bg-[#FBEDE8]`;

export const btnGold = `${btnBase} ${focusDark} bg-[#E2BC6B] text-[#111827] hover:bg-[#ECCB86]`;

export const btnGhost = `${btnBase} text-[#5B6675] hover:bg-[#ECEEEB] hover:text-[#111827]`;

export const btnGhostDark = `${btnBase} ${focusDark} border border-white/30 text-white hover:bg-white/10`;

// ------------------------------------------------------------
// Link Buttons
// ------------------------------------------------------------

export const btnLinkPrimary = `${btnBase} no-underline bg-[#0B4F3F] !text-white hover:bg-[#083D31]`;

export const btnLinkSecondary = `${btnBase} no-underline border border-[#E4E7EB] bg-white !text-[#111827] hover:border-[#0B4F3F]`;

// ------------------------------------------------------------
// Small / Row Button
// ------------------------------------------------------------

export const btnRow =
  `inline-flex min-h-9 shrink-0 cursor-pointer items-center justify-center ` +
  `rounded-lg bg-[#0B4F3F] px-3.5 text-[0.82rem] font-semibold ` +
  `whitespace-nowrap text-white transition-colors hover:bg-[#083D31] ${focus}`;

// ------------------------------------------------------------
// Badges
// ------------------------------------------------------------

export const badge =
  "inline-flex items-center gap-1.5 rounded-full bg-[#E6F2ED] px-2.5 py-1 text-xs font-semibold text-[#0B4F3F]";

export const badgeNeutral =
  "inline-flex items-center gap-1.5 rounded-full border border-[#E4E7EB] px-2.5 py-1 text-xs font-semibold text-[#5B6675]";

export const badgeGold =
  "inline-flex items-center gap-1.5 rounded-full bg-[#F5ECD7] px-2.5 py-1 text-xs font-semibold text-[#8A6A25]";

export const badgeError =
  "inline-flex items-center gap-1.5 rounded-full bg-[#FBEDE4] px-2.5 py-1 text-xs font-semibold text-[#9A4A1B]";

// ------------------------------------------------------------
// Form
// ------------------------------------------------------------

export const field =
  "w-full rounded-xl border border-[#E4E7EB] bg-white px-3.5 text-[0.92rem] text-[#111827] placeholder:text-[#7A8593] focus:border-[#0B4F3F] focus:ring-4 focus:ring-[#0B4F3F]/10 focus:outline-none";

export const input = `${field} h-11`;

export const textarea = `${field} min-h-24 py-2.5`;

export const select = `${input} cursor-pointer appearance-none pr-10`;

export const selectWrap = "relative w-full sm:w-auto";

export const selectIcon =
  "pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[#5B6675]";

export const fieldLabel = "flex flex-col gap-1.5 text-[0.85rem] font-semibold";

export const fieldWithin =
  "focus-within:border-[#0B4F3F] focus-within:ring-4 focus-within:ring-[#0B4F3F]/10";

export const checkbox = `h-4 w-4 shrink-0 cursor-pointer accent-[#0B4F3F] ${focus}`;

// ------------------------------------------------------------
// Segmented Tabs
// ------------------------------------------------------------

export const segmented = "inline-flex gap-1 rounded-xl bg-[#ECEEEB] p-1";

export const segTab = (active: boolean) =>
  `inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 ` +
  `rounded-lg px-4 text-[0.88rem] font-semibold whitespace-nowrap ` +
  `transition-all ${focus} ${
    active
      ? "bg-white text-[#111827] shadow-[0_1px_3px_rgba(17,24,39,0.12)]"
      : "text-[#5B6675] hover:text-[#111827]"
  }`;

// ------------------------------------------------------------
// Modal
// ------------------------------------------------------------

export const modalBackdrop =
  "fixed inset-0 z-50 flex items-end justify-center bg-[#0A3D31]/60 backdrop-blur-sm sm:items-center sm:p-6";

export const nestedBackdrop =
  "fixed inset-0 z-[60] flex items-end justify-center bg-[#111827]/60 backdrop-blur-sm sm:items-center sm:p-6";

export const modalPanel =
  `${body} flex max-h-[100dvh] w-full flex-col overflow-hidden ` +
  `rounded-t-3xl bg-[#F7F8F7] text-[#111827] antialiased ` +
  `shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] ` +
  `sm:max-h-[92vh] sm:rounded-3xl`;

export const modalHeader =
  "flex items-start justify-between gap-4 border-b border-[#E4E7EB] bg-white p-4 sm:p-6";

export const modalFooter =
  "flex flex-col gap-3 border-t border-[#E4E7EB] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6";

export const modalTitle =
  `${display} text-[1.35rem] leading-[1.15] font-normal ` +
  `tracking-[-0.01em] sm:text-[1.75rem]`;

export const actionsRow =
  "flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:items-center";

export const closeBtn =
  `grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full ` +
  `text-[#5B6675] transition-colors hover:bg-[#ECEEEB] hover:text-[#111827] ${focus}`;

// ------------------------------------------------------------
// Toast
// ------------------------------------------------------------

export const toastBox =
  "fixed right-4 bottom-4 z-[70] max-w-[calc(100vw-2rem)] rounded-xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-12px_rgba(17,24,39,0.5)] sm:right-6 sm:bottom-6";

// ------------------------------------------------------------
// Utilities
// ------------------------------------------------------------

export const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");
