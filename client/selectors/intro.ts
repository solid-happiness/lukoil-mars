import { pathOr } from 'ramda';

export const intro = pathOr(false, ['intro', 'open']);
