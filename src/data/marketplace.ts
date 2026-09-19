export type CircularPath = "sell" | "swap" | "donate" | "repair";

export type MarketplaceProduct = {
  id: string;
  title: string;
  image: string;
  paths: CircularPath[];
  pathLabel: string;
  score: number;
  condition: string;
  note: string;
  price: number;
  location: string;
  rating: number;
  reviews: number;
};

export const products: MarketplaceProduct[] = [
  {
    id: "sony-a6000",
    title: "Sony Alpha A6000 Kit 16-50mm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-1E2TMyUct92VBXeE4N60LJsiscZRfQR-wqolMN7daf3GDfSd-s5ac3uREb55vUNzow3it-mM4nu4-XjLtCPjwXusp_Msu5Zw-9BbEK7OJif3mSXoKzzAW3TXYhuSi_HxiwASSkBpwaV8MyW_V8l8dn7C5S5C214xKctEsf4nGc-nL4_IrlFknmZRXhjDDms8Syo0y4LAW6uImLaTU4r8kB-YMhg_TmU6znzd1avpJ39Xq6gktI9l",
    paths: ["sell"],
    pathLabel: "Jual",
    score: 88,
    condition: "Sangat Baik",
    note: "Shutter: 4.2k",
    price: 4750000,
    location: "Jakarta Selatan",
    rating: 4.9,
    reviews: 48,
  },
  {
    id: "chair",
    title: "Kursi Kerja Ergonomis Mesh Pira",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiflSOviRiDmLswTw_NuCdaooXHteEyfdNh-bg7apdfTPoqOa0QC7p2SPih8R7Poijf_TYPlhp4dFSCmbwzLQ27lPA2piTQJzCguopC7wyQQNB62eLcIx2HRu1l0DbG8tTQaHP62MiIyyL3kNlXTEzr7SDvhqR2lXCFBnSAv-_cYwYKt1TF1-f8ydIydhEw-SfojDMamqqXggZWfzAlovOn4ccHgbrDTH1IvvLjzcvBP__ztFhJdIG",
    paths: ["sell"],
    pathLabel: "Jual",
    score: 74,
    condition: "Baik",
    note: "Hydraulic OK",
    price: 650000,
    location: "Bandung Barat",
    rating: 4.8,
    reviews: 19,
  },
  {
    id: "bike",
    title: "Sepeda Lipat Polygon Urbano 3",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCoJfDWCCkyXwksr0n8woHIW-uywpPTNAut4tr1TSpyvrpxuqbj8JPRryW1gNKXj7Pc2gBfw6jyovpuI9fI2mGe8qcugC5puNAPVdDoimWbS4bgCDZp0xegenvlbu4Y5iiSd_KysrQReWhfplDdqNF70LHVkBkkMGEkE524pDo07wA278MlQSnhV7a-eGN8zvq37UGScgluE1SgNlzkDU-oFDRZ-yT5mnMN4tQwaaH80p-YUJDnyQUS",
    paths: ["swap", "sell"],
    pathLabel: "Tukar / Beli",
    score: 62,
    condition: "Cukup",
    note: "Lecet pemakaian",
    price: 2100000,
    location: "Surabaya Timur",
    rating: 5,
    reviews: 31,
  },
  {
    id: "monitor",
    title: "Monitor Dell UltraSharp 24 U2419H",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPaGekpoqjLOiJdGaar2umueNFkiZPfz4nPvIaw2LGwFm_pUv7pldZOaykomeCcdqPIk7TJl9xjhK8IDr4jPQkvHIh-hHcKDOpiySMVm75iN8iJ3rq81533tWAeXVx5qrcHY-iEohUchFghIsIGlkuB15dIQS5mgB6oI8uj2xEDejjfVr7kAdv2xo6Qsn2Nhbqg_Oi14wiXJMrbKIRDnEC5ttCy0v4csLSmkG1fcUvrMdKzmFOPON-",
    paths: ["sell"],
    pathLabel: "Jual",
    score: 92,
    condition: "Sangat Baik",
    note: "No dead pixel",
    price: 1850000,
    location: "Tangerang",
    rating: 4.9,
    reviews: 64,
  },
  {
    id: "coffee",
    title: "Mesin Kopi Espresso DeLonghi Dedica",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCE7MvyECQWLfoAXz6PP_TrKx2lBlmdjcgp9lj9QwREoAsFen1-XMVc_rYpdVHrkDRnph2ArjZEMZhVqJ1l-3E-5UYPQPkmFSjtM_cCj80kc4C4ztudgDUi7zAOwCcasEtj8AStLOc-j-Xi0IYiaFJLZxOOml_yOoM2kD2je2IeoQX9HyNrDtzP4ku1yl8ADlx9o6a6JI8Fhe6u-zDrVmoczihY9mOZUpmkrIM264HaXH099SBXwEI",
    paths: ["sell"],
    pathLabel: "Jual",
    score: 70,
    condition: "Baik",
    note: "Descaled baru",
    price: 1400000,
    location: "Jakarta Pusat",
    rating: 4.7,
    reviews: 22,
  },
  {
    id: "guitar",
    title: "Gitar Akustik Yamaha F310",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBusT_q9svTtPB3cW7lDKrHPfpjER7dLVPQS1-du4itnNXhIG2rBBYbToZLaZGcg-RvExHioobGHmmhoLzKe4O_hd3UxTsFLbBFp4H3WmgZofNcMiPz2mQ91xoZ2A2GIO49Rh00AbETVIDqDKjqPdSPPyYdwQ7_RuyCH1maOTolB0DYEXHE3vY8q0HfW8SuF_quTTT3rbC8o_bV17eMBfPFN8Gsbli0Ow3NoFwnc07ZR_xumgDggzrP",
    paths: ["swap"],
    pathLabel: "Tukar",
    score: 58,
    condition: "Cukup",
    note: "Action rendah",
    price: 750000,
    location: "Sleman, Yogyakarta",
    rating: 4.9,
    reviews: 12,
  },
  {
    id: "desk",
    title: "Meja Belajar Kayu Solid Jati Belanda",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-2ALztam23cBQ7HutV9HDGKWs6MABUaIcdiItKqhClsJ-XLLt9WFs4wLT2aqcAlr92JvKtARhykvYT_rEcZ4tqfBbyDBuIcKtuNrpJCpnW7oHE5L09npdc5KneXYg5bfEhqi2gO9osCo1zuIEk6C2anHP0lPMyp4YODwwe7e4Sw9_cNnrxntDrxPgbLENx6n9WA-MO-lEIKSf5MXsAdy97RN60tAC50fD6yvJ_ZVBPeNYYJTh1gHj",
    paths: ["donate"],
    pathLabel: "Donasi",
    score: 66,
    condition: "Baik",
    note: "Bebas biaya",
    price: 0,
    location: "Depok",
    rating: 5,
    reviews: 8,
  },
  {
    id: "pixel",
    title: "Google Pixel 4a (Layar Retak Halus)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6cC-RCYGeUJ7rLjXgscevFce31zla5YYPR3iJk_HMpLBj8_3Nrt62CujjquCCNtIJW8_YhK0zinvg4rnDSpnetaSHJgcdvN9yLEreeCySBK_y2WnFBFtHWunnXAGv57nV1ei0xs066CqkeeuqibnIhBfCl3o_krHN-zmcaJmPnBWQWOb8QtVmU24wCi0Oz7gW16AZ2BbrJc8JuUa4mhjXt9ux2hYjLR6_WnyY7e4WtcPcv6tbil01",
    paths: ["repair"],
    pathLabel: "Repair / Parts",
    score: 42,
    condition: "Perlu Servis",
    note: "Mesin 100% OK",
    price: 890000,
    location: "Jakarta Barat",
    rating: 4.6,
    reviews: 37,
  },
];
