export type SellerProduct = {
  id: string;
  category: "camera" | "accessory";
  title: string;
  subtitle: string;
  image: string;
  path: string;
  score: number;
  condition: string;
  price: number;
  newPrice: number;
  inspection: string;
};

export const sellerProducts: SellerProduct[] = [
  {
    id: "sony-a6000",
    category: "camera",
    title: "Sony Alpha A6000 Kit 16-50mm",
    subtitle: "Mirrorless • Shutter Count 4.200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAr4tgEOesIxCcKrzq-svlFVcf4H1y1LMP-uVf-ZkLWL5wsTVhBtSb04nI2yTJ9p-5Wg4NvLOvqoWB0Zuxn7W4Kg6-3jArwQbi5s0AbYZn87kYYW58LLBgjTOtjNicY76RdrnKhSw1Jqq8_y8WfKRHbqaEHL5Ldqq175JrzhHV69qq4WNyXYWKI_DYlDAlWn0PqHy9FoI0lbefE7JiUYe7zI8B1MUJiU6MN8C0ocTfYYEUT2NcBJ_f0",
    path: "Jual Langsung",
    score: 88,
    condition: "Sensor Bersih • AF Normal",
    price: 4750000,
    newPrice: 7900000,
    inspection: "Cek Fisik 48 Jam",
  },
  {
    id: "sony-fe-50",
    category: "camera",
    title: "Sony FE 50mm f/1.8 OSS",
    subtitle: "Lensa E-Mount • Simpanan Drybox",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCoOVopkfousyk46UWU2XiFhEMjceVrO5RNkRTexLcKjmmvQ_Vgfw-FhE7fLXXiXoPqwg_CYYsz5mVv2afw16ih5RlyKL527mg47rrsWS4DNihmVS02wN0qdwIaPsfqgzunNv3asR57fh40eeKQJKXRMQzCA6OGJ0-YgRt5uUXV0QWnaSXwRepQnd08f23827kypQUdZ38JaIj-YXK60vpcO4-SySnrSB2tSPh5u9VNDMuFThI8YEXi",
    path: "Bisa Swap",
    score: 94,
    condition: "Optik Bebas Jamur / Kabut",
    price: 2200000,
    newPrice: 3500000,
    inspection: "Cek Fisik 48 Jam",
  },
  {
    id: "keychron-k2",
    category: "accessory",
    title: "Keychron K2 V2 Gateron Brown",
    subtitle: "Periferal • Fullset Box Ori",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBi3Wjfmk4ovTDCfv1V75V7th8zlzIDlLLo0Gdesk1qw_3gjrbggKxKtpLk-TfaqrNsNfpzXCZxCzTFWicwQDXHyFIQ24B-FrANFXt8eiGIDNONg6jljNL1prseXNZ0RGUUQ7QHkKcz3q4JEFQR_O1XMrOwIzAptl1HhCIko7pbiqPdDcM-p1tPeoTfsgAhkFpIDQZw_JGc8XomB9r9KqfSXJZK5LW1RHAHNZ4qWR2XPCrzwDzkk4yi",
    path: "Jual Langsung",
    score: 90,
    condition: "Switch Responsif • Baterai 92%",
    price: 950000,
    newPrice: 1400000,
    inspection: "Cek Fisik 48 Jam",
  },
  {
    id: "dell-u2419h",
    category: "accessory",
    title: "Dell UltraSharp U2419H 24 inci",
    subtitle: "Monitor IPS • Zero Dead Pixel",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDg_TJd5S7G0i96OHDsK6JL6I_Z5UCjDXCiz5zPb-__4wWGYqaCmsTDJuDPX-3B2n68p_BjLYxgSR3Oqtp45Dgm4vNA4Kg2Iz2cgWw4vSnArR-MHOgGZz6dSFTHBgc2j28M4azrxt-77nsc07aRV6t9rhaUYd8v4R62jsb-mjHXwIgv7Wg6rM5XqikBADJJZE1gBeBecVAkPRR_iampl90r79YER7dvyYQhZ-JErOPRVXL8rZSwkuIh",
    path: "Bisa Swap",
    score: 82,
    condition: "Panel IPS Akurat • Port Lengkap",
    price: 2150000,
    newPrice: 3800000,
    inspection: "Cek Fisik 48 Jam",
  },
];

export const userOrders = [
  {
    id: "ORDER-SIM-88219",
    title: "Sony Alpha A6000 Kit 16-50mm OSS",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9Te53OEtt2ih_UIu5S2qiD2rkh78USR_AwFhGFtr9mDantlNnrz0Mo3LRAdyy8LlOs_Wsw5vCsWGP5HxG87ExE7Qi-i2EkTSZ5kfT1ilsC1fuY4Z9fox2tMS-KSguPLPt7gSebHzLz9c6vXFjML-NxoKtDBybBKIQhFl173mIu2qMIdPtULRAo-bJFMUZqkvx0FeP8BTKlszrjVF7axVJzfPNo9iw8qoCWUfnyFDHqcXUXFv28Mm9",
    category: "Kamera & Optik",
    status: "Sedang Diproses Penjual & Hub Tebet",
    score: 91,
    price: 4500000,
    active: true,
    impact: "Escrow Rp4.500.000 terkunci aman",
  },
  {
    id: "ORDER-DELL-54018",
    title: "Monitor Dell UltraSharp U2419H 24 inci IPS",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFJSnzDw-8zyybjicp7q91LmJPQ39W1j294Pinr1LBBVqR44npZF1y5sDXvvAEvGrANRLLTYT7H5G3GV4NNRwHcD8P-M-pRoUZuF_4kaNBTyn3-N9aCMao49xFLEgfucuJQ0ZWDo-9baMDkjQISaCwoOVdgSAIMke8PtX5rpsWYz8Z3c2QJFe2FcPxFt1DlBPIJ7X-2Fx_xq-6oblGBT5aKh7vEzuZcGQ0EbQEFE8XfWnCXeBrZD8u",
    category: "Komputasi",
    status: "Selesai & Lulus Uji 48 Jam",
    score: 94,
    price: 1850000,
    active: false,
    impact: "+18,2 kg CO2e dicegah",
  },
  {
    id: "ORDER-KEY-39201",
    title: "Keychron K2 V2 Hot-swap Gateron Brown",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxYdqJ3uWHB4kxyE4udbciUFB1RfHK3vu6vURo5OHkckQJ79H-0U1m__Yk-WZae-NENz3sRkcW3Gwcw6kwWDZIEvmoTuOW_qRN_js6ktcxhXepTMRjHtEH9ZgY8wBrUdYVx7xadfpTDt6dB4TrCWu0z3CJfoIICLPBjT0Cw2nRea2y4t3GGoGyN2_kub0693uitJmdzjR4eQ8C5KUyklaH0UCaPN4VDt4EMXNx-w28q-3Uu4Ianbmc",
    category: "Aksesoris Meja",
    status: "Selesai via Kurir Motor Listrik EV",
    score: 98,
    price: 890000,
    active: false,
    impact: "+25 poin sirkular",
  },
];
