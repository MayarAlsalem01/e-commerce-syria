export type ResponseResult<T> = {
    data: T,
    meta?: Meta
}
export interface Meta {
    pagination: Pagination
}

export interface Pagination {
    total: number
    per_page: number
    count: number
    current_page: number
}