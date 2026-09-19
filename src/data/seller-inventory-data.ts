export type InventoryState =
  "active" | "action" | "completed" | "draft" | "repair";
export type SellerInventoryItem = {
  id: string;
  name: string;
  category: string;
  passport: string;
  image: string;
  price: number;
  score: number;
  scoreLabel: string;
  route: string;
  status: string;
  state: InventoryState;
  detail: string;
  action: string;
};

export const sellerInventory: SellerInventoryItem[] = [
  {
    id: "sony-a6000",
    name: "Sony Alpha A6000 Kit 16-50mm",
    category: "Kamera & Optik",
    passport: "PASSPORT-SNY-9921",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZZlgVpq_e_4iTPK_tTATnPv-UUGBrrSVw6FihnL5gE4Agkp_8lxmkHjalU_4bf1Uscefm4gp8ncINIUiWihr8_DeEiQ9pE1nP6_VXwYiX1K7kMLEqdn1dXMPpAy5QEPbCmh_x7LAmSdSufCGkHujae-CXOJagNLtnj-sKUU8jfdwEG4Ph6aF7kdcEmYaeYGF_kIpvfY2yyPlHdAxScV_SPA8WfDjB24tGwEypcEeXpIc0VjBO5qMx",
    price: 4500000,
    score: 88,
    scoreLabel: "Sangat Baik",
    route: "Jual Kembali",
    status: "Perlu Dikirim (Escrow)",
    state: "action",
    detail: "Nego sepakat dari Rp4.750.000",
    action: "Kirim Sekarang",
  },
  {
    id: "fujifilm-xt20",
    name: "Fujifilm X-T20 Body Only Silver",
    category: "Kamera & Optik",
    passport: "PASSPORT-FJI-1042",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-FEd-Xb9cnMacVJgdz-L6DhZ7scD_BBGPQDUa7qbUPhjK0yMDhUYd5FAbkIb5Juphh96EnZ2LeJNFHVwEJ_zajlC82BWcw0WZD65xoEfkvAr-cv3Gn0uCzVZcq9cg_kZ2jF3WDQzXomlqZ6_JShI_o47VpsNPlHAu1Bri2miEu6sEBPwCqKzNLJ5hcNc-mre9cmfqk7g2de74ZSEsd330sgLkqndqbsD7Vgi9gmFKb_gqaKbcu6Ej",
    price: 5800000,
    score: 85,
    scoreLabel: "Baik",
    route: "Jual / Terbuka Swap",
    status: "Aktif Tayang",
    state: "active",
    detail: "12 tawaran masuk",
    action: "Tinjau Tawaran",
  },
  {
    id: "sony-fe50",
    name: "Lens Sony FE 50mm f/1.8 OSS",
    category: "Kamera & Lensa",
    passport: "PASSPORT-LNS-3310",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB5_6-KNAewtOI4ffSe4H61wCuN-TcQNB-991SUMEJr2WfwtBmApLLgEkPfaxvRNUjIblXQBumTmVMmm9GyapAr-4RSjFOrO2aEcVURsdvfZ_JxtR16v-0yGJOZBHUvr3oVZkv5e-9vjjq0be-LLk_yEpApiQHqikUGkZy5dC4FhwmhSJg6hUqy7v7tDDbuxQklMC4odU7MENtCZ-c-OORgLZHdrRNNyfLvdCIj4VcK6BxoJysKrTI",
    price: 2200000,
    score: 94,
    scoreLabel: "Mulus",
    route: "Jual Cepat",
    status: "Aktif Tayang",
    state: "active",
    detail: "Bebas jamur, AF responsif",
    action: "Promosikan",
  },
  {
    id: "keychron-k2",
    name: "Keychron K2 V2 Hot-swap Gateron Brown",
    category: "Aksesori Kerja",
    passport: "PASSPORT-KYC-0081",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDqv-zX8_RYMVnmp9Qlt4C7tzN_8dWIyZeSMq0B_dXHJFP9l7HV5mumj7vr2IxMobR4eqwMiBKOChRg-HZ0VanbLrUxDznNfYXlwhtt57eMiSKaAn6Xy6XYMljuTi5u-rDM52I13yo7msBv1_YWF6W3tK_q9hnVgzHaWX7lj8FJrl2e9vN-wyO_f-Zh8RKXNeKcKaAuUNsP073IZLYWZ8MODvouMw2Fvw1uygw6VtdDbz37v7y3o6dY",
    price: 950000,
    score: 90,
    scoreLabel: "Sangat Baik",
    route: "Re-Circulated",
    status: "Selesai & Bintang 5",
    state: "completed",
    detail: "Dana cair ke saldo",
    action: "Paspor Sirkular",
  },
  {
    id: "dell-u2419",
    name: "Dell UltraSharp U2419H 24 inci IPS",
    category: "Display & Monitor",
    passport: "PASSPORT-DEL-5519",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjtM_LdakzkuFx0KossnyUJ6eYyxH8RkXwvTB87qaWBpyAwHgIsc_xTulWok0MdGuCYcwTiSA9znyrKGaU6B8JFEUCNoMuOQBE19bFW8d3KG7Z4aWXepmO2EYXXFnrJV5popgZOT6N64DcQZsW1DDR5rqSICwtJvcbv64rRjsGJvqgLagskTSKw-fFXLvmYx6OL6Pzo3RF_WCn7tBlQkzZkjrrWzSDexKJ9N2CwUH1mXGvEGgmjNft",
    price: 2150000,
    score: 82,
    scoreLabel: "Baik",
    route: "Life Extended",
    status: "Tersalurkan",
    state: "completed",
    detail: "Zero dead-pixel, IPS normal",
    action: "Bukti Serah",
  },
  {
    id: "ath-m50x",
    name: "Audio-Technica ATH-M50x Monitor",
    category: "Audio Headphone",
    passport: "DRAFT-AI-8809",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQiU1g20BTitv2d7Ahb15udqqCj1F-22lAhmgKFLb5rQgbybAblBGCx_ICKHNRRSOQuAUsevvwZ2j5jdpT_UbicvUtijg41O5_vZCdWJR5o2qR4XLI5cMTwtLGu6h7W2mf1ehOaAs3zTg2JrWOc9T2VjBCNvGf82twl7_LWw6b6hiDzqsTNFrf8AE2RdqVPKjwq1IHUtvwQIR9ZLZcgy5vxr4E8Um10_sSid6-I_dxppVEML65hy8G",
    price: 1400000,
    score: 75,
    scoreLabel: "Audit 75%",
    route: "Menunggu Draf",
    status: "Draf Belum Tayang",
    state: "draft",
    detail: "Perlu foto detail earpad",
    action: "Lanjutkan Draf",
  },
  {
    id: "ipad-air4",
    name: "iPad Air 4 64GB Space Grey",
    category: "Gadget & Tablet",
    passport: "PASSPORT-APD-8812",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOizBrpa4cn5EDQjNZJETU7B8DYuROku7quAsuM7fjeQV0xp71ulNLEVpv3jINfYijvyVmkendPnFu63ZxyDUQVsjIoTOnNig6_USLDaxk5RCpTMmJYU5rSh0ZwHEx3dDv1d6-1t0KOREznEON1q7Ptws4SLuZ-0BPrGU0dIIOSqtw1-_UXF47Vb3maerWVjGagtQgaUNKSN9-NkHT2WEdNhMVN6TputEPdkMfjLzApSDPaakTYqAS",
    price: 3800000,
    score: 55,
    scoreLabel: "Perlu Part",
    route: "Reparasi / Sparepart",
    status: "Siap Direstorasi",
    state: "repair",
    detail: "Mesin dan baterai normal",
    action: "Hubungkan Mitra",
  },
];
