import { prop, sort, sortBy } from 'ramda';

import { Product } from 'client/typings';
import { SortOption } from 'client/components/Search/constants';

const unifySign = (result: number) => {
  if (result < 0) {
    return -1;
  }

  if (result > 0) {
    return 1;
  }

  return 0;
};

export const sortProducts = (sortOption: SortOption, products: Product[]) => {
  if (sortOption === SortOption.RATING) {
    return sort((a, b) => unifySign(b.rating - a.rating), products);
  }

  if (sortOption === SortOption.NAME) {
    return sortBy(prop('title'), products);
  }

  return sort((a, b) => {
    if (sortOption === SortOption.PRICE_ASC) {
      return unifySign(a.price - b.price);
    }

    return unifySign(b.price - a.price);
  }, products);
};
