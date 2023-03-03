export type SortD = 'asc' | 'desc' | '';

export type ListingApiParams = {
  token: string;
  limit: number;
  page: number;
  orderBy?: SortD;
  search: string;
};
