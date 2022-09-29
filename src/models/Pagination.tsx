export interface Pagination<T> {
  totalRows: number;
  totalPages: number;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  rows: T[];
}
