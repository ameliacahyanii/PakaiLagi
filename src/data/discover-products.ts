export type DiscoverPath = "sell" | "swap" | "repair" | "parts";
export type DiscoverCategory =
  "camera" | "computer" | "audio" | "peripheral" | "component";

export type DiscoverProduct = {
  id: string;
  title: string;
  image: string;
  path: DiscoverPath;
  pathLabel: string;
  category: DiscoverCategory;
  score: number;
  condition: string;
  detail: string;
  price: number;
  carbonKg: number;
  logistics: string;
  actionLabel: string;
};

export const discoverProducts: DiscoverProduct[] = [
  {
    id: "sony-a6000",
    title: "Sony Alpha A6000 Kit 16-50mm OSS Sensor Bersih",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMemmrva7v83W_PWn9UPfubaJYjElnl8nRiEElN_nT4TtJ8nX5i_tXw8n60SMj-pejY45p0jD0VI5D3cMnVeYU_WM3aGB2lhT8DF5hPSRXSkk2Dbrc9sFN00HW5DtD7za9GCTex4Rrw3wg8jzO4N3gu-0hSvxo4ErSM6El6HR3fKwdbzKiNsKZiYjlC8mfv8oV2iek3hmnnJFA_CU9P3isZLE_d3svTdThZ7yT_kjS_tHdSBSsl44t",
    path: "sell",
    pathLabel: "Jual Langsung",
    category: "camera",
    score: 88,
    condition: "Sangat Baik",
    detail: "Shutter 4.1k",
    price: 4750000,
    carbonKg: 18.4,
    logistics: "Hub Blok M (1,2 km)",
    actionLabel: "Cek Audit AI",
  },
  {
    id: "fujifilm-xt20",
    title: "Fujifilm X-T20 Body Only Silver Classic Chrome",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSvK5s-3jmUWlyQ5OJiplGSbIwgJj62HuqW3bU-kt_F6U5rHRUbgZ_pcxFdCmpETGkMe-OiQBy-Q9aGTX23kNX6TXZQMsVigPFplR67MUAe_O6YRgIe9Uxxbi53AqfJx0XH5VFUPc_hL3RQlKEt7GV9G0CF5euUqkbKkK7Kz_FdBHDu_-w7R8By__qJuOD5_DpjY6hM7cAb9Q3WwEdSGFv-7UiBBy6G0PWIH66GHxwiktHyrf910yK",
    path: "swap",
    pathLabel: "Tukar Tambah",
    category: "camera",
    score: 94,
    condition: "Mulus",
    detail: "Garansi 60 hari",
    price: 6850000,
    carbonKg: 24.1,
    logistics: "Locker Dukuh Atas",
    actionLabel: "Ajukan Barter",
  },
  {
    id: "ath-m50x",
    title: "Audio-Technica ATH-M50x Monitor Headphone + Kabel",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCte-l9Bcf7TdIJbwwA_ja10-uaih1EkboJ33W6iX4_D44FpGFVR07tVJcS8_CAXA_4Dt_jUh2ZJvD72nU53VV1nk5LxFD6bymu-B5fOqKYsikKh9h_5qW5-Ff38_JhfMBZ6jcMo3qiK9wxWd4GaKG7gwSNTT9mYi5iz_RyJs3zd3UvhG-vCOufGMR5px_hRHWckKl5_QFi6I8BC1ErDsmfc-NT1wNmtzKtBTcaxW49BGdkZy3556cD",
    path: "sell",
    pathLabel: "Jual Langsung",
    category: "audio",
    score: 82,
    condition: "Sangat Baik",
    detail: "Earpad recycled baru",
    price: 1350000,
    carbonKg: 8.2,
    logistics: "Hub Senopati (2,8 km)",
    actionLabel: "Cek Audit AI",
  },
  {
    id: "keychron-k2",
    title: "Keychron K2 V2 Wireless Bluetooth Gateron Brown",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCeu1qhHYex8COW6moNVeGI56wVE3Qbddy4w1uicIaYDz7cwkEi7fQl3sdiTluGAFzTyQhVnGbhsXtlfilAD3l0Itv6mKh1-RLxEn5Z0fy2oOhO9Gr6S-zI-H6p483zboeh2uKiD4hCovsRfpCO_a3_2cF6ukQjsNvieqp1Qk6nuiIBYPEyW_CmGc8ku4lf7x10sthsQCOCdw4yJGPqCaAC0N961srJ81pr5_HqBRvuvVnze_CDVa_B",
    path: "repair",
    pathLabel: "Perlu Servis",
    category: "peripheral",
    score: 58,
    condition: "Ganti Switch",
    detail: "Key D chattering",
    price: 620000,
    carbonKg: 4.9,
    logistics: "Kit solder tersedia",
    actionLabel: "Diagnosa Servis",
  },
  {
    id: "thinkpad-t480s",
    title: "Lenovo ThinkPad T480s Slim Ultrabook Magnesium",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLHwuE-YXZBoTx9CfsYmH_MUwzqtjQ9zvryqRDL9hIHHmH6XGs5F-Niz0cI4xUH8Xzh1YQ0z6KDVMfdGpcR80idE74rt_QyNnoUSD-VCFWVc8fUW55_2bbf7XIV8hjQBCrsRkqkCBPU-j81gIhPCIBMPO2lhDPHtjYXABQsiPFeUcdyjUdpfwoIExjmHbhVG8LBxV2zMb2SU4854_pzVOztHuvnjIenm-ZFe_VC-_MfkTrXjteK9F9",
    path: "sell",
    pathLabel: "Jual Langsung",
    category: "computer",
    score: 86,
    condition: "Sangat Baik",
    detail: "i5 / 16GB / 512GB",
    price: 4900000,
    carbonKg: 142,
    logistics: "Baterai 89% health",
    actionLabel: "Cek Audit AI",
  },
  {
    id: "ipad-air-4",
    title: "Apple iPad Air Gen 4 Liquid Retina Fullset",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCc9YPooGzC-b8GSbhboD_G6WYaPbfaHdhPl0-9Jp1tEaHVu-SSORMhKaw1MbxB4xqc63AZ-q72fWR1SloaAgeN0yfZOXx_RHPMgjZQPDNG98NNqM0zPxMwA4GcL14k_jQ8DTJZtUNLsGeTh72KWEHNW4fPCWZGRYKWPhrc-2LfiZG9-XEVeM6gYg1qrFr3FlY0KX__UkKGDpDBn3_T3Nh4UPC1jfdfXGEXv12nMuO_rsSaITtDKIOx",
    path: "swap",
    pathLabel: "Tukar Tambah",
    category: "computer",
    score: 91,
    condition: "Sangat Baik",
    detail: "64GB Wi-Fi Green",
    price: 6450000,
    carbonKg: 32.7,
    logistics: "Hub Kuningan (3,5 km)",
    actionLabel: "Ajukan Barter",
  },
  {
    id: "dell-u2419h",
    title: "Dell UltraSharp U2419H 99% sRGB Calibrated",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuABFtQWY3555MuSXqzHBiSbsmbcSuMAUdoTPn2iTiP0aPr88dKZuKThF-6Su-jV_w65qhTn1PP_Gx2UEWHSI7N-2m_qroJLLCuO7r60m_35UZX4JSvx6k4U4LOpCCDfuAQ-6iTT2ePN3rTfWKXKXcAnB6oj7ZOhMFerReBS1NFzlU2Th4MsAlf9MUD3mndJMfMCrm9OtvOyvCmvP-akigsdyHJgPooFm5Q77SoiitABccgCK5i7fFoP",
    path: "sell",
    pathLabel: "Jual Langsung",
    category: "computer",
    score: 89,
    condition: "Sangat Baik",
    detail: "Zero dead pixel",
    price: 2150000,
    carbonKg: 58.5,
    logistics: "Box proteksi reusable",
    actionLabel: "Cek Audit AI",
  },
  {
    id: "sony-fe-50",
    title: "Sony FE 50mm f/1.8 E-Mount Fullframe Lens",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAloQMovp__hCdt7iAjYyYHiqlhViD47X-L33Vkklxt-2gwXxtpSnj1cB_FP3osvqHKu8V0U5V711gZ6bSdTxtfZJRlE0-R6mBHzR-Paghg1FxtBW0o4dbgTJGHNtX-PmxiL-alaAUayK6Ocfm-gUBiPuJMlX_QV-jc-ru1qc9He-cWwaT2ce7LkuwFXyXnMJQbC_LYs6byMTmVoP84XsmYBY0ug8v2CQDVVAzXfvUtymgLi4_e5-kV",
    path: "sell",
    pathLabel: "Jual Langsung",
    category: "camera",
    score: 93,
    condition: "Optik Prima",
    detail: "Bebas jamur 100%",
    price: 2400000,
    carbonKg: 6.8,
    logistics: "Hub Tebet (4,1 km)",
    actionLabel: "Cek Audit AI",
  },
];
