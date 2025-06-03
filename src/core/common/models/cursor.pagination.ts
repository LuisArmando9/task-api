export interface CursorPagination<T> {
    items: T[];
    nextCursor: string | number | null;
}

export interface CursorPaginationParams {
    limit: number;
    cursor: number | string | null;
}