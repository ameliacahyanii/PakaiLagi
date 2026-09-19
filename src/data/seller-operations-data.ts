export type SellerOrderStatus =
  "processing" | "shipping" | "testing" | "completed";
export type SellerOrder = {
  id: string;
  createdAt: string;
  product: string;
  image: string;
  passport: string;
  buyer: string;
  buyerScore: number;
  location: string;
  amount: number;
  status: SellerOrderStatus;
  statusLabel: string;
  logistics: string;
  sleeve: string;
  deadline?: string;
};

export const sellerOrders: SellerOrder[] = [
  {
    id: "ORDER-SIM-88219",
    createdAt: "19 Sep 2026, 14.35 WIB",
    product: "Sony Alpha A6000 Kit 16-50mm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ-vYFxJ-lSNoQWHsQETXkKdNY2HxMbre1EDRxN_20gD4jbwPddfTSoX_TLgU7QvtrFRZ4sGcUy6aJlBKNRYxxz10a4Eg4PvUtotEet5xX97887N0_BDrNEfrgFNGlIxyquEqSxXBBYgZeAPgSXlNuxWq00IF-vY4zQr0MnMR_9FEUr_vzvGUm1MsOLh66FCa6m1XOYQYRDpTi-u-fyJjWrhyYuV7SRPWUk2DwDrZ_YvG5Gx_3va8B",
    passport: "PASSPORT-SNY-9921",
    buyer: "Budi Santoso",
    buyerScore: 98,
    location: "Tebet Barat Daya, Jakarta Selatan",
    amount: 4500000,
    status: "processing",
    statusLabel: "Perlu Pengiriman",
    logistics: "Kurir Motor Listrik EV • Hub Tebet",
    sleeve: "SWAP-BAG-092",
    deadline: "18.00 WIB",
  },
  {
    id: "ORDER-SIM-88224",
    createdAt: "19 Sep 2026, 11.20 WIB",
    product: "Keychron K2 V2 Hot-swap Brown",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0tACBRBtUtyPDztHlsEAe4KT-XYYDv9E4W9kxjnbsM1Ys5qTzLOfV72x4oBVbh2isTKcMThuC154pIP507MpKtkFLeFqaXBGBIpAPxpoVBOm_OVVCf-XDgnsupv1hZfpwwzWWd02aSa5_fUjrTB31PDDJx8baN0qfKZvLORe5jHt4odbBjErutmElNZIfLsou18uJRvqz4aC4ZdPN4iPamkPBdvaGQ7T86nYrt7alzWyEb4YqxPCy",
    passport: "PASSPORT-KYC-0081",
    buyer: "Sarah Wijaya",
    buyerScore: 96,
    location: "Setiabudi, Jakarta Selatan",
    amount: 950000,
    status: "shipping",
    statusLabel: "Dalam Perjalanan EV",
    logistics: "Kurir EV #EV-JKT-102 • Tiba 17.15 WIB",
    sleeve: "SWAP-BAG-044",
  },
  {
    id: "ORDER-SIM-88190",
    createdAt: "18 Sep 2026, 16.45 WIB",
    product: "Dell UltraSharp U2419H 24 inci IPS",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAy2LY9-bbHvXsu6q8CLhz2HN62zlWsI2joxG1pgmnR_6mlkS5hpdZilVb_w1FAAfXQJCjahlzZhbHza1186l9WII-A2GhOour7dD3Jpt9DEMJMjvAHEO5Z7N_hbULlLa_tcplO0Y6J6uv5JEonHeZrujGgC9eyaH6LmpofgL0jagWkv-ojkfrA-CAKopI08Vkj2RgpDO08V0MYmahwmoZNC6Rg9oQTCPZZ7e8m3xYTQfCEwZMDiREl",
    passport: "PASSPORT-DEL-5519",
    buyer: "Dimas Pratama",
    buyerScore: 94,
    location: "Kemang Pratama",
    amount: 2150000,
    status: "testing",
    statusLabel: "Uji Mandiri 48 Jam",
    logistics: "Diterima tanpa komplain • Sisa 18 jam",
    sleeve: "Sleeve telah dikembalikan",
  },
];

export const swapProposals = [
  {
    id: "SWAP-REQ-901",
    type: "Tukar Tambah + Top-Up",
    deadline: "18 jam tersisa",
    own: {
      name: "Fujifilm X-T20 Body Only Silver",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBmx3VkgoumLPBqYeF-3yqpoOkOTItMf3kgAKqNc_Trj990SSdfgYSg5VVIgD1j4EW7tDH1stD_zNBMpU-izHqB5thrylrzWDfzpdEp9UV9V22viMT6aXRZr6CPKbv1TF9IWuhSyil0eWpF0U9BWsU3CHrUzKqC1cb9-araUdvPhnI0pna0sbLwHDAd42siV14KgMtP6-juhCurxv2anFJJjr5MQTtemmFbJJhX9j84izJRYLoxHDvP",
      score: 85,
      value: 5800000,
      passport: "PASSPORT-FJI-1042",
    },
    offered: {
      name: "Sony FE 24-70mm f/4 Zeiss OSS",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAl1JdZtOadet5aV8-eUfFYBMKEJrSnLZXdn5rokJ-ZMDD0dU0wRsQZjn7PkLQ-ln8zI3dY_Ni-9ZRLMEqDGYSSrz8GzcvZwLcTagIqwb4KE2RxRw5hV6IkNaHd98GvS-5kbuYsvfMCFRfWDLeJOXIspIWE1m-vQllnRBz0Hxt8kFm3YkmlghqzXJVAibaQ49tAo6I56PYUxMGfSfn0JkInsTRSYp4CccdIMhrXBYiaQxOnR24Nu_Br",
      score: 89,
      value: 5200000,
      passport: "PASSPORT-ZSS-3312",
    },
    topUp: 600000,
    match: 94,
  },
  {
    id: "SWAP-REQ-887",
    type: "Barter Langsung 1:1",
    deadline: "Menunggu jadwal Hub Manggarai",
    own: {
      name: "Keychron K2 V2 Hot-swap",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPYEmUMrZXOkE3B9Fxd1Yftoc_Nmxv_JPraNHD6vXPWaxsJXJGm2rovsmvUv1_7z-FezKSszjsdyJAysqaw7lMJ7pSgeYLMZq2Ywp_oBuskZ1fpOwPn2ub314FQVrZt4TPIfSRQYNO3YlyLylbeFB7lynvTd70-DWezaRvjqr-0ofOf61T-7ZywvRyqWvrdahMPJRQ9-gNW0Xvk4tjDCAOd67HdYIifPnmBZCCQBoXn5lDGj443cZ2",
      score: 88,
      value: 950000,
      passport: "PASSPORT-KYC-0081",
    },
    offered: {
      name: "Logitech MX Master 3S Graphite",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDEwMH5mXIyiZvl0KUPOYofH-DngoVtOknnkPFQLOgjBvvFc4rDsOiJQlqu0cHOJZywnUTJ2crOpoqoeH_C6ZBrE1vUPjGxXwyMmyntmBr3jSLmgR43GUrze6QHXQ0pbpI6it3jbd3EgyGKSwDFe-Wc7bLd_PM4DHTPzLkNzBucU_bMvvplFJtjfRSeNmgfsTjMveN1R5XieTuBh-94SCjPFLNjvXNihopEFohm0Q4ZwVfEAtCKzuLD",
      score: 91,
      value: 1050000,
      passport: "PASSPORT-MXM-3002",
    },
    topUp: 0,
    match: 96,
  },
];

export const repairQueue = [
  {
    id: "REP-UNIT-4410",
    name: "Audio-Technica ATH-M50x",
    issue: "Ganti earpad dan kalibrasi kabel 3,5mm",
    status: "Suku Cadang Dikirim",
    cost: 65000,
    uplift: 300000,
    partner: "AudioCraft Circular Lab Jakarta",
    eta: "2 hari",
  },
  {
    id: "REP-UNIT-5128",
    name: "iPad Air 4th Gen 64GB",
    issue: "Penggantian kaca depan tanpa mengganti LCD",
    status: "Teknisi Mulai Pengerjaan",
    cost: 480000,
    uplift: 460000,
    partner: "iRestore Circular Service Hub Bandung",
    eta: "Hari ini",
  },
];
