import type { FuelConfig, FuelType, GasStation } from '../types';

export const FUEL_CONFIG: Record<FuelType, FuelConfig> = {
  gasolina_comum: {
    id: 'gasolina_comum',
    label: 'Gasolina Comum',
    color: '#0369a1',
    dotColor: '#ed5705',
  },
  gasolina_aditivada: {
    id: 'gasolina_aditivada',
    label: 'Gasolina Aditivada',
    color: '#db2777',
    dotColor: '#5250f3',
  },
  etanol: {
    id: 'etanol',
    label: 'Etanol',
    color: '#16a34a',
    dotColor: '#47fc74',
  },
  diesel_s10: {
    id: 'diesel_s10',
    label: 'Diesel S-10',
    color: '#d97706',
    dotColor: '#d97706',
  },
  diesel_comum: {
    id: 'diesel_comum',
    label: 'Diesel Comum',
    color: '#7c3aed',
    dotColor: '#7c3aed',
  },
};

export const FUEL_TYPES = Object.keys(FUEL_CONFIG) as FuelType[];

function makeHistory(basePrice: number, trend: number) {
  const months = ['jan/2026', 'fev/2026', 'mar/2026', 'abr/2026', 'mai/2026', 'jun/2026'];
  return months.map((date, i) => ({
    date,
    price: +(basePrice + trend * i + (Math.random() - 0.5) * 0.3).toFixed(2),
  }));
}

export const DAILY_DATES = ['02/01', '06/01', '07/01', '15/01', '21/01', '22/01', '23/01', '27/01', '28/01', '05/02'];

function makeDailyHistory(basePrice: number, trend: number) {
  return DAILY_DATES.map((date, i) => ({
    date,
    price: +(basePrice + trend * i + (Math.random() - 0.5) * 0.15).toFixed(2),
  }));
}

const s1 = {
  etanol: {
    lastPrice: 5.69, lastCollection: '20/04/2026', minPrice: 4.45, maxPrice: 5.69,
    variationPercent: 16.26, variationAmount: 0.77,
    history: makeHistory(4.89, 0.15), dailyHistory: makeDailyHistory(4.89, 0.15),
  },
  gasolina_aditivada: {
    lastPrice: 6.99, lastCollection: '20/04/2026', minPrice: 6.49, maxPrice: 6.99,
    variationPercent: 3.08, variationAmount: 0.20,
    history: makeHistory(6.79, 0.04), dailyHistory: makeDailyHistory(6.79, 0.04),
  },
  gasolina_comum: {
    lastPrice: 6.79, lastCollection: '20/04/2026', minPrice: 6.29, maxPrice: 6.84,
    variationPercent: 5.40, variationAmount: 0.35,
    history: makeHistory(6.49, 0.06), dailyHistory: makeDailyHistory(6.49, 0.06),
  },
};

const s2 = {
  gasolina_comum: {
    lastPrice: 6.59, lastCollection: '20/04/2026', minPrice: 6.19, maxPrice: 6.69,
    variationPercent: 4.10, variationAmount: 0.26,
    history: makeHistory(6.39, 0.04), dailyHistory: makeDailyHistory(6.39, 0.04),
  },
  etanol: {
    lastPrice: 5.29, lastCollection: '20/04/2026', minPrice: 4.35, maxPrice: 5.39,
    variationPercent: 12.80, variationAmount: 0.60,
    history: makeHistory(4.69, 0.12), dailyHistory: makeDailyHistory(4.69, 0.12),
  },
  diesel_s10: {
    lastPrice: 6.89, lastCollection: '20/04/2026', minPrice: 5.97, maxPrice: 7.09,
    variationPercent: 11.50, variationAmount: 0.71,
    history: makeHistory(6.39, 0.10), dailyHistory: makeDailyHistory(6.39, 0.10),
  },
};

const s3 = {
  gasolina_comum: {
    lastPrice: 6.74, lastCollection: '18/04/2026', minPrice: 6.29, maxPrice: 6.84,
    variationPercent: 4.98, variationAmount: 0.32,
    history: makeHistory(6.44, 0.06), dailyHistory: makeDailyHistory(6.44, 0.06),
  },
  gasolina_aditivada: {
    lastPrice: 6.89, lastCollection: '18/04/2026', minPrice: 6.49, maxPrice: 6.99,
    variationPercent: 2.68, variationAmount: 0.18,
    history: makeHistory(6.74, 0.03), dailyHistory: makeDailyHistory(6.74, 0.03),
  },
  diesel_comum: {
    lastPrice: 6.79, lastCollection: '18/04/2026', minPrice: 6.39, maxPrice: 6.99,
    variationPercent: 8.46, variationAmount: 0.53,
    history: makeHistory(6.39, 0.08), dailyHistory: makeDailyHistory(6.39, 0.08),
  },
};

const s4 = {
  etanol: {
    lastPrice: 5.49, lastCollection: '19/04/2026', minPrice: 4.45, maxPrice: 5.69,
    variationPercent: 15.00, variationAmount: 0.72,
    history: makeHistory(4.79, 0.14), dailyHistory: makeDailyHistory(4.79, 0.14),
  },
  gasolina_comum: {
    lastPrice: 6.69, lastCollection: '19/04/2026', minPrice: 6.29, maxPrice: 6.84,
    variationPercent: 3.56, variationAmount: 0.23,
    history: makeHistory(6.49, 0.04), dailyHistory: makeDailyHistory(6.49, 0.04),
  },
  diesel_s10: {
    lastPrice: 6.99, lastCollection: '19/04/2026', minPrice: 5.97, maxPrice: 7.19,
    variationPercent: 13.16, variationAmount: 0.81,
    history: makeHistory(6.39, 0.12), dailyHistory: makeDailyHistory(6.39, 0.12),
  },
};

const s5 = {
  gasolina_aditivada: {
    lastPrice: 6.79, lastCollection: '19/04/2026', minPrice: 6.49, maxPrice: 6.99,
    variationPercent: 2.26, variationAmount: 0.15,
    history: makeHistory(6.64, 0.03), dailyHistory: makeDailyHistory(6.64, 0.03),
  },
  diesel_s10: {
    lastPrice: 6.79, lastCollection: '19/04/2026', minPrice: 5.97, maxPrice: 7.09,
    variationPercent: 10.77, variationAmount: 0.66,
    history: makeHistory(6.29, 0.10), dailyHistory: makeDailyHistory(6.29, 0.10),
  },
  diesel_comum: {
    lastPrice: 6.99, lastCollection: '19/04/2026', minPrice: 6.39, maxPrice: 6.99,
    variationPercent: 9.39, variationAmount: 0.60,
    history: makeHistory(6.39, 0.10), dailyHistory: makeDailyHistory(6.39, 0.10),
  },
};

const s6 = {
  gasolina_comum: {
    lastPrice: 6.84, lastCollection: '20/04/2026', minPrice: 6.29, maxPrice: 6.84,
    variationPercent: 6.20, variationAmount: 0.40,
    history: makeHistory(6.49, 0.07), dailyHistory: makeDailyHistory(6.49, 0.07),
  },
  etanol: {
    lastPrice: 5.59, lastCollection: '20/04/2026', minPrice: 4.45, maxPrice: 5.69,
    variationPercent: 14.10, variationAmount: 0.69,
    history: makeHistory(4.89, 0.14), dailyHistory: makeDailyHistory(4.89, 0.14),
  },
  diesel_comum: {
    lastPrice: 6.89, lastCollection: '20/04/2026', minPrice: 6.39, maxPrice: 6.99,
    variationPercent: 8.16, variationAmount: 0.52,
    history: makeHistory(6.39, 0.08), dailyHistory: makeDailyHistory(6.39, 0.08),
  },
};

const s7 = {
  gasolina_aditivada: {
    lastPrice: 6.69, lastCollection: '18/04/2026', minPrice: 6.49, maxPrice: 6.99,
    variationPercent: 3.08, variationAmount: 0.20,
    history: makeHistory(6.49, 0.04), dailyHistory: makeDailyHistory(6.49, 0.04),
  },
  diesel_s10: {
    lastPrice: 6.59, lastCollection: '18/04/2026', minPrice: 5.97, maxPrice: 7.09,
    variationPercent: 9.83, variationAmount: 0.59,
    history: makeHistory(6.19, 0.08), dailyHistory: makeDailyHistory(6.19, 0.08),
  },
  gasolina_comum: {
    lastPrice: 6.49, lastCollection: '18/04/2026', minPrice: 6.29, maxPrice: 6.84,
    variationPercent: 2.04, variationAmount: 0.13,
    history: makeHistory(6.39, 0.02), dailyHistory: makeDailyHistory(6.39, 0.02),
  },
};

export const GAS_STATIONS: GasStation[] = [
  { id: '1', name: 'Auto Posto Schueng LTDA', neighborhood: 'Boa Vista', city: 'São Mateus — ES', lastCollection: '20/04/2026', prices: s1 },
  { id: '2', name: 'Posto Bandeirantes LTDA', neighborhood: 'Centro', city: 'São Mateus — ES', lastCollection: '20/04/2026', prices: s2 },
  { id: '3', name: 'Posto Ferrari Ltda', neighborhood: 'Boa Vista', city: 'São Mateus — ES', lastCollection: '18/04/2026', prices: s3 },
  { id: '4', name: 'Auto Posto São Mateus', neighborhood: 'Litorâneo', city: 'São Mateus — ES', lastCollection: '19/04/2026', prices: s4 },
  { id: '5', name: 'Posto Guriri Ltda', neighborhood: 'Guriri', city: 'São Mateus — ES', lastCollection: '19/04/2026', prices: s5 },
  { id: '6', name: 'Posto Shell Centro', neighborhood: 'Centro', city: 'São Mateus — ES', lastCollection: '20/04/2026', prices: s6 },
  { id: '7', name: 'Auto Posto Guriri II', neighborhood: 'Guriri', city: 'São Mateus — ES', lastCollection: '18/04/2026', prices: s7 },
];

export const DASHBOARD_STATS = {
  totalStations: 7,
  totalRecords: 25,
  totalFuelTypes: 5,
};

export const STATION_LABELS: Record<string, string> = {
  '1': 'Schueng',
  '2': 'Bandeirantes',
  '3': 'Ferrari',
  '4': 'São Mateus',
  '5': 'Guriri',
  '6': 'Shell Centro',
  '7': 'Guriri II',
};

export const STATION_COLORS: Record<string, string> = {
  '1': '#0369a1',
  '2': '#db2777',
  '3': '#16a34a',
  '4': '#d97706',
  '5': '#7c3aed',
  '6': '#0891b2',
  '7': '#be123c',
};