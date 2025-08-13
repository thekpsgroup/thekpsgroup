export type BrandKey = "kps" | "modern-pay" | "modern-ledger" | "modern-brands" | "modern-consulting" | "modern-stack";

export const BRANDS: Record<BrandKey, {
  name: string;
  domain: string;
  email: string;
  phone: string;
  colors: { primary: string; accent: string; text: string; bg: string };
}> = {
  "kps": {
    name: "The KPS Group",
    domain: "https://thekpsgroup.com",
    email: "sales@thekpsgroup.com",
    phone: "469-458-6966",
    colors: { primary: "#000000", accent: "#D4AF37", text: "#000000", bg: "#FFFFFF" }
  },
  "modern-pay": {
    name: "Modern Pay",
    domain: "https://modernpayroll.co",
    email: "sales@thekpsgroup.com",
    phone: "469-458-6966",
    colors: { primary: "#000000", accent: "#D4AF37", text: "#FFFFFF", bg: "#000000" }
  },
  "modern-ledger": {
    name: "Modern Ledger",
    domain: "https://modernledger.co",
    email: "sales@thekpsgroup.com",
    phone: "469-458-6966",
    colors: { primary: "#111111", accent: "#D4AF37", text: "#0A0A0A", bg: "#FFFFFF" }
  },
  "modern-brands": {
    name: "Modern Brands",
    domain: "https://modernbrands.co",
    email: "sales@thekpsgroup.com",
    phone: "469-458-6966",
    colors: { primary: "#0A0A0A", accent: "#D4AF37", text: "#0A0A0A", bg: "#FFFFFF" }
  },
  "modern-consulting": {
    name: "Modern Consulting",
    domain: "https://modernconsulting.co",
    email: "sales@thekpsgroup.com",
    phone: "469-458-6966",
    colors: { primary: "#0A0A0A", accent: "#D4AF37", text: "#0A0A0A", bg: "#FFFFFF" }
  },
  "modern-stack": {
    name: "Modern Stack",
    domain: "https://moderntechstack.co",
    email: "sales@thekpsgroup.com",
    phone: "469-458-6966",
    colors: { primary: "#0A0A0A", accent: "#D4AF37", text: "#0A0A0A", bg: "#FFFFFF" }
  }
};

export const ALLOWED_ORIGINS = Object.values(BRANDS).map(b => b.domain);

export function getBrand(key?: BrandKey) {
  const k = key ?? (import.meta.env.PUBLIC_BRAND_KEY as BrandKey) ?? "kps";
  return BRANDS[k];
}
