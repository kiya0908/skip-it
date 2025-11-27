export const ADSENSE_TOP_SLOT = process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT || "";
export const ADSENSE_BOTTOM_SLOT =
  process.env.NEXT_PUBLIC_ADSENSE_BOTTOM_SLOT || "";

export const hasAdSlot = (slot?: string) => Boolean(slot?.trim());

