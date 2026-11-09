/**
 * Default branding. In Phase 2+ these are overridden by the `site_settings`
 * table so the site is white-label ready. Never hard-code the name elsewhere.
 */
export const siteDefaults = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Aurelia Developments",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "8801700000000",
  phone: "+880 1700-000000",
  email: "hello@example.com",
  address: "Gulshan Avenue, Dhaka 1212, Bangladesh",
} as const;

export type SiteSettings = typeof siteDefaults;
