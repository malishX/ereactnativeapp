export interface getSubCategoriesResponse {
    success: number,
    specification: string,
    mode: string,
    data: Data
}

export interface Data {
    id: string,
    name: string
}
