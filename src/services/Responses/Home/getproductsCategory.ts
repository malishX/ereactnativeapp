export interface getproductsCategoryResponse {
    success: number,
    category_name: string,
    specification: string,
    result: Result[]
    count: number
}

export interface Result {
    id: string,
    name: string
}
