import { SellerShell } from "@/components/seller/SellerShell";
import { AiScanModal } from "@/components/seller/ai-scan/AiScanModal";
export default function SellerScanPage() {
  return (
    <SellerShell active="inventory">
      <main
        style={{
          minHeight: "calc(100vh - 64px)",
          padding: 32,
          background: "#f7f9f8",
          filter: "blur(1px)",
          opacity: 0.45,
        }}
      >
        <h1>Inventaris & Audit Paspor Digital</h1>
        <p>
          Manajemen katalog sirkular terverifikasi dan diagnosis kondisi AI.
        </p>
        <div
          style={{
            marginTop: 24,
            height: 380,
            borderRadius: 18,
            background: "white",
          }}
        />
      </main>
      <AiScanModal />
    </SellerShell>
  );
}
