import {Pagination} from '../../models/Pagination';

export interface PaginationResponse<T> {
  pagination: Pagination;
  rows: T[];
}
