export interface EstimateShippingResponse {
    success: number,
    specification: string,
    result: Result[]
}

export interface Result {
    carrier_code: string,
    method_code: string,
    carrier_title: string,
    method_title: string,
    amount: number,
    base_amount: number,
    available: boolean,
    error_message: string,
    price_excl_tax: number,
    price_incl_tax: number
}
