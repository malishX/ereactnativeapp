export interface DeleteCartItemResponse {
    success: number,
    specification: string,
    data: Data,
    reward_points: number
}

export interface Data {
    grand_total: number,
    subtotal: number,
    shipping_amount: number,
    tax_amount: number,
    discount_amount: number,
    coupon_applied: null,
    items: CartItems[],
    cashondelivery: PaymentData,
    ccavenuepay: PaymentData,
    spotiipay: PaymentData,
    paybycredit: {
        "grand_total": 1470,
        "subtotal": 1400,
        "shipping_amount": 0,
        "tax_amount": 70,
        "discount_amount": 0,
        "service_charge": 0,
        "service_charge_percentage": 0,
        "credit_info": {
            "id": "19",
            "credit_amount": "8000",
            "used_amount": "7829.52",
            "remaining_amount": "170.48",
            "customer_id": "4533",
            "affiliate_id": "",
            "customer_email": "nimila@conektr.ae",
            "payment_due": "0",
            "credit_days": "100",
            "outstanding_amount": "7829.5200",
            "credit_status": "active",
            "created_at": "2022-07-31 20:57:37",
            "updated_at": "2023-01-13 09:20:31"
        }
    }
}

export interface CartItems {
    item_id: string,
    sku: string,
    qty: number,
    name: string,
    tax: string,
    price: string,
    small_image: string,
    product_type: string,
    quote_id: string,
    is_stock: number
}

export interface PaymentData {
    grand_total: number,
    subtotal: number,
    shipping_amount: number,
    tax_amount: number,
    discount_amount: number,
    service_charge: number,
    service_charge_percentage: number
}

export interface PaybyCredit {
    grand_total: number,
    subtotal: number,
    shipping_amount: number,
    tax_amount: number,
    discount_amount: number,
    service_charge: number,
    service_charge_percentage: number,
    credit_info: Credit_info
}

export interface Credit_info {
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