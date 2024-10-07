export interface GetProductDetailResponse {
    result: Result[],
    success: number,
    specification: string
}

export interface Result {
    id: number,
    sku: string,
    name: string,
    tax: string,
    distributor: string
    locationid: number,
    pricing: string,
    price: number,
    status: number,
    favourite: number,
    description: string,
    url_key: string,
    qty: number,
    stock: number,
    small_image: string,
    special_price: number,
    gallery_images: GallaryImages[],
    special_to_date: string,
    new_p: number,
    loyality_points: string,
    customer_type: string,
    credit_info: Credit_info,
    product_sources: [
        string,
        string,
        string
    ],
    cross_sell: Cross_sell[]
    tier_price: Tier_price[]

}

export interface GallaryImages {
    media_images: string
}

export interface Credit_info {
    add_to_cart_status: boolean,
    credit_status: string,
    credit_amount: string,
    used_amount: string,
    remaining_amount: string,
    outstanding_amount: string,
    message: string
}

export interface Cross_sell {
    price: number,
    name: string,
    sku: string,
    retailer_id: string,
    locationid: number,
    id: string,
    pricing: string,
    status: string,
    description: string,
    url_key: string,
    qty: number,
    stock: number,
    favourite: number,
    small_image: string,
    special_price: number,
    special_to_date: string,
    new_p: number
}

export interface Tier_price {

}