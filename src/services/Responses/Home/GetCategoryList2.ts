export interface GetCartList2Response {
    success: number,
    specification: string,
    cart_items: number,
    data: Data
}

export interface Data {
    coupon_applied: null | string,
    cashondelivery: PayDetails,
    ccavenuepay: PayDetails,
    spotiipay: PayDetails,
    paybycredit: PayByCredit,
    grand_total: number,
    subtotal: number,
    shipping_amount: number,
    tax_amount: number,
    discount_amount: number,
    service_charge: number,
    service_charge_percentage: number,

    items: CartItem[],
    reward_points: number
}

export interface PayByCredit {
    credit_info: CreditInfo,
    grand_total: number,
    subtotal: number,
    shipping_amount: number,
    tax_amount: number,
    discount_amount: number,
    service_charge: number,
    service_charge_percentage: number,
}

export interface PayDetails {
    grand_total: number,
    subtotal: number,
    shipping_amount: number,
    tax_amount: number,
    discount_amount: number,
    service_charge: number,
    service_charge_percentage: number,
}

export interface CreditInfo {
    id: string,
    credit_amount: string,
    used_amount: string,
    remaining_amount: string,
    customer_id: string,
    affiliate_id: string,
    customer_email: string,
    payment_due: string,
    credit_days: string,
    outstanding_amount: string,
    credit_status: string,
    created_at: string,
    updated_at: string
}

export interface CartItem {
    item_id: string,
    sku: string,
    qty: number,
    name: string,
    tax: string,
    price: number,
    small_image: string,
    product_type: string,
    quote_id: string,
    is_stock: number
}