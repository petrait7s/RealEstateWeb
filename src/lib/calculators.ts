/** Pure calculator functions (unit-tested). */
export function emi(principal: number, annualRatePct: number, years: number): number {
  const n = years * 12;
  if (principal <= 0 || n <= 0) return 0;
  const r = annualRatePct / 12 / 100;
  if (r === 0) return principal / n;
  const f = Math.pow(1 + r, n);
  return (principal * r * f) / (f - 1);
}

export function emiBreakdown(principal: number, annualRatePct: number, years: number) {
  const monthly = emi(principal, annualRatePct, years);
  const total = monthly * years * 12;
  return { monthly, total, interest: total - principal };
}

export const pricePerSqft = (price: number, sqft: number) => (sqft > 0 ? price / sqft : 0);

/** 1 katha = 720 sq ft (Dhaka standard), 1 decimal (shotok) = 435.6 sq ft. */
export const SQFT_PER = { sqft: 1, katha: 720, decimal: 435.6 } as const;
export type AreaUnit = keyof typeof SQFT_PER;

export function convertArea(value: number, from: AreaUnit, to: AreaUnit): number {
  return (value * SQFT_PER[from]) / SQFT_PER[to];
}
