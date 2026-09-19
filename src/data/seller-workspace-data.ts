export type InventoryStatus =
  "active" | "shipping" | "analysis" | "draft" | "completed";
export type InventoryItem = {
  id: string;
  name: string;
  image: string;
  category: string;
  route: string;
  score: number;
  condition: string;
  price: number;
  status: InventoryStatus;
  statusLabel: string;
  note: string;
};
export const inventoryItems: InventoryItem[] = [
  {
    id: "sony-wh",
    name: "Sony WH-1000XM4",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6QvpEVE07FkmLuQbfH95ii4T0ymj_I6CDCTmAO0_qwvSquXktJAaxQb2yOOFXsRu0buq64CmnegG5lMXnS_wlqBVLdJOhI1mmzlzmSd2SSJ2Ts5ps3JCK1OuWJqljsvCv5v5IC4M4lDgATHzsmjOQzw2spt6t6aJVuIAl0n_9M43za9cEXoNf_v52OwjGZYxv2a1NDGA9VGXJqxPyvDZTbslr726S_FwOT_2dvBCUs2hBGBMsOyRv",
    category: "Elektronik",
    route: "Jual",
    score: 85,
    condition: "Baik",
    price: 2400000,
    status: "active",
    statusLabel: "Aktif",
    note: "Digital Passport: Verified",
  },
  {
    id: "watch-se",
    name: "Apple Watch SE Gen 1",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBEoxHfrp8Uo1s-L0GZThL9uwfMve2sWlfH5tLtx7e_eD-sLWzKXMRAfXE6FJge5_lN9VV39bhB6M5ybrguAZ1tybFqs7hOoRSzdQq4vMLLdbJRUJZBFXWJ_8SMI7fcp7oZhjpCL4LnwIGOydIHb3fSZzjaQgRHGptuzbXwcPiNIryli3H3gRY1ilPqt20tecWqqifPmPvpuyhv8go7cBUhfPa3XZhGiUXayKbNaDYisb3bhMNds4Ch",
    category: "Gadget",
    route: "Jual",
    score: 78,
    condition: "Baik",
    price: 1650000,
    status: "shipping",
    statusLabel: "Menunggu Pengiriman",
    note: "Pembeli menunggu resi kirim",
  },
  {
    id: "lg-monitor",
    name: "Monitor LG 24MK600",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgLL3KArnOAg8G7-TA6gMgpptdCJsYo7q4YSvF8zoFe3O9gssf6J5nfldaXEJ5pnqYK9Yuyy29aEmKsO4QMPmsP4x1cAxJUtL6Zqx6-0aNuv9uW0Hl5ZKhby83QGb_QawpYlbTPLKwV3b2tqiPf36v_GQguYm2Wk47UTv7PnNHCClOHSj3gTqS9m3gj6wduN1wrvJYgszQbNBLmPiUtVKmuheOIMQ19h7xbrOxV6uS_w8UbD2sL7tR",
    category: "Elektronik",
    route: "Tukar",
    score: 68,
    condition: "Cukup",
    price: 950000,
    status: "analysis",
    statusLabel: "Sedang Dianalisis",
    note: "2 permintaan tukar tambah",
  },
  {
    id: "blender",
    name: "Blender Philips HR2115",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjUVc5v4QZ5Il03xCNGNQTWXAL2rSmOKjdHnS-5ElPEFsllNLjneiEelrTsE49L3zTRclzUKCH0hyDFFTrz2GScdWo1iGPqj0-ncEWV56nnDn8eXUg8KOyhSnBdPC86YqRravj5ghdXx-l14lIJDQ4jg4vrzncJZd7nVyUaNweNsPzM5H6ZgR3-KqSkvu8pllEwGSCAZSuypBYTpJ52q0hxonMRTw4PRVO6MyjfRv1umXkeTi_xByI",
    category: "Dapur",
    route: "Donasi",
    score: 64,
    condition: "Cukup",
    price: 0,
    status: "draft",
    statusLabel: "Draf",
    note: "Tujuan: Mitra Bank Sampah",
  },
  {
    id: "bmx",
    name: "Sepeda BMX Polygon",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBy3d4yVm-4WPowfPRButrM4vb7_3w6iuc8ziHc9yGjG0V_znzz9EGuvGg-hns34Rw-sgImjjqAOgulfREReuRL_dLmLmVuc9FqICP-NZzAMWraVR5xbvyhtKOaTTn3jx2NFjloRVL-ZlBJQGVy7XafWSm5v_Aj_qLlWeSbLberf9voxmO_fBSURnXegGTk5DNWITSLAgBAsQWfT1SvWDL2lCSz7_sq4xgDN4StcAngo_cRMD4LfOvK",
    category: "Hobi",
    route: "Jual",
    score: 80,
    condition: "Sangat Baik",
    price: 1100000,
    status: "completed",
    statusLabel: "Selesai",
    note: "Transaksi berhasil selesai",
  },
];
