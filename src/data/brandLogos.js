// Brand Logos Data
// Used in the trusted-by brand logo strip on the homepage.

export const BRANDS = [
  { id: 'mahindra',   name: 'Mahindra',   file: '/brands/mahindra.svg',   height: 34 },
  { id: 'gmr',        name: 'GMR',        file: '/brands/gmr.svg',        height: 30 },
  { id: 'philips',    name: 'Philips',    file: '/brands/philips.svg',    height: 32 },
  { id: 'wobble',     name: 'Wobble',     file: '/brands/wobble.svg',     height: 30 },
  { id: 'tresemme',   name: 'TRESemmé',   file: '/brands/tresemme.svg',   height: 28 },
  { id: 'tv9',        name: 'TV9',        file: '/brands/tv9.svg',        height: 32 },
  { id: 'zarva',      name: 'Zarva',      file: '/brands/zarva.svg',      height: 28 },
  { id: 'shinexpro',  name: 'ShineXpro',  file: '/brands/shinexpro.svg',  height: 30 },
  { id: 'nivea',      name: 'Nivea',      file: '/brands/nivea.svg',      height: 30 },
];

// Legacy exports kept for backwards compatibility if referenced elsewhere
export const BRAND_LOGOS_ROW_ONE = BRANDS.slice(0, 5);
export const BRAND_LOGOS_ROW_TWO = BRANDS.slice(5, 9);
