/** Brand architecture: masterbrand RATRA + six platforms (canvas V3-00), always "RATRA + one English word". */
export const PLATFORMS = {
  aero: {
    name: "Aero",
    domain: "SKY",
    descId: "Deteksi turbulensi",
    descEn: "Turbulence detection & forecasting",
  },
  disaster: {
    name: "Disaster",
    domain: "EARTH",
    descId: "Pemantauan & peringatan dini bencana",
    descEn: "Disaster monitoring & early warning",
  },
  urban: {
    name: "Urban",
    domain: "EARTH",
    descId: "Analisis kawasan hunian",
    descEn: "Residential site intelligence",
  },
  agri: {
    name: "Agri",
    domain: "EARTH",
    descId: "Pemantauan tanaman",
    descEn: "Paddy & palm-oil condition",
  },
  survey: {
    name: "Survey",
    domain: "FIELD",
    descId: "Pemetaan & survei",
    descEn: "Mapping & surveyor services",
  },
  peat: {
    name: "Peatland",
    domain: "EARTH",
    descId: "Gambut & muka air tanah",
    descEn: "Peat & water table",
  },
} as const;

export type Platform = keyof typeof PLATFORMS;

/** Ops consoles start dark; others follow the OS. */
export const DARK_FIRST: readonly Platform[] = ["aero", "disaster"];
