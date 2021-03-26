import React from 'react';
import { PriceFilter } from './PriceFilter';

export enum SortOption {
  RATING = 'RATING',
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
  NAME = 'NAME',
}

export const sortOptions = [
  { name: 'по рейтингу', value: SortOption.RATING },
  { name: 'по цене (по возрастанию)', value: SortOption.PRICE_ASC },
  { name: 'по цене (по убыванию)', value: SortOption.PRICE_DESC },
  { name: 'по названию', value: SortOption.NAME },
];

export const sortOptionsNameMap: Record<SortOption, React.ReactNode> = {
  [SortOption.RATING]: 'по рейтингу',
  [SortOption.PRICE_ASC]: <PriceFilter type="asc">по цене</PriceFilter>,
  [SortOption.PRICE_DESC]: <PriceFilter type="desc">по цене</PriceFilter>,
  [SortOption.NAME]: 'по названию',
};
