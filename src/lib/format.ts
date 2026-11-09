/** Format BDT using lakh/crore, the way buyers actually read prices. */
export function formatBDT(n: number, locale: string): string {
  const nf = new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-US", {
    maximumFractionDigits: 2,
  });
  const lakh = locale === "bn" ? "লাখ" : "L";
  const crore = locale === "bn" ? "কোটি" : "Cr";
  if (n >= 1e7) return `৳${nf.format(+(n / 1e7).toFixed(2))} ${crore}`;
  if (n >= 1e5) return `৳${nf.format(+(n / 1e5).toFixed(2))} ${lakh}`;
  return `৳${nf.format(n)}`;
}

export const num = (n: number, locale: string) =>
  new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-US").format(n);

export const pick = (l: { en: string; bn: string }, locale: string) =>
  locale === "bn" ? l.bn : l.en;
