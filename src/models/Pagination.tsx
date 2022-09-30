export interface Pagination {
  totalRows: number;
  totalPages: number;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
}
