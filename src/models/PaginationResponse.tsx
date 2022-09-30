import { Pagination } from "./Pagination";

export interface PaginationResponse<T> {
    pagination: Pagination;
    rows: T[];
}
